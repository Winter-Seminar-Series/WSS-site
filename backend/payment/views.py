from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from participant.models import Participant, Participation
from rest_framework.response import Response
from rest_framework import serializers

from django.conf import settings
import requests

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestPriceSerializer, PaymentRequestVerifySerializer, calculate_price

# Create your views here.
class PaymentRequestCreateAPIView(generics.CreateAPIView):
    serializer_class = PaymentRequestCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        participant = get_object_or_404(Participant, user=self.request.user)
        request.data['participant'] = participant
        return self.create(request, *args, **kwargs)

class PaymentRequestPriceAPIView(generics.GenericAPIView):
    serializer_class = PaymentRequestPriceSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        total_price, calculated_price = calculate_price(serializer.validated_data['plans'], serializer.validated_data.get('discount'))
        return Response({
            'total_price': total_price,
            'calculated_price': calculated_price
        })

class PaymentRequestVerifyAPIView(generics.GenericAPIView):
    serializer_class = PaymentRequestVerifySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return super().get_object()
    
    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.paid:
            return instance
        url = f'{settings.PAYMENT_SERVICE_URL}/transaction?order_id={instance.order_id}'
        res = requests.get(url)
        if res.status_code != 200:
            raise serializers.ValidationError('Payment service error')
        res = res.json()
        if res['payment_status'] == 'success':
            instance.paid = True
            Participation.objects.create(participant=instance.participant, plan=instance.plan, info=instance.participant.info)
        else:
            instance.paid = False
        instance.save()
        return Response(instance)