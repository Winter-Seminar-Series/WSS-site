from rest_framework.serializers import ModelSerializer
from events.models import Workshop, Seminar, PosterSession
from people.models import HoldingTeam
from WSS.models import WSS, Sponsorship, Clip, Booklet, Image, UserProfile

from django.contrib.auth.models import User


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
            'participants_count',
            'ical_link',
            'year',
            'start_date',
            'proposal_link',
            'show_stats',
            'calendar_link'
        ]

class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'username', 'email', 'first_name', 'last_name', 'phone_number', 'age', 'job', 'university',
            'introduction_method', 'gender', 'city', 'country',
            'field_of_interest', 'grade', 'is_student'
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


class HoldingTeamSerializer(ModelSerializer):
    class Meta:
        model = HoldingTeam
        fields = '__all__'


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


# User Serializer
class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


# Register Serializer
class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'], validated_data['email'], validated_data['password'])
        
        user_profile = UserProfile(user=user)
        user_profile.save()

        return user
