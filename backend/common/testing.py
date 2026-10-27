"""Factories and helpers for the test suites. Plain functions: the models are few and the defaults obvious."""

import datetime
from itertools import count
from unittest import mock

from django.contrib.auth import get_user_model
from django.core.cache import cache
from rest_framework.test import APITestCase
from rest_framework.throttling import SimpleRateThrottle
from rest_framework_simplejwt.tokens import RefreshToken

from core.models import Event, Seminar, Speaker, SubEvent, Workshop, WorkshopSession
from participant.models import (
    ModeOfAttendance,
    Participant,
    ParticipantInfo,
    Participation,
    ParticipationPlan,
    PlanAddon,
)
from payment.models import PaymentDiscount

User = get_user_model()
PASSWORD = 'correct-horse-battery'
_ids = count(1)


def make_event(order: int = 10) -> Event:
    return Event.objects.create(
        name='WSS', order=order, starting_date=datetime.date(2025, 4, 10), ending_date=datetime.date(2025, 4, 11)
    )


def make_participant(email: str | None = None, password: str = PASSWORD, **info) -> Participant:
    email = email or f'participant{next(_ids)}@example.com'
    user = User.objects.create_user(username=email, email=email, password=password)
    profile = ParticipantInfo.objects.create(first_name='Ada', last_name='Lovelace', phone_number='09120000000', **info)
    return Participant.objects.create(user=user, info=profile)


def make_mode_plan(event: Event, price: int = 1_000_000, name: str = 'Online', **fields) -> ParticipationPlan:
    mode = ModeOfAttendance.objects.create(name=name)
    return ParticipationPlan.objects.create(
        event=event, kind=ParticipationPlan.KIND_MODE, mode_of_attendance=mode, price=price, **fields
    )


def make_workshop_plan(event: Event, price: int = 500_000, sessions: int = 1, **fields) -> ParticipationPlan:
    workshop = Workshop.objects.create(name=f'Workshop {next(_ids)}')
    for index in range(sessions):
        WorkshopSession.objects.create(
            workshop=workshop,
            speaker=make_speaker(),
            name=f'Module {index + 1}',
            date=datetime.date(2025, 4, 10),
            starting_time=datetime.time(9 + index),
            ending_time=datetime.time(10 + index),
        )
    return ParticipationPlan.objects.create(
        event=event, kind=ParticipationPlan.KIND_WORKSHOP, workshop=workshop, price=price, **fields
    )


def make_addon(plan: ParticipationPlan, price: int = 300_000, name: str = 'Lunch', **fields) -> PlanAddon:
    return PlanAddon.objects.create(plan=plan, name=name, price=price, **fields)


def make_discount(event: Event, code: str = 'SAVE20', **fields) -> PaymentDiscount:
    return PaymentDiscount.objects.create(event=event, code=code, **fields)


def register(participant: Participant, plan: ParticipationPlan) -> Participation:
    return Participation.objects.create(participant=participant, plan=plan, info=participant.info)


def make_speaker(name: str | None = None) -> Speaker:
    return Speaker.objects.create(name=name or f'Speaker {next(_ids)}', designation='Professor')


def make_seminar(event: Event, speaker: Speaker | None = None, **sub_event) -> Seminar:
    fields = {
        'name': f'Talk {next(_ids)}',
        'date': datetime.date(2025, 4, 10),
        'starting_time': datetime.time(9),
        'ending_time': datetime.time(10),
        **sub_event,
    }
    return Seminar.objects.create(
        sub_event=SubEvent.objects.create(event=event, kind='S', **fields), speaker=speaker or make_speaker()
    )


class APITest(APITestCase):
    """Starts every test with empty rate-limit counters."""

    def setUp(self):
        super().setUp()
        cache.clear()

    def authenticate(self, participant: Participant) -> None:
        token = RefreshToken.for_user(participant.user).access_token
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

    def error_codes(self, response) -> list[str]:
        return [error['code'] for error in response.json()['errors']]


def throttle_rates(**rates):
    """Overrides throttle rates; DRF reads them once at import, so settings overrides do not reach them."""
    return mock.patch.dict(SimpleRateThrottle.THROTTLE_RATES, rates)
