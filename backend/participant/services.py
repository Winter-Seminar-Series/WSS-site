import logging
from zoneinfo import ZoneInfo

from django.conf import settings
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.mail import EmailMultiAlternatives
from django.db import IntegrityError, transaction
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string
from django.utils import timezone
from rest_framework import serializers
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)

from core.models import Event
from participant.models import CV, Participant, ParticipantInfo
from participant.signals import delete_stored_file

User = get_user_model()
logger = logging.getLogger(__name__)

INVALID_RESET_LINK = 'This reset link is invalid or has expired. Please request a new one.'


def normalize_email(email: str) -> str:
    return email.strip().lower()


def get_participant(user) -> Participant:
    """The participant behind a signed-in account. Admin-only accounts have none."""
    try:
        return Participant.objects.select_related('user', 'info').get(user=user)
    except Participant.DoesNotExist:
        raise NotFound('This account has no participant profile.', code='participant_not_found')


def check_password_strength(password: str, user) -> None:
    """Django's AUTH_PASSWORD_VALIDATORS, reported as a DRF error on `password`."""
    try:
        password_validation.validate_password(password, user=user)
    except DjangoValidationError as error:
        raise serializers.ValidationError({'password': list(error.messages)}, code='weak_password')


# --- Sign-up -------------------------------------------------------------------------------------------------------


def email_is_taken(email: str) -> bool:
    return User.objects.filter(email__iexact=email).exists()


@transaction.atomic
def register_participant(email: str, password: str) -> Participant:
    email = normalize_email(email)
    try:
        user = User.objects.create_user(username=email, email=email, password=password)
    except IntegrityError:
        # Lost a race with a concurrent sign-up for the same address.
        raise serializers.ValidationError({'email': 'An account with this email already exists.'}, code='email_taken')
    info = ParticipantInfo.objects.create(is_open_to_work=True)
    return Participant.objects.create(user=user, info=info)


def get_or_create_profile(participant: Participant) -> ParticipantInfo:
    if participant.info is None:
        participant.info = ParticipantInfo.objects.create(is_open_to_work=True)
        participant.save(update_fields=['info'])
    return participant.info


# --- Passwords -----------------------------------------------------------------------------------------------------


def _participant_accounts(email: str):
    return User.objects.filter(email__iexact=normalize_email(email), is_active=True, participant__isnull=False)


def _reset_link_lifetime(seconds: int) -> str:
    for unit, scale in (('hour', 3600), ('minute', 60), ('second', 1)):
        if seconds % scale == 0:
            count = seconds // scale
            return f'{count} {unit}{"s" if count != 1 else ""}'


NO_ACCOUNT_FOR_EMAIL = 'No account found with this email. Check the address, or sign up.'


def send_password_reset(email: str) -> None:
    """
    Emails a reset link to every participant account with this address, or fails with `account_not_found` when none
    uses it (sign-up already says when an email is taken, so this reveals nothing new). A delivery failure is logged
    rather than reported.
    """
    users = list(_participant_accounts(email))
    if not users:
        raise serializers.ValidationError({'email': NO_ACCOUNT_FOR_EMAIL}, code='account_not_found')
    for user in users:
        token = default_token_generator.make_token(user)
        context = {
            'site_url': settings.FRONTEND_ORIGIN,
            'reset_url': f'{settings.FRONTEND_ORIGIN}/reset-password/{token}',
            'lifetime': _reset_link_lifetime(settings.PASSWORD_RESET_TIMEOUT),
        }
        try:
            message = EmailMultiAlternatives(
                subject='Reset your WSS password',
                body=render_to_string('participant/email/password_reset.txt', context),
                from_email=settings.SERVER_EMAIL,
                to=[user.email],
                headers={'x-liara-tag': 'password-reset'},
            )
            message.attach_alternative(
                render_to_string('participant/email/password_reset.html', context), 'text/html'
            )
            message.send(fail_silently=False)
        except Exception:
            logger.exception('Could not send the password reset email to user %s', user.pk)


@transaction.atomic
def reset_password(email: str, token: str, password: str) -> None:
    """Sets a new password if `token` is valid for an account with this email, and signs out its other sessions."""
    for user in _participant_accounts(email):
        if default_token_generator.check_token(user, token):
            check_password_strength(password, user)
            user.set_password(password)
            user.save(update_fields=['password'])
            revoke_refresh_tokens(user)
            return
    raise serializers.ValidationError({'token': INVALID_RESET_LINK}, code='invalid_token')


def revoke_refresh_tokens(user) -> None:
    """Blacklists every refresh token of the account, so a stolen session cannot outlive a password reset."""
    outstanding = OutstandingToken.objects.filter(user=user).exclude(blacklistedtoken__isnull=False)
    BlacklistedToken.objects.bulk_create([BlacklistedToken(token=token) for token in outstanding])


def change_password(user, old_password: str, new_password: str) -> None:
    if not user.check_password(old_password):
        raise serializers.ValidationError({'old_password': 'Your current password is not correct.'}, code='invalid')
    check_password_strength(new_password, user)
    user.set_password(new_password)
    user.save(update_fields=['password'])


# --- CV ------------------------------------------------------------------------------------------------------------

# Editions run in Tehran: "the edition has not ended" is judged by the date there, not the server's UTC date.
EDITION_TIME_ZONE = ZoneInfo('Asia/Tehran')


class CVSubmissionClosed(PermissionDenied):
    default_detail = 'This edition has ended, so its CVs can no longer be changed.'
    default_code = 'cv_submission_closed'


def cv_event(event_id: int) -> Event:
    return get_object_or_404(Event, pk=event_id)


def cv_submission_open(event: Event) -> bool:
    """A CV can be sent or replaced until the edition's last day is over. Withdrawing one is always allowed."""
    return timezone.localdate(timezone=EDITION_TIME_ZONE) <= event.ending_date


def get_cv(user, event: Event) -> CV:
    try:
        return CV.objects.get(user=user, event=event)
    except CV.DoesNotExist:
        raise NotFound('You have not uploaded a CV for this edition.', code='cv_not_found')


@transaction.atomic
def save_cv(*, user, event: Event, file) -> tuple[CV, bool]:
    """Creates or replaces the user's CV for this edition; returns it and whether it was created. Never touches the
    CVs of other editions."""
    if not cv_submission_open(event):
        raise CVSubmissionClosed()
    # Lock a row that exists before the first upload, so two concurrent first uploads cannot both create.
    User.objects.select_for_update().only('pk').get(pk=user.pk)
    cv = CV.objects.filter(user=user, event=event).first()
    created = cv is None
    previous = None if created else cv.file.name
    if created:
        cv = CV(user=user, event=event)
    cv.file = file
    cv.file_name = file.name
    cv.size = file.size
    cv.save()
    if previous:
        delete_stored_file(cv.file.storage, previous)
    return cv, created


def delete_cv(user, event: Event) -> None:
    # The stored file goes with the row (participant.signals).
    get_cv(user, event).delete()
