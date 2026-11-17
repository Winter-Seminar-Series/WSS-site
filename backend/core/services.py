from django.contrib.auth import get_user_model
from django.db import transaction
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.exceptions import APIException

from core.models import Event, PosterSessionImage


class PosterAlreadySubmitted(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = 'A poster has already been submitted for this edition; replace it instead.'
    default_code = 'poster_already_submitted'


def poster_submission_event(event_id: int | None) -> Event:
    # Unscoped URLs belong to the original WSS 10 submissions, never to a moving "current" edition.
    lookup = {'pk': event_id} if event_id is not None else {'order': 10}
    return get_object_or_404(Event, **lookup)


@transaction.atomic
def create_poster_submission(*, user, event: Event, image) -> PosterSessionImage:
    # Lock a row that exists even before the first submission. Concurrent creates must not upload orphan files.
    get_user_model().objects.select_for_update().only('pk').get(pk=user.pk)
    if PosterSessionImage.objects.filter(user=user, event=event).exists():
        raise PosterAlreadySubmitted()
    return PosterSessionImage.objects.create(user=user, event=event, image=image)
