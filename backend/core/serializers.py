from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainSerializer
from rest_framework import serializers
from core.models import Event, Workshop, WorkshopSession

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

class WorkshopSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkshopSession
        fields = '__all__'

class WorkshopSerializer(serializers.ModelSerializer):
    sessions = WorkshopSessionSerializer(source='workshopsession_set', many=True)

    class Meta:
        model = Workshop
        fields = ('name', 'description', 'sessions')