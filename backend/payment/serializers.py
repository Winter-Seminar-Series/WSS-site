from rest_framework import serializers

from payment.models import PaymentRequest, PaymentDiscount
from participant.models import Participation, ParticipationPlan

from django.db.models import Q

from django.conf import settings
import requests

def calculate_price(plans, discount):
    total_price = sum(plan.price for plan in plans)
    calculated_price = total_price
    if discount is not None:
        if discount.amount != 0:
            calculated_price -= discount.amount
        elif discount.percentage > 0:
            calculated_price -= calculated_price * discount.percentage / 100.
    calculated_price = int(calculated_price)
    return total_price, calculated_price

def validate_plans(attrs):
    plans = attrs.get('plans', None)
    if plans is None:
        raise serializers.ValidationError('Invalid plans')
    participation_plans = ParticipationPlan.objects.filter(pk__in=plans)
    if len(plans) != len(participation_plans):
        raise serializers.ValidationError('Invalid plans')
    plans = participation_plans
    events = set([plan.event for plan in plans])
    if len(events) == 1:
        event = events[0]
    elif len(events) == 0:
        event = -1
    else:
        raise serializers.ValidationError('Invalid discount code from multiple events')
    return event

def validate_discount_code(attrs, event):
    discount_code = attrs.get('discount_code', None)
    if discount_code is None:
        return attrs
    discounts = PaymentDiscount.objects.filter(code=discount_code).filter(event=event).filter(Q(count=-1) | Q(count__gt=0))
    if discounts.count() == 0:
        raise serializers.ValidationError('Invalid discount code')
    discount = discounts[0]
    return discount

class PaymentRequestPriceSerializer(serializers.ModelSerializer):
    total_price = serializers.IntegerField()
    calculated_price = serializers.IntegerField()

    class Meta:
        model = PaymentRequest
        fields = ['plans', 'participant', 'discount_code']
    
    def validate(self, attrs):
        event = validate_plans(attrs)
        attrs['discount'] = validate_discount_code(attrs, event)
        return attrs

class PaymentRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRequest
        fields = ['plans', 'participant', 'discount_code']
    
    def validate(self, attrs):
        event = validate_plans(attrs)
        attrs['discount'] = validate_discount_code(attrs, event)
        return attrs
    
    def create(self, validated_data):
        discount = validated_data.get('discount', None)
        if discount is not None:
            if discount.count != -1:
                discount.count -= 1
                discount.save()
        req = super().create(validated_data)
        participant = req.participant
        plans = req.plans
        total_price, calculated_price = calculate_price(plans, req.discount)
        url = settings.PAYMENT_SERVICE_URL + '/create'
        data = {
            "user_id": participant.id,
            "to_pay_amount": calculated_price,
            "discount_amount": total_price - calculated_price,
            "buying_goods": [plan.name for plan in plans],
            "name": participant.user.first_name + ' ' + participant.user.last_name,
            "phone": participant.info.phone_number,
            "mail": participant.user.email,
            "callback_url": settings.PAYMENT_CALLBACK_URL + '/' + str(req.id),
        }
        res = requests.post(url, data=data)
        if res.status_code != 200:
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