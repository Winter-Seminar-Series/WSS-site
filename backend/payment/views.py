from django.shortcuts import render

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from django.conf import settings
import requests

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestPriceSerializer, PaymentRequestVerifySerializer, calculate_price

from payment.models import PaymentRequest
from participant.models import Participant, ParticipantInfo, Participation

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

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
            logger.error('Payment request not found')
            raise serializers.ValidationError('Payment request not found')
        pk = self.kwargs['pk']
        try:
            participant = Participant.objects.get(user=self.request.user)
            logger.error(f'Participant {participant.pk} is verifying payment request {pk}')
            instance = PaymentRequest.objects.get(pk=pk)
            logger.error(f'Payment request {pk} found')
        except:
            logger.error('Participant or request not found')
            raise serializers.ValidationError('Participant or request not found')
        if instance.participant != participant:
            logger.error('Participant does not match')
            raise serializers.ValidationError('Participant does not match')
        if instance.paid:
            logger.error('Payment request already paid')
            return instance
        url = f'{settings.PAYMENT_SERVICE_URL}/transaction?order_id={instance.order_id}'
        res = requests.get(url)
        logger.error(f'Payment service response: {res.status_code} {res.text}')
        if res.status_code != 200:
            raise serializers.ValidationError('Payment service error')
        res = res.json()
        if res['payment_status'] == 'success':
            logger.error('Payment request paid')
            instance.paid = True
            info = instance.participant.info
            info.pk = None
            info.save()
            logger.error(f'Participant info {info.pk} created')
            for plan in instance.plans.all():
                Participation.objects.create(
                    participant=instance.participant,
                    plan=plan,
                    info=info
                )
                logger.error(f'Participation for plan {plan.pk} created')
        else:
            logger.error('Payment request not paid')
            instance.paid = False
        instance.save()
        logger.error(f'Payment request {pk} updated')
        return Response(instance)