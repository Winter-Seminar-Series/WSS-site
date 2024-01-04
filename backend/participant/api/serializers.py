from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework import serializers

from participant.models import Participant, ParticipantInfo


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'password', 'email')

    def validate_password(self, value: str) -> str:
        return make_password(value)


class ParticipantInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ParticipantInfo
        fields = ('firs_name_persian', 'last_name_persian', 'national_code', 'phone_number', 'image', 'bio', 'designation')

class ParticipantSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Participant
        fields = ('user', )

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create(**user_data)
        participant = Participant.objects.create(user=user, **validated_data)
        return participant