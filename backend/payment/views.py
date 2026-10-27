from rest_framework.response import Response
from rest_framework.views import APIView

from common.throttling import ScopedRateThrottle
from participant.services import get_participant
from payment import services
from payment.serializers import (
    GroupOrderSerializer,
    GroupPaymentStatusSerializer,
    OrderSerializer,
    PaymentStatusSerializer,
    price_response,
)


class CheckoutView(APIView):
    """Signed-in participants only; limited per user so discount codes cannot be enumerated."""

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'payment'


class PriceView(CheckoutView):
    """`{plans?, addons?: [{addon, quantity}], discount_code?}` → `{total_price, calculated_price}` (Rial)."""

    def post(self, request):
        order = OrderSerializer(data=request.data)
        order.is_valid(raise_exception=True)
        data = order.validated_data
        quote = services.quote_order(
            get_participant(request.user), data['plans'], data.get('discount_code'), data['addons']
        )
        return Response(price_response(quote))


class CreatePaymentView(CheckoutView):
    """`{plans?, addons?: [{addon, quantity}], discount_code?}` → `{redirect_url}`: the bank, or the dashboard when
    nothing is due."""

    def post(self, request):
        order = OrderSerializer(data=request.data)
        order.is_valid(raise_exception=True)
        data = order.validated_data
        redirect_url = services.create_payment(
            get_participant(request.user), data['plans'], data.get('discount_code'), data['addons']
        )
        return Response({'redirect_url': redirect_url}, status=201)


class VerifyPaymentView(APIView):
    """`{id, order_id, paid}`. Idempotent: the frontend's /callback calls it every time the payer lands there."""

    def get(self, request, pk: int):
        payment = services.verify_payment(get_participant(request.user), pk)
        return Response(PaymentStatusSerializer(payment).data)


class GroupPriceView(CheckoutView):
    def post(self, request):
        order = GroupOrderSerializer(data=request.data)
        order.is_valid(raise_exception=True)
        participants = services.resolve_group(get_participant(request.user), order.validated_data['participant_emails'])
        quote = services.quote_group(
            order.validated_data['plan'], participants, order.validated_data.get('discount_code')
        )
        return Response(price_response(quote))


class CreateGroupPaymentView(CheckoutView):
    def post(self, request):
        order = GroupOrderSerializer(data=request.data)
        order.is_valid(raise_exception=True)
        payer = get_participant(request.user)
        participants = services.resolve_group(payer, order.validated_data['participant_emails'])
        redirect_url = services.create_group_payment(
            payer, order.validated_data['plan'], participants, order.validated_data.get('discount_code')
        )
        return Response({'redirect_url': redirect_url}, status=201)


class VerifyGroupPaymentView(APIView):
    def get(self, request, pk: int):
        payment = services.verify_group_payment(get_participant(request.user), pk)
        return Response(GroupPaymentStatusSerializer(payment).data)
