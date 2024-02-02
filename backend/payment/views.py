from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from django.conf import settings
import requests

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestPriceSerializer, PaymentRequestVerifySerializer, calculate_price

from payment.models import PaymentRequest
from participant.models import Participant, Participation

# Create your views here.
class PaymentRequestCreateAPIView(generics.CreateAPIView):
    serializer_class = PaymentRequestCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except:
            raise serializers.ValidationError('Participant not found')
        request.data['participant'] = participant.pk
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
    
    def get(self, request, *args, **kwargs):
        if 'pk' not in self.kwargs:
            raise serializers.ValidationError('Payment request not found')
        pk = self.kwargs['pk']
        try:
            participant = Participant.objects.get(user=self.request.user)
            instance = PaymentRequest.objects.get(pk=pk)
        except:
            raise serializers.ValidationError('Participant or request not found')
        if instance.participant != participant:
            raise serializers.ValidationError('Participant does not match')
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