from rest_framework import serializers

from payment.models import PaymentRequest, PaymentDiscount
from participant.models import Participation, ParticipationPlan

from django.db.models import Q

from django.conf import settings
import requests
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def calculate_price(plans, discount):
    total_price = sum(plan.price for plan in plans)
    calculated_price = total_price
    if discount is not None:
        amount = int(discount.amount)
        percentage = float(discount.percentage)
        if amount != 0:
            calculated_price -= amount
        elif percentage > 0:
            calculated_price -= calculated_price * percentage / 100.
    calculated_price = int(calculated_price)
    return total_price, calculated_price

def validate_plans(attrs):
    plans = attrs.get('plans', None)
    if plans is None:
        raise serializers.ValidationError('Invalid plans')
    events = set([plan.event for plan in plans])
    if len(events) == 1:
        event = list(events)[0]
    elif len(events) == 0:
        event = -1
    else:
        raise serializers.ValidationError('Invalid discount code from multiple events')
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

class PaymentRequestPriceSerializer(serializers.ModelSerializer):
    total_price = serializers.IntegerField(required=False)
    calculated_price = serializers.IntegerField(required=False)
    discount_code = serializers.CharField(required=False)

    class Meta:
        model = PaymentRequest
        fields = ['plans', 'discount_code', 'discount', 'total_price', 'calculated_price']
    
    def validate(self, attrs):
        validate_plans(attrs)
        validate_discount(attrs)
        return attrs

class PaymentRequestCreateSerializer(serializers.ModelSerializer):
    discount_code = serializers.CharField(required=False)
    
    class Meta:
        model = PaymentRequest
        fields = ['plans', 'participant', 'discount_code', 'discount']
    
    def validate(self, attrs):
        validate_plans(attrs)
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