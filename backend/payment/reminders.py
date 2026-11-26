"""
"Complete your registration" emails for participants whose payments are pending or failed, sent by hand from the
Payment requests admin.

Who gets one (`prepare_reminders`):
- at most one email per person per run, however many of their payments are selected. A person is an email address:
  legacy accounts share addresses, and all of them count as the same person;
- never someone already in the edition: registered for any of its plans, or with any paid payment for it (single or
  group), on any of their accounts. Three failed payments followed by a paid one means no reminder;
- only about what they can still buy: plans and add-ons that are open and not full. When nothing is left, no email;
- not about a pending payment younger than `IN_FLIGHT`: its payer may still be on the bank's page;
- at most `settings.PAYMENT_REMINDER_MAX` times per edition. The counter is kept on the person's oldest account and
  claimed under a row lock before the email is built, so the limit holds across accounts and when two organisers
  send at once;
- not within `settings.PAYMENT_REMINDER_INTERVAL_HOURS` of the person's last reminder, for any edition.

`deliver_reminders` sends over one SMTP connection and gives the claim back (count and last send time) for every
email that did not go out. If
the process dies mid-run, the claims for the unsent emails stay counted: the limit errs towards fewer emails.
"""

import logging
from collections.abc import Iterable
from dataclasses import dataclass, field
from datetime import datetime, timedelta

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.db import transaction
from django.db.models import Count, F, Min, Q, QuerySet
from django.db.models.functions import Lower
from django.template.loader import render_to_string
from django.utils import timezone

from core.models import Event
from participant.models import Participant, Participation, ParticipationPlan
from payment.models import GroupPaymentRequest, PaymentReminder, PaymentRequest, PaymentStatus

logger = logging.getLogger(__name__)

UNPAID = (PaymentStatus.PENDING, PaymentStatus.FAILED)
# Longer than a bank payment session lasts.
IN_FLIGHT = timedelta(minutes=30)


@dataclass
class Reminder:
    reminder_id: int
    message: EmailMultiAlternatives
    # Restored if the email does not go out, so a failed attempt does not start the waiting interval.
    previous_sent_at: datetime | None = None


@dataclass
class ReminderBatch:
    reminders: list[Reminder] = field(default_factory=list)
    # People skipped, by reason.
    at_limit: int = 0
    registered: int = 0
    nothing_to_buy: int = 0
    paying_now: int = 0
    too_soon: int = 0


def prepare_reminders(payments: QuerySet[PaymentRequest]) -> ReminderBatch:
    """Claims a reminder for each person with an unpaid payment in `payments` and builds its email."""
    now = timezone.now()
    in_flight = Q(status=PaymentStatus.PENDING, timestamp__gt=now - IN_FLIGHT)
    selected = payments.filter(status__in=UNPAID)
    paying_now = set(
        selected.filter(in_flight).annotate(email=Lower('participant__user__email')).values_list('email', flat=True)
    )
    unpaid = list(
        selected.exclude(in_flight)
        .exclude(participant__user__email='')
        .select_related('participant__user', 'participant__info')
        .prefetch_related(
            'plans__event',
            'plans__workshop',
            'plans__mode_of_attendance',
            'addon_lines__addon__plan__event',
        )
        # Newest first, so each person is reminded about what they tried to buy last.
        .order_by('-timestamp', '-pk')
    )
    emails = {payment.participant.user.email.lower() for payment in unpaid}
    registered = _registered(emails)
    counted_on = _oldest_accounts(emails)
    full_plans = _full_plans(unpaid)
    reminded_lately = set(
        PaymentReminder.objects.filter(
            participant_id__in=counted_on.values(), last_sent_at__gt=now - _interval()
        ).values_list('participant_id', flat=True)
    )

    by_person: dict[str, list[tuple[PaymentRequest, Event, list[str]]]] = {}
    skipped_registered: set[str] = set()
    for payment in unpaid:
        email = payment.participant.user.email.lower()
        candidates = by_person.setdefault(email, [])
        event = _event_of(payment)
        if event is None:
            continue
        if (email, event.pk) in registered:
            skipped_registered.add(email)
            continue
        items = _items_left(payment, full_plans)
        if items:
            candidates.append((payment, event, items))

    batch = ReminderBatch()
    # Someone paying right now is left alone this time, whatever their older payments are.
    batch.paying_now = len(paying_now)
    for email, candidates in by_person.items():
        if email in paying_now:
            continue
        if not candidates:
            if email in skipped_registered:
                batch.registered += 1
            else:
                batch.nothing_to_buy += 1
            continue
        if counted_on[email] in reminded_lately:
            batch.too_soon += 1
            continue
        for payment, event, items in candidates:
            claim = _claim(counted_on[email], event, now)
            if claim is TOO_SOON:
                # Reminded since `reminded_lately` was read, by an organiser sending at the same time.
                batch.too_soon += 1
                break
            if claim is not AT_LIMIT:
                reminder_id, previous_sent_at = claim
                message = _message(payment.participant, event, items)
                batch.reminders.append(Reminder(reminder_id, message, previous_sent_at))
                break
        else:
            batch.at_limit += 1
    return batch


def deliver_reminders(reminders: Iterable[Reminder]) -> int:
    """Sends the emails and returns how many went out. An email that did not go out does not count."""
    reminders = list(reminders)
    sent = 0
    connection = get_connection(fail_silently=False)
    try:
        connection.open()
    except Exception:
        logger.exception('Could not connect to send %s payment reminders', len(reminders))
        _release(reminders)
        return 0
    try:
        for reminder in reminders:
            reminder.message.connection = connection
            try:
                reminder.message.send()
                sent += 1
            except Exception:
                logger.exception('Could not send payment reminder %s', reminder.reminder_id)
                _release([reminder])
    finally:
        connection.close()
    return sent


def _release(reminders: Iterable[Reminder]) -> None:
    for reminder in reminders:
        PaymentReminder.objects.filter(pk=reminder.reminder_id, count__gt=0).update(
            count=F('count') - 1, last_sent_at=reminder.previous_sent_at
        )


def _interval() -> timedelta:
    return timedelta(hours=settings.PAYMENT_REMINDER_INTERVAL_HOURS)


def _registered(emails: set[str]) -> set[tuple[str, int]]:
    """(email, event id) for every edition someone with these addresses is registered in or has paid for."""
    by_email = {'email': Lower('participant__user__email')}
    participations = (
        Participation.objects.annotate(**by_email)
        .filter(email__in=emails)
        .values_list('email', 'plan__event_id')
    )
    paid_plans = (
        PaymentRequest.objects.annotate(**by_email)
        .filter(email__in=emails, status=PaymentStatus.PAID, plans__isnull=False)
        .values_list('email', 'plans__event_id')
    )
    paid_addons = (
        PaymentRequest.objects.annotate(**by_email)
        .filter(email__in=emails, status=PaymentStatus.PAID, addon_lines__isnull=False)
        .values_list('email', 'addon_lines__addon__plan__event_id')
    )
    paid_groups = (
        GroupPaymentRequest.objects.annotate(**by_email)
        .filter(email__in=emails, status=PaymentStatus.PAID)
        .values_list('email', 'plan__event_id')
    )
    return {*participations, *paid_plans, *paid_addons, *paid_groups}


def _oldest_accounts(emails: set[str]) -> dict[str, int]:
    """The participant id each person's reminders are counted on: their oldest account."""
    return dict(
        Participant.objects.annotate(email=Lower('user__email'))
        .filter(email__in=emails)
        .values('email')
        .annotate(oldest=Min('pk'))
        .values_list('email', 'oldest')
    )


def _full_plans(payments: list[PaymentRequest]) -> set[int]:
    limited = {plan.pk: plan.capacity for payment in payments for plan in payment.plans.all() if plan.capacity}
    taken = (
        ParticipationPlan.objects.filter(pk__in=limited)
        .annotate(taken=Count('participation'))
        .values_list('pk', 'taken')
    )
    return {pk for pk, count in taken if count >= limited[pk]}


def _event_of(payment: PaymentRequest) -> Event | None:
    for plan in payment.plans.all():
        return plan.event
    for line in payment.addon_lines.all():
        return line.addon.plan.event
    return None


def _items_left(payment: PaymentRequest, full_plans: set[int]) -> list[str]:
    """Names of what is in the payment that can still be bought."""
    items = [_plan_name(plan) for plan in payment.plans.all() if plan.is_open and plan.pk not in full_plans]
    items += [line.addon.name for line in payment.addon_lines.all() if line.addon.is_open]
    return items


def _plan_name(plan) -> str:
    if plan.workshop is not None:
        return f'Workshop: {plan.workshop.name}'
    if plan.mode_of_attendance is not None:
        return f'{plan.mode_of_attendance.name} attendance'
    return str(plan)


AT_LIMIT = 'at_limit'
TOO_SOON = 'too_soon'


def _claim(participant_id: int, event: Event, now: datetime) -> tuple[int, datetime | None] | str:
    """Counts one more reminder for this person and edition and returns (its row, the previous send time), or
    `AT_LIMIT` / `TOO_SOON` if they may not have another now."""
    with transaction.atomic():
        reminder, _ = PaymentReminder.objects.get_or_create(participant_id=participant_id, event=event)
        reminder = PaymentReminder.objects.select_for_update().get(pk=reminder.pk)
        if reminder.count >= settings.PAYMENT_REMINDER_MAX:
            return AT_LIMIT
        if reminder.last_sent_at is not None and reminder.last_sent_at > now - _interval():
            return TOO_SOON
        previous_sent_at = reminder.last_sent_at
        reminder.count += 1
        reminder.last_sent_at = now
        reminder.save(update_fields=['count', 'last_sent_at'])
        return reminder.pk, previous_sent_at


def _date_range(event: Event) -> str:
    start, end = event.starting_date, event.ending_date
    if start == end:
        return f'{start:%B} {start.day}, {start.year}'
    if (start.year, start.month) == (end.year, end.month):
        return f'{start:%B} {start.day}–{end.day}, {start.year}'
    if start.year == end.year:
        return f'{start:%B} {start.day} – {end:%B} {end.day}, {start.year}'
    return f'{start:%B} {start.day}, {start.year} – {end:%B} {end.day}, {end.year}'


def _message(participant: Participant, event: Event, items: list[str]) -> EmailMultiAlternatives:
    info = participant.info
    context = {
        'site_url': settings.FRONTEND_ORIGIN,
        'register_url': f'{settings.FRONTEND_ORIGIN}/dashboard/register',
        'first_name': (info.first_name.strip() if info and info.first_name else ''),
        'event_name': str(event),
        'dates': _date_range(event),
        'items': items,
    }
    message = EmailMultiAlternatives(
        subject=f'Your seat at the {event} is still waiting',
        body=render_to_string('payment/email/payment_reminder.txt', context),
        from_email=settings.SERVER_EMAIL,
        to=[participant.user.email],
        headers={'x-liara-tag': 'payment-reminder'},
    )
    message.attach_alternative(render_to_string('payment/email/payment_reminder.html', context), 'text/html')
    return message
