from rest_framework import serializers

from payment.models import PaymentRequest, PaymentDiscount
from participant.models import Participation, ParticipationPlan

from django.db.models import Q

from django.conf import settings
import requests

class PaymentRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRequest
        fields = ['plans', 'participant', 'discount_code']
    
    def validate(self, attrs):
        discount_code = attrs.get('discount_code', None)
        plans = attrs.get('plans', None)
        if plans is None:
            raise serializers.ValidationError('Invalid plans')
        plans = ParticipationPlan.objects.filter(pk__in=plans)
        events = [plan.event for plan in plans]
        if events:
            event = events[0]
        else:
            event = -1
        if discount_code is None:
            return attrs
        discounts = PaymentDiscount.objects.filter(code=discount_code).filter(event=event).filter(Q(count=-1) | Q(count__gt=0))
        if discounts.count() == 0:
            raise serializers.ValidationError('Invalid discount code')
        discount = discounts[0]
        attrs['discount'] = discount
        return attrs
    
    def create(self, validated_data):
        discount = validated_data.get('discount', None)
        if discount is not None:
            if discount.count != -1:
                discount.count -= 1
                discount.save()
        req = super().create(validated_data)
        participant = req.participant
        plan = req.plan,
        discount = req.discount
        calculated_price = plan.price
        if discount is not None:
            if discount.amount != 0:
                calculated_price -= discount.amount
            elif discount.percentage > 0:
                calculated_price -= calculated_price * discount.percentage / 100.
        calculated_price = int(calculated_price)
        url = settings.PAYMENT_SERVICE_URL + '/create'
        data = {
            "user_id": participant.id,
            "to_pay_amount": calculated_price,
            "discount_amount": plan.price - calculated_price,
            "description": plan.description,
            "buying_goods": [plan.name],
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
    
    def update(self, instance, validated_data):
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
        return instance