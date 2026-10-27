from rest_framework import serializers

from participant.models import ParticipationPlan, PlanAddon
from payment.models import GroupPaymentRequest, PaymentRequest
from payment.pricing import OrderLine

# A sanity bound on one line; the real limit is each add-on's `max_per_participant`.
MAX_ADDON_QUANTITY = 100

# Request bodies (frontend/types/payment.api.type.ts). Unknown keys, such as the `total_price` the frontend sends
# with a price request, are ignored.


def open_plans():
    return ParticipationPlan.objects.select_related('event', 'workshop', 'mode_of_attendance', 'spotplayer_course')


class AddonLineSerializer(serializers.Serializer):
    addon = serializers.PrimaryKeyRelatedField(queryset=PlanAddon.objects.select_related('plan'))
    quantity = serializers.IntegerField(min_value=1, max_value=MAX_ADDON_QUANTITY)


class OrderSerializer(serializers.Serializer):
    """Plans, add-ons, or both: a participant who already holds a plan can come back for its add-ons alone. The
    services check that the basket is not empty."""

    plans = serializers.PrimaryKeyRelatedField(queryset=open_plans(), many=True, required=False, default=list)
    addons = AddonLineSerializer(many=True, required=False, default=list, max_length=50)
    discount_code = serializers.CharField(required=False, allow_blank=True, max_length=50)

    def validate_plans(self, plans):
        return list(dict.fromkeys(plans))

    def validate_addons(self, lines) -> list[OrderLine]:
        """One line per add-on: repeated add-ons have their quantities added up."""
        quantities: dict[int, int] = {}
        addons = {}
        for line in lines:
            addon = line['addon']
            addons[addon.pk] = addon
            quantities[addon.pk] = quantities.get(addon.pk, 0) + line['quantity']
        return [OrderLine(addon=addons[pk], quantity=quantity) for pk, quantity in quantities.items()]


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
