from random import choices

from django.conf import settings
from django.core.mail import send_mail
from django.http import Http404
from django.shortcuts import get_object_or_404
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response

from participant.models import Participant
from participant.serializers import (ParticipantInfoSerializer,
                                     ParticipantSerializer)


class ParticipantCreateAPIView(generics.CreateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [permissions.AllowAny, ]


class ParticipantInfoRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = Participant.objects.all()
    serializer_class = ParticipantInfoSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self):
        participant = get_object_or_404(Participant, user=self.request.user)
        return participant.info


class PasswordResetAPIView(views.APIView):
    permission_classes = [permissions.AllowAny, ]

    def post(self, request):
        participant = Participant.objects.filter(
            user__email=request.data['email']).last()
        if not participant:
            raise Http404
        participant.password_reset_code = ''.join(
            choices([str(i) for i in range(10)], k=17))
        participant.save()
        send_mail(
            'WSS Password Reset',
            f'Your WSS password reset link is: https://wss.ce.sharif.edu/password-reset/{participant.password_reset_code}',
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
            participant = Participant.objects.get(
                user__email=request.data['email'])
        except Participant.DoesNotExist:
            raise Http404
        if participant.password_reset_code == request.data['token']:
            participant.user.set_password(request.data['password'])
            participant.user.save()
            return Response(
                'Password reset successfully',
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                'Password reset code is not correct',
                status=status.HTTP_406_NOT_ACCEPTABLE
            )