import base64

from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from core.serializers import WorkshopSerializer
from participant import services
from participant.models import ModeOfAttendance, Participant, ParticipantInfo, Participation, ParticipationAttachment
from participant.models import ParticipationPlan, PlanAddon
from participant.validators import normalize_national_code, validate_phone_number

User = get_user_model()

# The response shapes are mirrored by the frontend (frontend/types/participant.api.type.ts): add, never rename.


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """`{email, password}` → `{access, refresh}` (participant.backends.EmailBackend checks the credentials)."""

    username_field = User.EMAIL_FIELD


# --- Sign-up -------------------------------------------------------------------------------------------------------


class SignUpUserSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    # The email doubles as the username, which Django caps at 150 characters.
    email = serializers.EmailField(max_length=150)
    password = serializers.CharField(write_only=True, trim_whitespace=False)

    def validate_email(self, value: str) -> str:
        value = services.normalize_email(value)
        if services.email_is_taken(value):
            raise serializers.ValidationError('An account with this email already exists.', code='email_taken')
        return value

    def validate(self, attrs):
        services.check_password_strength(attrs['password'], User(username=attrs['email'], email=attrs['email']))
        return attrs


class SignUpSerializer(serializers.Serializer):
    """`{user: {email, password}}` → `{user: {id, email}}`."""

    user = SignUpUserSerializer()

    def create(self, validated_data) -> Participant:
        return services.register_participant(**validated_data['user'])

    def to_representation(self, participant: Participant):
        return {'user': {'id': participant.user.id, 'email': participant.user.email}}


# --- Passwords -----------------------------------------------------------------------------------------------------


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()


class PasswordResetConfirmSerializer(serializers.Serializer):
    email = serializers.EmailField()
    token = serializers.CharField(max_length=100)
    password = serializers.CharField(trim_whitespace=False)


class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(trim_whitespace=False)
    new_password = serializers.CharField(trim_whitespace=False)


# --- Profile -------------------------------------------------------------------------------------------------------


class ProfileSerializer(serializers.ModelSerializer):
    """The participant's ParticipantInfo plus their (read-only) account email, passed in the context."""

    email = serializers.SerializerMethodField()

    class Meta:
        model = ParticipantInfo
        fields = '__all__'

    def get_email(self, info: ParticipantInfo) -> str:
        return self.context['email']

    def validate_national_code(self, value: str) -> str:
        return normalize_national_code(value)

    def validate_phone_number(self, value: str) -> str:
        return validate_phone_number(value)


# --- Plans and registrations ---------------------------------------------------------------------------------------


class ModeOfAttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModeOfAttendance
        fields = '__all__'


class PlanAddonSerializer(serializers.ModelSerializer):
    """`remaining` is the number of units left, or null for no limit. It is a hint for the page, which may cache it;
    checkout counts again."""

    remaining = serializers.SerializerMethodField()

    class Meta:
        model = PlanAddon
        fields = ('id', 'name', 'description', 'price', 'discountable', 'is_open', 'max_per_participant', 'remaining')

    def get_remaining(self, addon: PlanAddon) -> int | None:
        if addon.capacity is None:
            return None
        return max(0, addon.capacity - addon.sold)


class ParticipationPlanSerializer(serializers.ModelSerializer):
    event = serializers.CharField(source='event.name', read_only=True)
    workshop = WorkshopSerializer()
    mode_of_attendance = ModeOfAttendanceSerializer()
    addons = PlanAddonSerializer(many=True, read_only=True)

    class Meta:
        model = ParticipationPlan
        fields = ('id', 'price', 'event', 'kind', 'workshop', 'mode_of_attendance', 'is_open', 'addons')


class ParticipationSerializer(serializers.ModelSerializer):
    plan = serializers.IntegerField(source='plan_id', read_only=True)
    license_key = serializers.CharField(source='spotplayer_license.license_key', read_only=True, default=None)

    class Meta:
        model = Participation
        fields = ('plan', 'license_key')


class AddonHoldingSerializer(serializers.Serializer):
    """How many units of an add-on the participant holds, across all their purchases."""

    addon = serializers.IntegerField(source='addon_id')
    quantity = serializers.IntegerField()


def encode_file_id(name: str) -> str:
    return base64.b64encode(name.encode()).decode()


class ParticipationAttachmentSerializer(serializers.ModelSerializer):
    """A certificate. `UUID` is the opaque id the public `/file/<id>/` endpoint resolves to the file's URL."""

    UUID = serializers.SerializerMethodField()
    plan = serializers.CharField(source='participation.plan', read_only=True)

    class Meta:
        model = ParticipationAttachment
        fields = ('id', 'plan', 'description', 'date', 'UUID')

    def get_UUID(self, attachment: ParticipationAttachment) -> str:
        return encode_file_id(attachment.attachment.name)


class FileSerializer(serializers.Serializer):
    attachment = serializers.CharField()
