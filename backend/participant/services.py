import logging

from django.conf import settings
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.tokens import default_token_generator
from django.core.exceptions import ValidationError as DjangoValidationError
from django.core.mail import EmailMessage
from django.db import IntegrityError, transaction
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken

from participant.models import Participant, ParticipantInfo

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


def send_password_reset(email: str) -> None:
    """
    Emails a reset link to every participant account with this address. Says nothing about whether one exists:
    the caller answers the same either way, and a delivery failure is logged rather than reported.
    """
    for user in _participant_accounts(email):
        token = default_token_generator.make_token(user)
        link = f'{settings.FRONTEND_ORIGIN}/reset-password/{token}'
        hours = settings.PASSWORD_RESET_TIMEOUT // 3600
        message = EmailMessage(
            subject='WSS password reset',
            body=(
                f'Use this link to choose a new password for your WSS account:\n\n{link}\n\n'
                f'It works once and expires in {hours} hour{"s" if hours != 1 else ""}. '
                'If you did not ask for it, ignore this email: your password stays the same.'
            ),
            from_email=settings.SERVER_EMAIL,
            to=[user.email],
            headers={'x-liara-tag': 'password-reset'},
        )
        try:
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
