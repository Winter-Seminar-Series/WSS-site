from rest_framework import permissions, generics

from participant.serializers import ParticipantSerializer
from participant.models import Participant


class ParticipantCreateAPIView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [permissions.AllowAny, ]
