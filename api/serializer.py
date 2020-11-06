from rest_framework.serializers import ModelSerializer
from events.models import Workshop

class WorkshopSerializer(ModelSerializer):
    class Meta:
        model = Workshop
        fields = '__all__'