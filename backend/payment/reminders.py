"""
Registration reminders, sent by hand from the admin:

- "complete your registration", to people whose payments are pending or failed (Payment requests admin,
  `prepare_reminders`);
- "your seat is one step away", to people who signed up recently and never started a payment (Participants admin,
  `prepare_signup_reminders`).

Both share one counter per person and edition (`PaymentReminder`), so the limit and the wait below hold across the
two emails: someone nudged after signing up is not sent a payment reminder an hour later.

Who gets a payment reminder (`prepare_reminders`):
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

Who gets a sign-up reminder (`prepare_signup_reminders`), about the current edition (the newest event):
- someone who signed up within `settings.SIGNUP_REMINDER_DAYS`;
- who has no payment for the edition at all (pending, failed or paid, single or group) and is not registered in it;
- while registration is open: at least one of its plans is open and not full;
- with the same per-person limit and wait as above, and at most one email per person per run.

`deliver_reminders` sends over one SMTP connection and gives the claim back (count and last send time) for every
email that did not go out. If
the process dies mid-run, the claims for the unsent emails stay counted: the limit errs towards fewer emails.
"""

import logging
import threading
from collections.abc import Iterable
from dataclasses import dataclass, field
from datetime import datetime, timedelta

from django.conf import settings
from django.core.mail import EmailMultiAlternatives, get_connection
from django.db import close_old_connections, transaction
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
    # Sign-up reminders only.
    joined_too_long_ago: int = 0
    started_payment: int = 0
    registration_closed: int = 0


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
    reminded_lately = _reminded_lately(counted_on.values(), now)

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
                message = _payment_message(payment.participant, event, items)
                batch.reminders.append(Reminder(reminder_id, message, previous_sent_at))
                break
        else:
            batch.at_limit += 1
    return batch


def prepare_signup_reminders(participants: QuerySet[Participant]) -> ReminderBatch:
    """Claims a reminder for each recently signed-up person in `participants` who never started a payment for the
    current edition, and builds its email."""
    batch = ReminderBatch()
    event = Event.objects.order_by('-order').first()
    if event is None:
        return batch
    now = timezone.now()
    joined_since = now - timedelta(days=settings.SIGNUP_REMINDER_DAYS)

    # One account per person: the newest, whose profile is the one they just filled in.
    people: dict[str, Participant] = {}
    for participant in (
        participants.exclude(user__email='').select_related('user', 'info').order_by('-user__date_joined', '-pk')
    ):
        people.setdefault(participant.user.email.lower(), participant)
    started = _started(set(people), event)
    counted_on = _oldest_accounts(set(people))
    reminded_lately = _reminded_lately(counted_on.values(), now)
    options = _open_options(event)

    for email, participant in people.items():
        if participant.user.date_joined < joined_since:
            batch.joined_too_long_ago += 1
        elif email in started:
            batch.started_payment += 1
        elif not options:
            batch.registration_closed += 1
        elif counted_on[email] in reminded_lately:
            batch.too_soon += 1
        else:
            claim = _claim(counted_on[email], event, now)
            if claim is AT_LIMIT:
                batch.at_limit += 1
            elif claim is TOO_SOON:
                batch.too_soon += 1
            else:
                reminder_id, previous_sent_at = claim
                message = _signup_message(participant, event, options)
                batch.reminders.append(Reminder(reminder_id, message, previous_sent_at))
    return batch


def send_in_background(reminders: list[Reminder]) -> None:
    """Sends the emails after the admin's response: about a second each, longer than a request may run."""

    def run():
        try:
            sent = deliver_reminders(reminders)
            logger.info('Sent %s of %s reminders', sent, len(reminders))
        except Exception:
            logger.exception('Reminders stopped before all were sent')
        finally:
            close_old_connections()

    threading.Thread(target=run, name='reminders').start()


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


def _reminded_lately(participant_ids: Iterable[int], now: datetime) -> set[int]:
    return set(
        PaymentReminder.objects.filter(
            participant_id__in=list(participant_ids), last_sent_at__gt=now - _interval()
        ).values_list('participant_id', flat=True)
    )


def _started(emails: set[str], event: Event) -> set[str]:
    """Addresses with any payment (whatever its status) or registration for this edition, on any of their accounts."""
    in_event = Q(plans__event=event) | Q(addon_lines__addon__plan__event=event)
    payments = PaymentRequest.objects.annotate(email=Lower('participant__user__email')).filter(in_event)
    groups = GroupPaymentRequest.objects.annotate(email=Lower('participant__user__email')).filter(plan__event=event)
    registrations = Participation.objects.annotate(email=Lower('participant__user__email')).filter(plan__event=event)
    return {
        email
        for queryset in (payments, groups, registrations)
        for email in queryset.filter(email__in=emails).values_list('email', flat=True)
    }


def _open_options(event: Event) -> list[str]:
    """What can be bought in this edition right now: its open modes of attendance by name, then its open workshops
    as a count. Empty when registration is closed."""
    plans = list(
        ParticipationPlan.objects.filter(event=event, is_open=True)
        .select_related('workshop', 'mode_of_attendance')
        .annotate(taken=Count('participation'))
        .order_by('pk')
    )
    available = [plan for plan in plans if plan.capacity is None or plan.taken < plan.capacity]
    options = [_plan_name(plan) for plan in available if plan.workshop is None]
    workshops = sum(1 for plan in available if plan.workshop is not None)
    if workshops:
        options.append(f'{workshops} hands-on workshop{"s" if workshops != 1 else ""}')
    return options


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


def _payment_message(participant: Participant, event: Event, items: list[str]) -> EmailMultiAlternatives:
    return _email(
        participant,
        event,
        subject=f'Your seat at the {event} is still waiting',
        template='payment/email/payment_reminder',
        tag='payment-reminder',
        items=items,
    )


def _signup_message(participant: Participant, event: Event, options: list[str]) -> EmailMultiAlternatives:
    return _email(
        participant,
        event,
        subject=f'Your seat at the {event} is one step away',
        template='payment/email/signup_reminder',
        tag='signup-reminder',
        items=options,
    )


def _email(participant: Participant, event: Event, subject: str, template: str, tag: str, items: list[str]):
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
        subject=subject,
        body=render_to_string(f'{template}.txt', context),
        from_email=settings.SERVER_EMAIL,
        to=[participant.user.email],
        headers={'x-liara-tag': tag},
    )
    message.attach_alternative(render_to_string(f'{template}.html', context), 'text/html')
    return message
