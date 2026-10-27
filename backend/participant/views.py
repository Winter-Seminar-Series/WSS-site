import base64
import binascii

from django.core.files.storage import default_storage
from django.db.models import Prefetch, QuerySet, Sum
from django.db.models.functions import Coalesce
from django.http import Http404
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from common.throttling import EmailRateThrottle, ScopedRateThrottle
from core.models import WorkshopSession
from participant import services
from participant.models import (
    AddonPurchase,
    ParticipantInfo,
    Participation,
    ParticipationAttachment,
    ParticipationPlan,
    PlanAddon,
)
from participant.serializers import (
    AddonHoldingSerializer,
    EmailTokenObtainPairSerializer,
    FileSerializer,
    ParticipationAttachmentSerializer,
    ParticipationPlanSerializer,
    ParticipationSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetRequestSerializer,
    ProfileSerializer,
    SignUpSerializer,
)

# --- Accounts ------------------------------------------------------------------------------------------------------


class SignInView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    throttle_classes = [ScopedRateThrottle, EmailRateThrottle]
    throttle_scope = 'sign_in'


class SignInRefreshView(TokenRefreshView):
    """Called by the frontend's proxy.ts, server to server, for every signed-in visitor: not rate limited."""


class SignUpView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = SignUpSerializer
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'sign_up'


class PasswordResetView(APIView):
    """POST `{email}` sends a reset link; PUT `{email, token, password}` uses it."""

    permission_classes = [AllowAny]

    def get_throttles(self):
        if self.request.method == 'POST':
            self.throttle_scope = 'password_reset'
            return [ScopedRateThrottle(), EmailRateThrottle()]
        self.throttle_scope = 'password_reset_confirm'
        return [ScopedRateThrottle()]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.send_password_reset(serializer.validated_data['email'])
        # The same answer whether or not the address has an account.
        return Response({'detail': 'If an account uses this email, a reset link is on its way.'})

    def put(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.reset_password(**serializer.validated_data)
        return Response({'detail': 'Your password has been reset.'})


class PasswordChangeView(APIView):
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'password_change'

    def put(self, request):
        serializer = PasswordChangeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        services.change_password(request.user, **serializer.validated_data)
        return Response({'detail': 'Your password has been changed.'})


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer

    def get_object(self) -> ParticipantInfo:
        return services.get_or_create_profile(services.get_participant(self.request.user))

    def get_serializer_context(self):
        return {**super().get_serializer_context(), 'email': self.request.user.email}


# --- Plans (public) ------------------------------------------------------------------------------------------------


def plans_of_edition(event_id: int) -> QuerySet[ParticipationPlan]:
    sessions = WorkshopSession.objects.select_related('speaker').order_by('date', 'starting_time', 'id')
    addons = PlanAddon.objects.annotate(sold=Coalesce(Sum('purchases__quantity'), 0)).order_by('id')
    return (
        ParticipationPlan.objects.filter(event_id=event_id)
        .select_related('event', 'workshop', 'mode_of_attendance')
        .prefetch_related(
            Prefetch('workshop__workshopsession_set', queryset=sessions), Prefetch('addons', queryset=addons)
        )
        .order_by('id')
    )


class PlanListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ParticipationPlanSerializer
    kind: str | None = None

    def get_queryset(self):
        plans = plans_of_edition(self.kwargs['event_id'])
        return plans.filter(kind=self.kind) if self.kind else plans


class WorkshopPlanListView(PlanListView):
    kind = ParticipationPlan.KIND_WORKSHOP


class ModeOfAttendancePlanListView(PlanListView):
    kind = ParticipationPlan.KIND_MODE


# --- The participant's registrations -------------------------------------------------------------------------------


class ParticipationListView(generics.ListAPIView):
    serializer_class = ParticipationSerializer

    def get_queryset(self):
        return Participation.objects.filter(
            plan__event_id=self.kwargs['event_id'], participant__user=self.request.user
        ).select_related('spotplayer_license')


class AddonHoldingListView(generics.ListAPIView):
    """`[{addon, quantity}]`: the add-ons of an edition the participant has paid for, summed over purchases."""

    serializer_class = AddonHoldingSerializer

    def get_queryset(self):
        return (
            AddonPurchase.objects.filter(
                addon__plan__event_id=self.kwargs['event_id'], participant__user=self.request.user
            )
            .values('addon_id')
            .annotate(quantity=Sum('quantity'))
            .order_by('addon_id')
        )


class AttachmentListView(generics.ListAPIView):
    serializer_class = ParticipationAttachmentSerializer

    def get_queryset(self):
        return ParticipationAttachment.objects.filter(
            participation__plan__event_id=self.kwargs['event_id'],
            participation__participant__user=self.request.user,
        ).select_related(
            'participation__plan__event', 'participation__plan__workshop', 'participation__plan__mode_of_attendance'
        )


class FileView(APIView):
    """Resolves a certificate id (see ParticipationAttachmentSerializer) to its URL. Public: certificates are shared
    by link. Only ids of existing certificates resolve; anything else is a 404."""

    permission_classes = [AllowAny]

    def get(self, request, file_id: str):
        try:
            name = base64.b64decode(file_id, validate=True).decode()
        except (binascii.Error, UnicodeDecodeError):
            raise Http404
        if not ParticipationAttachment.objects.filter(attachment=name).exists():
            raise Http404
        return Response(FileSerializer({'attachment': default_storage.url(name)}).data, status=status.HTTP_200_OK)
