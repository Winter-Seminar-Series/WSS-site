from django.shortcuts import render
from rest_framework import generics, permissions
from core.models import Event
from core.serializers import EventSerializer, SpeakerSerializer

# Create your views here.
from rest_framework_simplejwt.views import TokenObtainPairView
from core.serializers import CustomTokenObtainPairSerializer

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class EventAPIView(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class SpeakerByEventAPIView(generics.ListAPIView):
    serializer_class = SpeakerSerializer

    def get_queryset(self):
        event_id = self.kwargs['event_id']
        return Event.objects.get(pk=event_id).speaker_set.all()