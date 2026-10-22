from rest_framework import generics
from rest_framework.response import Response

from participant.services import get_participant
from skyroom.client import SkyroomClient
from skyroom.models import SkyroomEvent
from skyroom.serializers import SkyroomEventSerializer, SkyroomEventWithLinkSerializer


class SkyroomEventsView(generics.ListAPIView):
    """The signed-in participant's sessions that are open right now."""

    serializer_class = SkyroomEventSerializer

    def get_queryset(self):
        return (
            SkyroomEvent.objects.for_user(self.request.user)
            .open_now()
            .select_related('room')
            .prefetch_related('plans')
            .order_by('starting_time')
        )


class SkyroomEventLinkView(generics.GenericAPIView):
    """A personal login link to one of those sessions; 404 for sessions the participant has not paid for or that
    are not open."""

    serializer_class = SkyroomEventWithLinkSerializer

    def get_queryset(self):
        return SkyroomEvent.objects.for_user(self.request.user).open_now().select_related('room')

    def get(self, request, *args, **kwargs):
        event = self.get_object()
        participant = get_participant(request.user)
        info = participant.info
        nickname = f'{info.first_name} {info.last_name}'.strip() if info else ''
        link = SkyroomClient().login_url(
            event.room.room_id, user_id=participant.pk, nickname=nickname or participant.user.email
        )
        return Response(self.get_serializer({'id': event.id, 'link': link}).data)
