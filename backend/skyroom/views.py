from skyroom.models import SkyroomEvent, SkyroomAPI
from skyroom.serializers import SkyroomEventSerializer, SkyroomEventWithLinkSerializer
from participant.models import Participant, Participation, ParticipationPlan

from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, GenericAPIView
from rest_framework import serializers

from django.utils import timezone
from django.db.models import F
from rest_framework.response import Response

# Create your views here.
class SkyroomEventsView(ListAPIView):
    queryset = SkyroomEvent.objects.all()
    serializer_class = SkyroomEventSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except:
            raise serializers.ValidationError('Participant not found')
        participant_plans = Participation.objects.filter(participant=participant).values_list('plan', flat=True)
        events = SkyroomEvent.objects.filter(plans__in=participant_plans)
        events = events.filter(starting_time__lte=timezone.now() + F('tolerance'))
        events = events.filter(starting_time__gte=timezone.now() - F('duration') - F('tolerance'))
        events = events.order_by('starting_time')
        serializer = self.get_serializer(events, many=True)
        return Response(serializer.data)


class SkyroomEventLinkView(GenericAPIView):
    queryset = SkyroomEvent.objects.all()
    serializer_class = SkyroomEventWithLinkSerializer
    permission_classes = [IsAuthenticated]
    skyroom = SkyroomAPI()
    
    def get(self, request, *args, **kwargs):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except:
            raise serializers.ValidationError('Participant not found')
        event = self.get_object()
        link = self.skyroom.get_user_link(event.room.room_id, participant.id)
        return Response(self.get_serializer({
            'id': event.id,
            'link': link
        }).data)