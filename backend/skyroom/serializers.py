from rest_framework import serializers

from skyroom.models import SkyroomRoom, SkyroomEvent

class SkyroomRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkyroomRoom
        fields = ('room_id', 'name', 'title')

class SkyroomEventSerializer(serializers.ModelSerializer):
    room = SkyroomRoomSerializer()

    class Meta:
        model = SkyroomEvent
        fields = ('id', 'room', 'plan', 'title', 'description', 'starting_time', 'duration')

class SkyroomEventWithLinkSerializer(serializers.ModelSerializer):
    link = serializers.CharField()

    class Meta:
        model = SkyroomEvent
        fields = ('id', 'link')