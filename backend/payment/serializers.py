from rest_framework import serializers

from participant.models import ParticipationPlan
from payment.models import GroupPaymentRequest, PaymentRequest

# Request bodies (frontend/types/payment.api.type.ts). Unknown keys, such as the `total_price` the frontend sends
# with a price request, are ignored.


def open_plans():
    return ParticipationPlan.objects.select_related('event', 'workshop', 'mode_of_attendance', 'spotplayer_course')


class OrderSerializer(serializers.Serializer):
    plans = serializers.PrimaryKeyRelatedField(queryset=open_plans(), many=True, allow_empty=False)
    discount_code = serializers.CharField(required=False, allow_blank=True, max_length=50)

    def validate_plans(self, plans):
        return list(dict.fromkeys(plans))


class GroupOrderSerializer(serializers.Serializer):
    plan = serializers.PrimaryKeyRelatedField(queryset=open_plans())
    participant_emails = serializers.ListField(child=serializers.EmailField(), allow_empty=False, max_length=50)
    discount_code = serializers.CharField(required=False, allow_blank=True, max_length=50)


class PaymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentRequest
        fields = ('id', 'order_id', 'paid')


class GroupPaymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupPaymentRequest
        fields = ('id', 'order_id', 'paid')


def price_response(quote) -> dict:
    return {'total_price': quote.total, 'calculated_price': quote.payable}
