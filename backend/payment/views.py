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
from spotplayer.models import SpotPlayerAPI

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
            instance = PaymentRequest.objects.get(pk=pk)
        except:
            logger.error('Participant or request not found')
            raise serializers.ValidationError('Participant or request not found')
        if instance.participant != participant:
            logger.error('Participant does not match')
            raise serializers.ValidationError('Participant does not match')
        if instance.paid:
            logger.warning('Payment request already paid')
            return instance
        url = f'{settings.PAYMENT_SERVICE_URL}/transaction?order_id={instance.order_id}'
        res = requests.get(url)
        logger.debug(f'Payment service response: {res.status_code} {res.text}')
        if res.status_code != 200:
            raise serializers.ValidationError('Payment service error')
        res = res.json()
        if res['payment_status'] == 'success':
            logger.info('Payment request paid')
            instance.paid = True
            info = instance.participant.info
            info.pk = None
            info.save()
            plans = instance.plans.all()
            license = None
            spotplayer_courses = [plan.spotplayer_course for plan in plans if plan.spotplayer_course is not None]
            if len(spotplayer_courses) > 0:
                license = SpotPlayerAPI().create_license(spotplayer_courses, instance.participant)
            for plan in plans:
                Participation.objects.create(
                    participant=instance.participant,
                    plan=plan,
                    info=info,
                    spotplayer_license=license if plan.spotplayer_course is not None else None
                )
                logger.info(f'Participation for plan {plan.pk} created')
        elif res['payment_status'] == 'failed':
            logger.error('Payment request not paid')
            instance.paid = False
            if instance.discount is not None:
                instance.discount.count += 1
                instance.discount.save()
        else:
            logger.error('Payment service error')
            raise serializers.ValidationError('Payment service error')
        instance.save()
        logger.info(f'Payment request {pk} updated')
        serializer = self.get_serializer(instance)
        return Response(serializer.data)