from rest_framework.serializers import ModelSerializer, Serializer, CharField, SerializerMethodField
from events.models import *
from people.models import HoldingTeam, Speaker, Staff
from WSS.models import *
from django.contrib.auth.models import User


class WSSSerializer(ModelSerializer):
    class Meta:
        model = WSS
        fields = [
            'main_image_url',
            'description',
            'main_clip_url',
            'booklet_url',
            'staff_count',
            'is_active',
            'is_registration_open',
            'participants_count',
            'ical_link',
            'year',
            'start_date',
            'end_date',
            'proposal_link',
            'show_stats',
            'registration_fee',
            'calendar_link'
        ]


class WssTagSerializer(ModelSerializer):
    class Meta:
        model = WssTag
        fields = ['wss', 'name']


class UserProfileSerializer(ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'username', 'email', 'first_name', 'last_name', 'phone_number', 'age', 'job', 'university',
            'introduction_method', 'gender', 'city', 'country',
            'field_of_interest', 'grade', 'is_student', 'favorite_tags'
        ]

class AnnouncementSerializer(ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'


class EventSerializer(ModelSerializer):

    def __init__(self, *args, **kwargs):
        serialize_link = kwargs.pop('serialize_link', False)
        super().__init__(*args, **kwargs)
        if not serialize_link:
            self.fields.pop('link')


class WorkshopSerializer(EventSerializer):
    class Meta:
        model = Workshop
        fields = '__all__'


class SeminarSerializer(EventSerializer):
    class Meta:
        model = Seminar
        fields = '__all__'


class PosterSessionSerializer(EventSerializer):
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
    staff = SerializerMethodField(read_only=True)

    def get_staff(self, model):
        return [s.id for s in model.staff.all().order_by('order')]

    class Meta:
        model = HoldingTeam
        fields = '__all__'


class ImageSerializer(ModelSerializer):
    class Meta:
        model = Image
        fields = '__all__'


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')


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


class ChangePasswordSerializer(Serializer):
    model = User

    old_password = CharField(required=True)
    new_password = CharField(required=True)


class VenueSerializer(ModelSerializer):
    class Meta:
        model = Venue
        fields = '__all__'


class SponsorSerializer(ModelSerializer):
    class Meta:
        model = Sponsor
        fields = '__all__'


class SpeakerSerializer(ModelSerializer):
    class Meta:
        model = Speaker
        fields = '__all__'


class SeminarMaterialSerializer(ModelSerializer):
    class Meta:
        model = SeminarMaterial
        fields = '__all__'


class WorkshopMaterialSerializer(ModelSerializer):
    class Meta:
        model = WorkshopMaterial
        fields = '__all__'


class PosterMaterialSerializer(ModelSerializer):
    class Meta:
        model = PosterMaterial
        fields = '__all__'


class StaffSerializer(ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'
