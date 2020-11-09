from rest_framework.serializers import ModelSerializer
from events.models import Workshop, Seminar, PosterSession
from WSS.models import Sponsorship, Clip

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