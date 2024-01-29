from django.shortcuts import render
from rest_framework import generics, permissions
from core.models import Event, Speaker
from core.serializers import EventSerializer, SpeakerSerializer

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
