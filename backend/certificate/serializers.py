from rest_framework import serializers
from .models import Certificate

from participant.serializers import ParticipationSerializer


class CertificateSerializer(serializers.ModelSerializer):
    participation = ParticipationSerializer(read_only=True)

    class Meta:
        model = Certificate
        fields = ('certificate', 'participation')
