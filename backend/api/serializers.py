from rest_framework.serializers import ModelSerializer, Serializer, CharField, SerializerMethodField
from events.models import *
from people.models import HoldingTeam, Speaker, Staff
from WSS.models import *
from django.contrib.auth.models import User
from django.conf import settings


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
            'workshop_registration_open',
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
            'email', 'first_name', 'last_name', 'phone_number', 'age', 'job', 'university',
            'introduction_method', 'gender', 'city', 'country', 'major',
            'field_of_interest', 'grade', 'is_student', 'favorite_tags',
            'date_of_birth', 'social_media_ids', 'open_to_work', 'resume',
            'is_online_attendant',
        ]


class AnnouncementSerializer(ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'


class EventSerializer(ModelSerializer):
    start_time = SerializerMethodField()

    def __init__(self, *args, **kwargs):
        serialize_link = kwargs.pop('serialize_link', False)
        super().__init__(*args, **kwargs)
        if not serialize_link:
            self.fields.pop('link')

    def get_start_time(self, event: BaseEvent):
        return event.start_time + settings.CLIENT_TIME_DELTA


class WorkshopSerializer(EventSerializer):
    remaining_capacity = SerializerMethodField()

    class Meta:
        model = Workshop
        fields = '__all__'

    def get_remaining_capacity(self, workshop: Workshop):
        return workshop.remaining_capacity


class RoundTableSerializer(EventSerializer):
    class Meta:
        model = RoundTable
        fields = '__all__'


class LabTalkSerializer(EventSerializer):
    class Meta:
        model = LabTalk
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
        fields = ('id', 'email')


class RegisterSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'], validated_data['email'], validated_data['password'])

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


class StreamRoomSerializer(ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'tag')


class IncomingEventsSerializer(ModelSerializer):
    stream_room = StreamRoomSerializer()

    class Meta:
        model = BaseEvent
        fields = ('id', 'type', 'stream_room')


class StaffSerializer(ModelSerializer):
    class Meta:
        model = Staff
        fields = '__all__'


class ParticipantDeepSerializer(ModelSerializer):
    SELECTORS_BY_MODEL = {
        "User": lambda p: p.user_profile.user,
        "UserProfile": lambda p: p.user_profile,
        "WSS": lambda p: p.current_wss,
    }
    FIELDS_BY_MODEL = {
        "User": ['email', 'first_name', 'last_name', 'date_joined'],
        "UserProfile": ['phone_number', 'age', 'job', 'university', 'introduction_method',
                        'gender', 'city', 'country', 'field_of_interest', 'grade'],
        "WSS": ['year'],
    }

    class Meta:
        model = Participant
        fields = '__all__'

    email = SerializerMethodField()
    first_name = SerializerMethodField()
    last_name = SerializerMethodField()
    date_joined = SerializerMethodField()
    phone_number = SerializerMethodField()
    age = SerializerMethodField()
    job = SerializerMethodField()
    university = SerializerMethodField()
    introduction_method = SerializerMethodField()
    gender = SerializerMethodField()
    city = SerializerMethodField()
    country = SerializerMethodField()
    field_of_interest = SerializerMethodField()
    grade = SerializerMethodField()
    year = SerializerMethodField()
    date_of_birth = SerializerMethodField()
    social_media_ids = SerializerMethodField()

    @classmethod
    def get_getter(cls, selector, field):
        def getter(participant: Participant):
            return getattr(selector(participant), field)
        return getter

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for model in self.FIELDS_BY_MODEL:
            selector = self.SELECTORS_BY_MODEL[model]
            for field in self.FIELDS_BY_MODEL[model]:
                setattr(self, f"get_{field}", self.get_getter(selector, field))
