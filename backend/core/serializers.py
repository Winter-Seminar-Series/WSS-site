from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework import serializers
from core.models import Event, LabTalk, RoundTable, Seminar, Speaker, SubEvent, Workshop, WorkshopSession, PosterSession


class EmailTokenObtainSerializer(TokenObtainSerializer):
    username_field = User.EMAIL_FIELD


class CustomTokenObtainPairSerializer(EmailTokenObtainSerializer):
    @classmethod
    def get_token(cls, user):
        return RefreshToken.for_user(user)

    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)
        return data


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = '__all__'


class WorkshopSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopSession
        fields = '__all__'


class WorkshopSerializer(serializers.ModelSerializer):
    sessions = WorkshopSessionSerializer(source='workshopsession_set', many=True)

    class Meta:
        model = Workshop
        fields = ('name', 'description', 'sessions', 'poster', 'thumbnail')


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = '__all__'


class SubEventSerializer(serializers.ModelSerializer):
    # event = EventSerializer()
    class Meta:
        model = SubEvent
        fields = '__all__'


class SeminarSerializer(serializers.ModelSerializer):
    sub_event = SubEventSerializer()
    speaker = SpeakerSerializer()

    class Meta:
        model = Seminar
        fields = ('sub_event', 'speaker')


class PosterSessionSerializer(serializers.ModelSerializer):
    sub_event = SubEventSerializer()
    speaker = SpeakerSerializer()

    class Meta:
        model = PosterSession
        fields = ('sub_event', 'speaker')


class LabTalkSerializer(serializers.ModelSerializer):
    sub_event = SubEventSerializer()
    speaker = SpeakerSerializer()

    class Meta:
        model = LabTalk
        fields = ('sub_event', 'speaker')


class RoundTableSerializer(serializers.ModelSerializer):
    sub_event = SubEventSerializer()
    speakers = SpeakerSerializer(many=True)

    class Meta:
        model = RoundTable
        fields = ('sub_event', 'speakers')
