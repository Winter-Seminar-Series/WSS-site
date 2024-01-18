from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestVerifySerializer

# Create your views here.
class PaymentRequestCreateAPIView(generics.CreateAPIView):
    serializer_class = PaymentRequestCreateSerializer
    permission_classes = [IsAuthenticated]

class PaymentRequestVerifyAPIView(generics.UpdateAPIView):
    serializer_class = PaymentRequestVerifySerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        serializer.save()