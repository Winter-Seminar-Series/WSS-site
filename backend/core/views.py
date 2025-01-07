from django.shortcuts import render
from rest_framework import generics, permissions
from core.models import Event, LabTalk, Seminar, Speaker, RoundTable
from core.serializers import EventSerializer, SeminarSerializer, SpeakerSerializer, RoundTableSerializer

# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers import CustomTokenObtainPairSerializer


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class EventAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class SpeakerAPIView(generics.RetrieveAPIView):
    queryset = Speaker.objects.all()
    serializer_class = SpeakerSerializer


class SeminarAPIView(generics.ListAPIView):
    queryset = Seminar.objects.all()
    serializer_class = SeminarSerializer

    def get_queryset(self):
        return Seminar.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class LabTalkAPIView(generics.ListAPIView):
    queryset = LabTalk.objects.all()
    serializer_class = SeminarSerializer

    def get_queryset(self):
        return LabTalk.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')


class RoundTableAPIView(generics.ListAPIView):
    queryset = RoundTable.objects.all()
    serializer_class = RoundTableSerializer

    def get_queryset(self):
        return RoundTable.objects.filter(
            sub_event__event=self.kwargs['event_id']
        ).order_by('sub_event__date', 'sub_event__starting_time')
