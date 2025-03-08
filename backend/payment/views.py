from django.core.mail import send_mail

from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import serializers

from django.conf import settings
import requests

from payment.serializers import PaymentRequestCreateSerializer, PaymentRequestPriceSerializer, \
    PaymentRequestVerifySerializer, calculate_price, GroupPaymentRequestCreateSerializer, \
    GroupPaymentRequestPriceSerializer, calculate_group_price, GroupPaymentRequestVerifySerializer, create_discount_code

from payment.models import PaymentRequest, GroupPaymentRequest
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
            instance.save()
            info = instance.participant.info
            info.pk = None
            info.save()
            plans = instance.plans.all()
            license = None
            spotplayer_courses = [plan.spotplayer_course for plan in plans if plan.spotplayer_course is not None]
            if len(spotplayer_courses) > 0:
                try:
                    license = SpotPlayerAPI().create_license(spotplayer_courses, instance.participant)
                except:
                    license = None
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
            instance.save()
            if instance.discount is not None:
                instance.discount.count += 1
                instance.discount.save()
        else:
            logger.error('Payment service error')
            raise serializers.ValidationError('Payment service error')
        logger.info(f'Payment request {pk} updated')
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class GroupPaymentRequestCreateAPIView(generics.CreateAPIView):
    serializer_class = GroupPaymentRequestCreateSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        try:
            participant = Participant.objects.get(user=self.request.user)
        except:
            raise serializers.ValidationError('Participant not found')
        request.data['participant'] = participant.pk
        return self.create(request, *args, **kwargs)


class GroupPaymentRequestPriceAPIView(generics.GenericAPIView):
    serializer_class = GroupPaymentRequestPriceSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        total_price, calculated_price = calculate_group_price(
            serializer.validated_data['plan'],
            serializer.validated_data.get('discount'),
            serializer.validated_data.get('group_discount_percentage'),
            len(serializer.validated_data.get('participants')))
        return Response({
            'total_price': total_price,
            'calculated_price': calculated_price
        })


class GroupPaymentRequestVerifyAPIView(generics.GenericAPIView):
    serializer_class = GroupPaymentRequestVerifySerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if 'pk' not in self.kwargs:
            logger.error('Payment request not found')
            raise serializers.ValidationError('Payment request not found')
        pk = self.kwargs['pk']
        try:
            participant = Participant.objects.get(user=self.request.user)
            instance = GroupPaymentRequest.objects.get(pk=pk)
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
            instance.save()
            created_discount_codes = create_discount_code(instance.all_participants)
            for email, discount_code in created_discount_codes:
                send_mail(
                    'WSS Discount Code',
                    f'Your discount code for registration is {discount_code}',
                    settings.EMAIL_HOST_USER,
                    [email],
                )
            return Response('Discount codes sent to all participants.', status=status.HTTP_200_OK)
        elif res['payment_status'] == 'failed':
            logger.error('Payment request not paid')
            instance.paid = False
            instance.save()
            if instance.discount is not None:
                instance.discount.count += 1
                instance.discount.save()
        else:
            logger.error('Payment service error')
            raise serializers.ValidationError('Payment service error')
        logger.info(f'Payment request {pk} updated')
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
