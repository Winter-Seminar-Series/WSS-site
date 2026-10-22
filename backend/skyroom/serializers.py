from rest_framework import serializers

from skyroom.models import SkyroomEvent, SkyroomRoom


class SkyroomRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkyroomRoom
        fields = ('room_id', 'name', 'title')


class SkyroomEventSerializer(serializers.ModelSerializer):
    room = SkyroomRoomSerializer()

    class Meta:
        model = SkyroomEvent
        fields = ('id', 'room', 'plans', 'title', 'description', 'starting_time', 'duration')


class SkyroomEventWithLinkSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    link = serializers.CharField()
