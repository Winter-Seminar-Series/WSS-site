from rest_framework.serializers import ModelSerializer
from events.models import Workshop, Seminar

class WorkshopSerializer(ModelSerializer):
    class Meta:
        model = Workshop
        fields = '__all__'


class SeminarSerializer(ModelSerializer):
    class Meta:
        model = Seminar
        fields = '__all__'