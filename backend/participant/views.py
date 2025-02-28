import base64
from random import choices

from django.conf import settings
from django.core.mail import send_mail
from django.http import Http404
from django.core.files import storage
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from participant.models import Participant, Participation, ParticipationPlan, ParticipationAttachment
from participant.serializers import ParticipantInfoSerializer, ParticipantSerializer, ParticipationPlanSerializer, ParticipationSerializer, ParticipationAttachmentSerializer, FileSerializer


class ParticipantCreateAPIView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        response.data['user'].pop('password')
        return response

class ParticipantInfoRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantInfoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except Participant.DoesNotExist:
            raise Http404
        self.check_object_permissions(self.request, participant)
        return participant.info


class PasswordResetAPIView(views.APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        try:
            participant = Participant.objects.get(user__email=request.data['email'])
        except Participant.DoesNotExist:
            raise Http404
        except Participant.MultipleObjectsReturned:
            return Response(
                'Mutiple Users found with this Email Address',
                status=status.HTTP_400_BAD_REQUEST
            )
        participant.password_reset_code = ''.join(
            choices([str(i) for i in range(10)], k=10))
        participant.save()
        send_mail(
            'WSS Password Reset',
            f'Your WSS password reset link is: https://wss-sharif.com/reset-password/{participant.password_reset_code}',
            settings.EMAIL_HOST_USER,
            [participant.user.email],
        )
        return Response(
            'Password reset code sent to the email address ({0})'.format(
                participant.user.email),
            status=status.HTTP_200_OK
        )

    def put(self, request):
        try:
            participant = Participant.objects.get(user__email=request.data['email'])
        except Participant.DoesNotExist:
            raise Http404
        except Participant.MultipleObjectsReturned:
            return Response(
                'Mutiple Users found with this Email Address',
                status=status.HTTP_400_BAD_REQUEST
            )
        if not participant.password_reset_code:
            return Response(
                'Password reset code is not set for this user. '
                'Or the password is already changed with that code.',
                status=status.HTTP_400_BAD_REQUEST
            )
        elif participant.password_reset_code == request.data['token']:
            participant.user.set_password(request.data['password'])
            participant.user.save()
            participant.password_reset_code = None
            participant.save()
            return Response(
                'Password reset successfully',
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                'Password reset code is not correct',
                status=status.HTTP_406_NOT_ACCEPTABLE
            )

class ParticipantPasswordChangeAPIView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        participant = Participant.objects.get(user=request.user)
        if not participant.user.check_password(request.data['old_password']):
            return Response(
                'Old password is not correct',
                status=status.HTTP_406_NOT_ACCEPTABLE
            )
        participant.user.set_password(request.data['new_password'])
        participant.user.save()
        return Response(
            'Password changed successfully',
            status=status.HTTP_200_OK
        )

class ParticipationByEventAPIView(generics.ListAPIView):
    serializer_class = ParticipationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Participation.objects.filter(plan__event=self.kwargs['event_id'], participant=self.kwargs['participant'])

    def get(self, request, *args, **kwargs):
        try:
            self.kwargs['participant'] = Participant.objects.get(user=self.request.user)
        except Participant.DoesNotExist:
            raise Http404
        return self.list(request, *args, **kwargs)

class ParticipationPlanByEventAPIView(generics.ListAPIView):
    queryset = ParticipationPlan.objects.all()
    serializer_class = ParticipationPlanSerializer

    def get_queryset(self):
        return ParticipationPlan.objects.filter(event=self.kwargs['event_id'])

class WorkshopByEventAPIView(generics.ListAPIView):
    queryset = ParticipationPlan.objects.all()
    serializer_class = ParticipationPlanSerializer

    def get_queryset(self):
        return ParticipationPlan.objects.filter(event=self.kwargs['event_id'], kind='W')

class ModeOfAttendanceByEventAPIView(generics.ListAPIView):
    queryset = ParticipationPlan.objects.all()
    serializer_class = ParticipationPlanSerializer

    def get_queryset(self):
        return ParticipationPlan.objects.filter(event=self.kwargs['event_id'], kind='M')

class ParticipationAttachmentByEventAPIView(generics.ListAPIView):
    serializer_class = ParticipationAttachmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ParticipationAttachment.objects.filter(participation__plan__event=self.kwargs['event_id'], participation__participant=self.kwargs['participant'])

    def get(self, request, *args, **kwargs):
        try:
            self.kwargs['participant'] = Participant.objects.get(user=self.request.user)
        except Participant.DoesNotExist:
            raise Http404
        return self.list(request, *args, **kwargs)

class FileByIDAPIView(views.APIView):
    serializer_class = FileSerializer

    def get(self, request, *args, **kwargs):
        url = base64.b64decode(self.kwargs['file_id']).decode()
        return Response(FileSerializer({'attachment': storage.default_storage.url(url)}).data)
