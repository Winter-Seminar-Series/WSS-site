from rest_framework.serializers import ModelSerializer
from events.models import Workshop, Seminar, PosterSession
from WSS.models import WSS, Sponsorship, Clip, Booklet


class WSSSerializer(ModelSerializer):
    class Meta:
        model = WSS
        fields = [
            'main_image_url',
            'main_clip_url',
            'booklet_url',
            'staff_count',
            'is_active',
            'is_registration_open',
            'participants_count'
        ]


class WorkshopSerializer(ModelSerializer):
    class Meta:
        model = Workshop
        fields = '__all__'


class SeminarSerializer(ModelSerializer):
    class Meta:
        model = Seminar
        fields = '__all__'


class PosterSessionSerializer(ModelSerializer):
    class Meta:
        model = PosterSession
        fields = '__all__'


class SponsorshipSerializer(ModelSerializer):
    class Meta:
        model = Sponsorship
        fields = '__all__'


class ClipSerializer(ModelSerializer):
    class Meta:
        model = Clip
        fields = '__all__'


class BookletSerializer(ModelSerializer):
    class Meta:
        model = Booklet
        fields = '__all__'
