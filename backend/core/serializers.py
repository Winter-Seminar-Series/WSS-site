from django.core.validators import FileExtensionValidator
from rest_framework import serializers

from core.models import Event, PosterSessionImage, RoundTable, Speaker, SubEvent, Workshop, WorkshopSession

# The response shapes are mirrored by the frontend (frontend/types/events.api.type.ts): add fields, never rename.


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class SpeakerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Speaker
        fields = '__all__'


class SubEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubEvent
        fields = '__all__'


class SingleSpeakerSessionSerializer(serializers.Serializer):
    """A seminar, lab talk or poster session: the shared sub-event plus its one speaker."""

    sub_event = SubEventSerializer()
    speaker = SpeakerSerializer()


class RoundTableSerializer(serializers.ModelSerializer):
    sub_event = SubEventSerializer()
    speakers = SpeakerSerializer(many=True)

    class Meta:
        model = RoundTable
        fields = ('sub_event', 'speakers')


class WorkshopSessionSerializer(serializers.ModelSerializer):
    # `speaker` stays the id for existing clients; `speaker_details` saves them a request per speaker.
    speaker_details = SpeakerSerializer(source='speaker', read_only=True)

    class Meta:
        model = WorkshopSession
        fields = '__all__'


class WorkshopSerializer(serializers.ModelSerializer):
    sessions = WorkshopSessionSerializer(source='workshopsession_set', many=True)

    class Meta:
        model = Workshop
        fields = ('name', 'description', 'sessions', 'poster', 'thumbnail')


class PosterSessionImageSerializer(serializers.ModelSerializer):
    MAX_SIZE = 10 * 1024 * 1024

    image = serializers.FileField(validators=[FileExtensionValidator(['pdf'])])

    class Meta:
        model = PosterSessionImage
        fields = ('image',)

    def validate_image(self, file):
        if file.size > self.MAX_SIZE:
            raise serializers.ValidationError('The poster must be 10 MB or smaller.', code='file_too_large')
        return file
