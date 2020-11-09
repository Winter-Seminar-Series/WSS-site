from rest_framework.serializers import ModelSerializer
from events.models import Workshop, Seminar, PosterSession
from WSS.models import Sponsorship, Clip, Booklet
from api.models import Url


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


class UrlSerializer(ModelSerializer):
    class Meta:
        model = Url
        fields = '__all__'
