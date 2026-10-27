"""
Checkout and payment verification.

Flow: `quote_order` prices a basket (plans, add-ons of plans, or both) for the registration page; `create_payment`
validates it, claims the discount, records a PaymentRequest and starts a bank payment (or fulfils a free one at once);
the bank sends the payer back to the frontend's /callback/<id>, which calls `verify_payment`. Verification is
idempotent and serialised per payment with a row lock, so a double callback can never register twice or release a
discount twice.
"""

import logging
import secrets
import string
from collections.abc import Sequence

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.db.models import Count, F, Sum
from rest_framework import serializers, status
from rest_framework.exceptions import APIException, NotFound

from participant.models import AddonPurchase, Participant, ParticipantInfo, Participation, ParticipationPlan
from payment import pricing
from payment.gateway import PaymentGateway, TransactionStatus
from payment.models import GroupPaymentRequest, PaymentDiscount, PaymentRequest, PaymentRequestAddon, PaymentStatus
from spotplayer.client import SpotPlayerClient

logger = logging.getLogger(__name__)

# Frontend registration.actions.ts treats a 400 with this code as "unknown discount code" and re-prices without it.
INVALID_DISCOUNT_CODE = 'invalid'


class PaymentPending(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'The bank has not confirmed this payment yet. Please try again in a minute.'
    default_code = 'payment_pending'


def _error(message: str, code: str) -> serializers.ValidationError:
    return serializers.ValidationError(message, code=code)


# --- Validation ----------------------------------------------------------------------------------------------------


def validate_plans(plans: list[ParticipationPlan], addons: Sequence[pricing.AddonLine] = ()) -> int:
    """Checks a basket on its own and returns its edition's event id."""
    if not plans and not addons:
        raise _error('Choose a plan or an add-on.', 'no_plans')
    events = {plan.event_id for plan in plans} | {line.addon.plan.event_id for line in addons}
    if len(events) > 1:
        raise _error('Plans from different editions cannot be bought together.', 'mixed_events')

    for plan in plans:
        if not plan.is_open:
            raise _error(f'{plan} is not open for registration.', 'plan_closed')

    limited = [plan.pk for plan in plans if plan.capacity is not None]
    if limited:
        taken = dict(
            Participation.objects.filter(plan_id__in=limited)
            .values('plan_id')
            .annotate(count=Count('id'))
            .values_list('plan_id', 'count')
        )
        for plan in plans:
            if plan.capacity is not None and taken.get(plan.pk, 0) >= plan.capacity:
                raise _error(f'{plan} is full.', 'plan_full')
    _validate_addons(addons)
    return events.pop()


def _validate_addons(addons: Sequence[pricing.AddonLine]) -> None:
    for line in addons:
        addon = line.addon
        if not addon.is_open:
            raise _error(f'{addon} is not available right now.', 'addon_closed')
        if line.quantity > addon.max_per_participant:
            raise _error(f'You can buy at most {addon.max_per_participant} of {addon}.', 'addon_limit')

    # Like plan capacity, only paid units count, so two payers racing for the last unit can both get it.
    limited = [line.addon.pk for line in addons if line.addon.capacity is not None]
    if limited:
        sold = _units_by_addon(AddonPurchase.objects.filter(addon_id__in=limited))
        for line in addons:
            addon = line.addon
            if addon.capacity is None:
                continue
            left = max(0, addon.capacity - sold.get(addon.pk, 0))
            if line.quantity > left:
                raise _error(f'Only {left} of {addon} left.' if left else f'{addon} is sold out.', 'addon_full')


def _units_by_addon(purchases) -> dict[int, int]:
    return dict(purchases.values('addon_id').annotate(units=Sum('quantity')).values_list('addon_id', 'units'))


def validate_addons_for_participant(
    participant: Participant, plans: list[ParticipationPlan], addons: Sequence[pricing.AddonLine]
) -> None:
    """An add-on comes with its plan, bought now or before, and within its per-participant limit."""
    if not addons:
        return
    held_plans = set(
        Participation.objects.filter(
            participant=participant, plan_id__in={line.addon.plan_id for line in addons}
        ).values_list('plan_id', flat=True)
    )
    held_plans |= {plan.pk for plan in plans}
    held = _units_by_addon(
        AddonPurchase.objects.filter(participant=participant, addon_id__in=[line.addon.pk for line in addons])
    )
    for line in addons:
        addon = line.addon
        if addon.plan_id not in held_plans:
            raise _error(f'{addon} can only be bought with {addon.plan}.', 'addon_without_plan')
        already = held.get(addon.pk, 0)
        if already + line.quantity > addon.max_per_participant:
            raise _error(
                f'You can hold at most {addon.max_per_participant} of {addon}; you already have {already}.',
                'addon_limit',
            )


def validate_for_participant(participant: Participant, plans: list[ParticipationPlan], event_id: int) -> None:
    """Checks a basket against what the participant already has in the same edition."""
    registered = list(
        ParticipationPlan.objects.filter(participation__participant=participant, event_id=event_id).distinct()
    )
    registered_ids = {plan.pk for plan in registered}
    if any(plan.pk in registered_ids for plan in plans):
        raise _error('You are already registered for one of these plans.', 'already_registered')
    modes = [plan for plan in [*plans, *registered] if plan.kind == ParticipationPlan.KIND_MODE]
    if len(modes) > 1:
        raise _error('Choose only one mode of attendance.', 'multiple_modes')


# --- Discounts -----------------------------------------------------------------------------------------------------


def find_discount(code: str | None, event_id: int) -> PaymentDiscount | None:
    """The usable discount for this code and edition, or a 400 with code `invalid`."""
    if not code:
        return None
    discount = PaymentDiscount.objects.filter(code=code.strip(), event_id=event_id).first()
    if discount is None or not discount.is_available:
        raise serializers.ValidationError({'discount_code': 'Invalid discount code.'}, code=INVALID_DISCOUNT_CODE)
    return discount


def claim_discount(code: str | None, event_id: int) -> PaymentDiscount | None:
    """Like `find_discount`, and takes one use atomically, so the last use cannot be spent twice."""
    discount = find_discount(code, event_id)
    if discount is not None and discount.count != PaymentDiscount.UNLIMITED:
        taken = PaymentDiscount.objects.filter(pk=discount.pk, count__gt=0).update(count=F('count') - 1)
        if not taken:
            raise serializers.ValidationError({'discount_code': 'Invalid discount code.'}, code=INVALID_DISCOUNT_CODE)
    return discount


def release_discount(discount: PaymentDiscount | None) -> None:
    if discount is not None and discount.count != PaymentDiscount.UNLIMITED:
        PaymentDiscount.objects.filter(pk=discount.pk).update(count=F('count') + 1)


# --- Single checkout -----------------------------------------------------------------------------------------------


def _discountable(plans: list[ParticipationPlan], addons: Sequence[pricing.AddonLine]) -> bool:
    """Whether a discount code could change the price. When it cannot, the code is ignored rather than spent, so a
    single-use code is not lost on, say, parking alone."""
    return any(plan.kind == ParticipationPlan.KIND_MODE for plan in plans) or any(
        line.addon.discountable for line in addons
    )


def quote_order(
    participant: Participant,
    plans: list[ParticipationPlan],
    discount_code: str | None,
    addons: Sequence[pricing.AddonLine] = (),
) -> pricing.Quote:
    event_id = validate_plans(plans, addons)
    validate_addons_for_participant(participant, plans, addons)
    discount = find_discount(discount_code, event_id) if _discountable(plans, addons) else None
    return pricing.quote(plans, discount, addons)


@transaction.atomic
def create_payment(
    participant: Participant,
    plans: list[ParticipationPlan],
    discount_code: str | None,
    addons: Sequence[pricing.AddonLine] = (),
) -> str:
    """Records the order and returns where to send the payer: the bank, or the dashboard when nothing is due.

    Everything runs in one transaction: if the payment service fails, the discount use is not lost.
    """
    event_id = validate_plans(plans, addons)
    validate_for_participant(participant, plans, event_id)
    validate_addons_for_participant(participant, plans, addons)
    discount = claim_discount(discount_code, event_id) if _discountable(plans, addons) else None

    payment = PaymentRequest.objects.create(participant=participant, discount=discount)
    payment.plans.set(plans)
    PaymentRequestAddon.objects.bulk_create(
        PaymentRequestAddon(payment=payment, addon=line.addon, quantity=line.quantity) for line in addons
    )
    price = pricing.quote(plans, discount, addons)

    if price.payable == 0:
        fulfil_payment(payment)
        return f'{settings.FRONTEND_ORIGIN}/dashboard/profile'

    info = participant.info
    transaction_ = PaymentGateway().create_transaction(
        user_id=participant.pk,
        amount=price.payable,
        discount=price.discount,
        goods=[str(plan) for plan in plans] + [f'{line.addon} × {line.quantity}' for line in addons],
        callback_url=f'{settings.PAYMENT_CALLBACK_URL}/{payment.pk}',
        name=f'{info.first_name} {info.last_name}'.strip() if info else '',
        phone=info.phone_number if info else '',
        email=participant.user.email,
    )
    payment.order_id = transaction_.order_id
    payment.save(update_fields=['order_id'])
    logger.info('Payment %s started: %s Rial for participant %s', payment.pk, price.payable, participant.pk)
    return transaction_.redirect_url


def verify_payment(participant: Participant, payment_id: int) -> PaymentRequest:
    with transaction.atomic():
        try:
            payment = (
                PaymentRequest.objects.select_for_update(of=('self',))
                .select_related('discount')
                .get(pk=payment_id, participant=participant)
            )
        except PaymentRequest.DoesNotExist:
            raise NotFound('Payment not found.')

        if payment.status != PaymentStatus.PENDING:
            return payment
        if not payment.order_id:
            # Never reached the bank (the payment service failed while it was being created).
            _fail(payment)
            return payment

        state = PaymentGateway().status(payment.order_id)
        if state == TransactionStatus.SUCCESS:
            fulfil_payment(payment)
        elif state in (TransactionStatus.FAILED, TransactionStatus.TIMEOUT):
            _fail(payment)
        else:
            raise PaymentPending()
    return payment


def _fail(payment: PaymentRequest | GroupPaymentRequest) -> None:
    payment.set_status(PaymentStatus.FAILED)
    release_discount(payment.discount)
    logger.info('%s %s failed', type(payment).__name__, payment.pk)


def fulfil_payment(payment: PaymentRequest) -> None:
    """Marks the payment paid, registers the participant for its plans (with a SpotPlayer licence when a plan has a
    recorded course) and records its add-ons. A licence failure is logged, not fatal: the registration stands and the
    licence can be issued from the admin. Add-ons are recorded even past their capacity: the money is already in."""
    payment.set_status(PaymentStatus.PAID)
    participant = Participant.objects.select_related('user', 'info').get(pk=payment.participant_id)
    plans = list(payment.plans.select_related('spotplayer_course'))

    addons = AddonPurchase.objects.bulk_create(
        AddonPurchase(participant=participant, addon_id=line.addon_id, quantity=line.quantity, payment=payment)
        for line in payment.addon_lines.all()
    )

    # An add-ons-only payment registers nothing new: the participant already holds the plans.
    if plans:
        snapshot = _snapshot_profile(participant.info)
        courses = [plan.spotplayer_course for plan in plans if plan.spotplayer_course is not None]
        license = _issue_license(participant, courses) if courses else None
        Participation.objects.bulk_create(
            Participation(
                participant=participant,
                plan=plan,
                info=snapshot,
                spotplayer_license=license if plan.spotplayer_course is not None else None,
            )
            for plan in plans
        )
    logger.info(
        'Payment %s fulfilled: %s plan(s), %s add-on(s) for participant %s',
        payment.pk,
        len(plans),
        len(addons),
        participant.pk,
    )


def _snapshot_profile(info: ParticipantInfo | None) -> ParticipantInfo | None:
    """A frozen copy of the profile as it was at registration (see ParticipantInfo)."""
    if info is None:
        return None
    snapshot = ParticipantInfo.objects.get(pk=info.pk)
    snapshot.pk = None
    snapshot._state.adding = True
    snapshot.save()
    return snapshot


def _issue_license(participant: Participant, courses):
    info = participant.info
    name = ' '.join(filter(None, [info.first_name if info else '', info.last_name if info else '']))
    try:
        return SpotPlayerClient().create_license(
            courses,
            name=f'{name} {participant.user.email}'.strip(),
            watermark=(info.phone_number if info and info.phone_number else participant.user.email),
        )
    except APIException:
        logger.exception('Could not issue a SpotPlayer licence for participant %s', participant.pk)
        return None


# --- Group checkout ------------------------------------------------------------------------------------------------


def resolve_group(payer: Participant, emails: list[str]) -> list[Participant]:
    """The payer plus the participants behind `emails`; every one of them must have an account."""
    emails = list(dict.fromkeys(email.strip().lower() for email in emails))
    if not emails:
        raise _error('Add at least one other participant to pay for a group.', 'group_too_small')
    others = list(Participant.objects.filter(user__email__in=emails).select_related('user'))
    found = {participant.user.email.lower() for participant in others}
    missing = [email for email in emails if email not in found]
    if missing:
        raise _error(f'No participant account for {", ".join(missing)}.', 'participant_not_found')
    return [payer, *[participant for participant in others if participant.pk != payer.pk]]


def validate_group_plan(plan: ParticipationPlan) -> int:
    if plan.kind != ParticipationPlan.KIND_MODE:
        raise _error('Group payment is only available for a mode of attendance.', 'group_workshop')
    return validate_plans([plan])


def quote_group(plan: ParticipationPlan, participants: list[Participant], discount_code: str | None) -> pricing.Quote:
    event_id = validate_group_plan(plan)
    return pricing.group_quote(plan, len(participants), find_discount(discount_code, event_id))


@transaction.atomic
def create_group_payment(
    payer: Participant, plan: ParticipationPlan, participants: list[Participant], discount_code: str | None
) -> str:
    event_id = validate_group_plan(plan)
    for participant in participants:
        validate_for_participant(participant, [plan], event_id)
    discount = claim_discount(discount_code, event_id)

    payment = GroupPaymentRequest.objects.create(
        plan=plan,
        participant=payer,
        participant_numbers=len(participants),
        discount=discount,
        participant_emails=[participant.user.email for participant in participants[1:]],
    )
    price = pricing.group_quote(plan, len(participants), discount)
    if price.payable == 0:
        fulfil_group_payment(payment)
        return f'{settings.FRONTEND_ORIGIN}/dashboard/profile'

    info = payer.info
    transaction_ = PaymentGateway().create_transaction(
        user_id=payer.pk,
        amount=price.payable,
        discount=price.discount,
        goods=[f'{plan} × {len(participants)}'],
        # Not /callback/<id>: that route verifies single payments. The frontend has no group checkout yet; this is
        # where it should land when it gets one.
        callback_url=f'{settings.PAYMENT_CALLBACK_URL}/group/{payment.pk}',
        name=f'{info.first_name} {info.last_name}'.strip() if info else '',
        phone=info.phone_number if info else '',
        email=payer.user.email,
    )
    payment.order_id = transaction_.order_id
    payment.save(update_fields=['order_id'])
    return transaction_.redirect_url


def verify_group_payment(payer: Participant, payment_id: int) -> GroupPaymentRequest:
    with transaction.atomic():
        try:
            payment = (
                GroupPaymentRequest.objects.select_for_update(of=('self',))
                .select_related('discount', 'plan__event')
                .get(pk=payment_id, participant=payer)
            )
        except GroupPaymentRequest.DoesNotExist:
            raise NotFound('Payment not found.')

        if payment.status != PaymentStatus.PENDING:
            return payment
        if not payment.order_id:
            _fail(payment)
            return payment

        state = PaymentGateway().status(payment.order_id)
        if state == TransactionStatus.SUCCESS:
            fulfil_group_payment(payment)
        elif state in (TransactionStatus.FAILED, TransactionStatus.TIMEOUT):
            _fail(payment)
        else:
            raise PaymentPending()
    return payment


def fulfil_group_payment(payment: GroupPaymentRequest) -> None:
    """Marks the payment paid and emails every member a single-use, 100% code for the plan's edition, which they
    redeem through the normal checkout (so each registers with their own profile)."""
    payment.set_status(PaymentStatus.PAID)
    for participant in payment.all_participants:
        code = _new_discount_code()
        PaymentDiscount.objects.create(event_id=payment.plan.event_id, code=code, percentage=100, count=1)
        transaction.on_commit(lambda email=participant.user.email, code=code: _send_group_code(email, code))


def _new_discount_code() -> str:
    alphabet = string.ascii_uppercase + string.digits
    while True:
        code = ''.join(secrets.choice(alphabet) for _ in range(10))
        if not PaymentDiscount.objects.filter(code=code).exists():
            return code


def _send_group_code(email: str, code: str) -> None:
    try:
        send_mail(
            'Your WSS registration code',
            f'Someone registered you for the Winter Seminar Series. Use this code at checkout: {code}',
            settings.SERVER_EMAIL,
            [email],
        )
    except Exception:
        logger.exception('Could not email a group registration code')
