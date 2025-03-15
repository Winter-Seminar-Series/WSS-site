import random
import string

from django.core.mail import send_mail
from rest_framework import serializers, status
from rest_framework.response import Response

from core.models import Event
from payment.models import PaymentRequest, PaymentDiscount, GroupPaymentRequest
from participant.models import Participation, ParticipationPlan, Participant
from spotplayer.models import SpotPlayerAPI

from django.db.models import Q

from django.conf import settings
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def calculate_price(plans, discount):
    total_price = sum(plan.price for plan in plans if plan.kind == 'M')
    calculated_price = total_price
    if discount is not None:
        amount = int(discount.amount)
        percentage = float(discount.percentage)
        if amount != 0:
            calculated_price = max(0, calculated_price - amount)
        elif percentage > 0:
            calculated_price -= calculated_price * percentage / 100.
    calculated_price = int(calculated_price)
    total_price += sum(plan.price for plan in plans if plan.kind == 'W')
    calculated_price += sum(plan.price for plan in plans if plan.kind == 'W')
    return total_price, calculated_price

def validate_plans(attrs, is_price=True):
    plans = attrs.get('plans', None)
    if plans is None:
        raise serializers.ValidationError('Invalid plans')
    # TODO: add closing date to plan
    # for plan in plans:
    #     if plan.kind == 'M':
    #         raise serializers.ValidationError('This mode of attendance is not available right now')
    events = set([plan.event for plan in plans])
    if len(events) == 1:
        event = list(events)[0]
    elif len(events) == 0:
        event = -1
    else:
        raise serializers.ValidationError('Invalid discount code from multiple events')

    # Limit for In Person registrations
    for plan in plans:
        if plan.kind == 'M' and plan.mode_of_attendance.name.startswith('In Person'):
            current_registered = Participation.objects.filter(
                plan__kind='M',
                plan__mode_of_attendance__name__startswith='In Person',
                plan__event=event
            ).count()
            if current_registered > settings.IN_PERSON_LIMIT:
                raise serializers.ValidationError(
                    'This mode of attendance is not available right now due to Registration Limits'
                )

    if not is_price:
        participant = attrs.get('participant', None)
        registered_plans = ParticipationPlan.objects.filter(participation__participant=participant)
        for plan in plans:
            if plan in registered_plans:
                raise serializers.ValidationError('Plan already registered')
        registered_plans = list(registered_plans)
        has_mode = False
        for plan in plans + registered_plans:
            if plan.kind == 'M' and has_mode:
                raise serializers.ValidationError('Multiple mode of attendance selected')
            elif plan.kind == 'M':
                has_mode = True
        # if not has_mode:
        #     raise serializers.ValidationError('No mode of attendance selected')
    attrs['event'] = event
    return attrs

def validate_discount(attrs):
    event = attrs.get('event', None)
    discount_code = attrs.get('discount_code', None)
    if discount_code is None:
        return attrs
    discounts = PaymentDiscount.objects.filter(code=discount_code, event=event).filter(Q(count=-1) | Q(count__gt=0))
    if discounts.count() == 0:
        raise serializers.ValidationError('Invalid discount code')
    discount = discounts[0]
    attrs['discount'] = discount
    return attrs

def validate_participants(attrs):
    participant_emails = attrs.get('participant_emails', [])
    if not participant_emails:
        raise serializers.ValidationError('At least two participants are required for group payment.')

    participants = [attrs.get('participant')]
    for email in participant_emails:
        try:
            participant = Participant.objects.get(user__email=email)
        except:
            raise serializers.ValidationError(f'Participant {email} not found')
        participants.append(participant)

    attrs['participants'] = participants
    return attrs

def validate_group_plan(attrs, is_price=True):
    plan = attrs.get('plan', None)
    if plan is None:
        raise serializers.ValidationError('Invalid plan')
    # TODO: add closing date to plan
    # for plan in plans:
    #     if plan.kind == 'M':
    #         raise serializers.ValidationError('This mode of attendance is not available right now')
    event = plan.event or -1

    # Limit for In Person registrations
    if plan.kind == 'M' and plan.mode_of_attendance.name.startswith('In Person'):
            raise serializers.ValidationError(
                'This mode of attendance is not available right now due to Registration Limits'
            )

    if not is_price:
        participants = attrs.get('participants', [])
        for participant in participants:
            registered_plans = ParticipationPlan.objects.filter(participation__participant=participant)

            if plan in registered_plans:
                raise serializers.ValidationError(f'Plan already registered for {participant.__str__()}')
            registered_plans = list(registered_plans)
            registered_plans.append(plan)
            has_mode = False
            for plan in registered_plans:
                if plan.kind == 'M' and has_mode:
                    raise serializers.ValidationError('Multiple mode of attendance selected')
                elif plan.kind == 'M':
                    has_mode = True
            # if not has_mode:
        #     raise serializers.ValidationError('No mode of attendance selected')
    attrs['event'] = event
    return attrs


def calculate_group_price(plan, discount, group_discount_percentage, participant_numbers):
    if plan.kind == 'W':
        raise serializers.ValidationError('The group payment not available for workshop.')
    total_price = plan.price
    calculated_price = total_price

    if group_discount_percentage > 0:
        calculated_price -= calculated_price * group_discount_percentage / 100.

    if discount is not None:
        amount = int(discount.amount)
        percentage = float(discount.percentage)
        if amount != 0:
            calculated_price = max(0, calculated_price - amount)
        elif percentage > 0:
            calculated_price -= calculated_price * percentage / 100.

    calculated_price = int(calculated_price)

    return participant_numbers * total_price, participant_numbers * calculated_price


def create_discount_code(participants):
    discount_codes = []
    for i in range(len(participants)):
        discount_code = ''.join(random.choices(string.ascii_uppercase, k=8)) + ''.join(
            random.choices(string.digits, k=2))
        discount_codes.append(discount_code)

    payment_discounts = [PaymentDiscount(
        event=Event.objects.last(),
        code=discount_code,
        percentage=100,
        count=1,
    ) for discount_code in discount_codes]

    PaymentDiscount.objects.bulk_create(payment_discounts)

    return [(participant.user.email, discount_code) for participant, discount_code in
            zip(participants, discount_codes)]


class PaymentRequestPriceSerializer(serializers.ModelSerializer):
    total_price = serializers.IntegerField(required=False)
    calculated_price = serializers.IntegerField(required=False)
    discount_code = serializers.CharField(required=False)

    class Meta:
        model = PaymentRequest
        fields = ['plans', 'discount_code', 'discount', 'total_price', 'calculated_price']
    
    def validate(self, attrs):
        validate_plans(attrs, is_price=True)
        validate_discount(attrs)
        return attrs

class PaymentRequestCreateSerializer(serializers.ModelSerializer):
    discount_code = serializers.CharField(required=False)
    
    class Meta:
        model = PaymentRequest
        fields = ['plans', 'participant', 'discount_code', 'discount']
    
    def validate(self, attrs):
        validate_plans(attrs, is_price=False)
        validate_discount(attrs)
        return attrs
    
    def create(self, validated_data):
        discount = validated_data.get('discount', None)
        if discount is not None:
            if discount.count != -1:
                discount.count -= 1
                discount.save()
        model_dict = validated_data.copy()
        model_dict.pop('discount_code', None)
        model_dict.pop('event', None)
        req = super().create(model_dict)
        participant = req.participant
        plans = validated_data['plans']
        total_price, calculated_price = calculate_price(plans, validated_data.get('discount'))
        if calculated_price == 0:
            req.paid = True
            req.save()
            info = participant.info
            info.pk = None
            info.save()
            license = None
            spotplayer_courses = [plan.spotplayer_course for plan in plans if plan.spotplayer_course is not None]
            if len(spotplayer_courses) > 0:
                license = SpotPlayerAPI().create_license(spotplayer_courses, participant)
            for plan in plans:
                Participation.objects.create(
                    participant=participant,
                    plan=plan,
                    info=info,
                    spotplayer_license=license if plan.spotplayer_course is not None else None
                )
            return 'https://wss-sharif.com/dashboard/profile'
        url = settings.PAYMENT_SERVICE_URL + '/transaction'
        logger.info('Payment request for participant %d, total price: %d, calculated price: %d', participant.id, total_price, calculated_price)
        logger.info(f'sending request to {url}')
        data = {
            "user_id": participant.id,
            "to_pay_amount": calculated_price,
            "discount_amount": total_price - calculated_price,
            "buying_goods": [str(plan) for plan in plans],
            "name": participant.user.first_name + ' ' + participant.user.last_name,
            "phone": participant.info.phone_number,
            "mail": participant.user.email,
            "callback_url": settings.PAYMENT_CALLBACK_URL + '/' + str(req.id),
        }
        logger.info(f'sending data: {data}')
        res = requests.post(url, json=data)
        logger.info(f'response: {res.status_code} {res.text}')
        logger.info(f'{res.request.body}')
        if res.status_code != 201:
            logger.error('Payment service error')
            raise serializers.ValidationError('Payment service error')
        res = res.json()
        req.order_id = res['order_id']
        req.save()
        return res['redirect_url']
    
    def to_representation(self, instance):
        return {
            'redirect_url': instance
        }

class PaymentRequestVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRequest
        fields = ['id', 'order_id', 'paid']


class GroupPaymentRequestPriceSerializer(serializers.ModelSerializer):
    total_price = serializers.IntegerField(required=False)
    calculated_price = serializers.IntegerField(required=False)
    discount_code = serializers.CharField(required=False)
    participant_emails = serializers.ListField(
        child=serializers.EmailField(),
        write_only=True
    )

    class Meta:
        model = GroupPaymentRequest
        fields = ['plan', 'discount_code', 'discount', 'total_price', 'calculated_price', 'participant_emails',
                  'group_discount_percentage']

    def validate(self, attrs):
        validate_participants(attrs)
        attrs['group_discount_percentage'] = GroupPaymentRequest.get_group_discount_percentage(
            len(attrs['participants']))
        validate_group_plan(attrs, is_price=True)
        validate_discount(attrs)
        return attrs


class GroupPaymentRequestCreateSerializer(serializers.ModelSerializer):
    discount_code = serializers.CharField(required=False)
    participant_emails = serializers.ListField(
        child=serializers.EmailField(),
        write_only=True
    )

    class Meta:
        model = GroupPaymentRequest
        fields = ['plan', 'participant', 'discount_code', 'discount', 'participant_emails']

    def validate(self, attrs):
        validate_participants(attrs)
        validate_group_plan(attrs, is_price=True)
        validate_discount(attrs)
        return attrs

    def create(self, validated_data):
        discount = validated_data.get('discount', None)
        if discount is not None:
            if discount.count != -1:
                discount.count -= 1
                discount.save()
        model_dict = validated_data.copy()
        model_dict.pop('discount_code', None)
        model_dict.pop('event', None)
        model_dict['participant_numbers'] = len(validated_data['participants'])
        req = super().create(model_dict)
        participant = req.participant
        plan = validated_data['plan']
        total_price, calculated_price = calculate_group_price(plan, validated_data.get('discount'),
                                                              req.group_discount_percentage, req.participant_numbers)
        if calculated_price == 0:
            req.paid = True
            req.save()
            created_discount_codes = create_discount_code(req.all_participants)
            for email, discount_code in created_discount_codes:
                send_mail(
                    'WSS Discount Code',
                    f'Your discount code for registration is {discount_code}',
                    settings.EMAIL_HOST_USER,
                    [email],
                )
            return Response('Discount codes sent to all participants.', status=status.HTTP_200_OK)

        url = settings.PAYMENT_SERVICE_URL + '/transaction'
        logger.info('Group payment request for participant %d, total price: %d, calculated price: %d',
                    participant.id, total_price, calculated_price)

        logger.info(f'sending request to {url}')
        data = {
            "user_id": participant.id,
            "to_pay_amount": calculated_price,
            "discount_amount": total_price - calculated_price,
            "buying_goods": [str(plan)],
            "name": participant.user.first_name + ' ' + participant.user.last_name,
            "phone": participant.info.phone_number,
            "mail": participant.user.email,
            "callback_url": settings.PAYMENT_CALLBACK_URL + '/' + str(req.id),
        }
        logger.info(f'sending data: {data}')

        res = requests.post(url, json=data)
        logger.info(f'response: {res.status_code} {res.text}')
        logger.info(f'{res.request.body}')
        if res.status_code != 201:
            logger.error('Payment service error')
            raise serializers.ValidationError('Payment service error')
        res = res.json()
        req.order_id = res['order_id']
        req.save()
        return res['redirect_url']

    def to_representation(self, instance):
        return {
            'redirect_url': instance
        }


class GroupPaymentRequestVerifySerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPaymentRequest
        fields = ['id', 'order_id', 'paid']