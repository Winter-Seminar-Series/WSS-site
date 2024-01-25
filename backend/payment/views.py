from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from participant.models import Participant

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestVerifySerializer

# Create your views here.
class PaymentRequestCreateAPIView(generics.CreateAPIView):
    serializer_class = PaymentRequestCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        participant = get_object_or_404(Participant, user=self.request.user)
        request.data['participant'] = participant
        return super().post(request, *args, **kwargs)

class PaymentRequestVerifyAPIView(generics.UpdateAPIView):
    serializer_class = PaymentRequestVerifySerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()