from django.db import models
from core.models import Event
from participant.models import Participant, ParticipationPlan


class PaymentDiscount(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True)
    code = models.CharField(max_length=50, blank=False, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    amount = models.IntegerField(default=0)
    count = models.IntegerField(default=-1)

    def __str__(self) -> str:
        return f'{self.code}'


# TODO: Apply models' changes effect on serializers(validation, creation, ...), views, admin and etc.
class PaymentRequest(models.Model):
    group_discount = {
        3: 10,
        4: 15,
        5: 20,
    }

    payer_participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)
    order_id = models.CharField(max_length=100, blank=True)

    # TODO: merge this with calculate_price()
    def get_price(self):
        total_m = 0
        total_w = 0

        # Aggregate prices across all participant-plan relationships
        for participant_plan in self.participant_plans.all():
            m_plans = participant_plan.plans.filter(kind='M')
            w_plans = participant_plan.plans.filter(kind='W')
            total_m += sum(plan.price for plan in m_plans)
            total_w += sum(plan.price for plan in w_plans)

        calculated_price = self.apply_group_discount(total_m)

        # Apply discount if available
        if self.discount:
            amount = int(self.discount.amount)
            percentage = float(self.discount.percentage)

            if amount != 0:
                calculated_price = max(calculated_price - amount, 0)
            elif percentage > 0:
                calculated_price -= calculated_price * percentage / 100

        calculated_price = int(calculated_price) + total_w
        total_price = total_m + total_w

        return total_price, calculated_price

    def __str__(self) -> str:
        return f'Payment {self.payer_participant} - {self.timestamp}'

    def apply_group_discount(self, total_m):
        group_count = self.participant_plans.count()
        res = total_m - total_m * self.group_discount.get(group_count, 0) / 100
        return res


# TODO: Add this new model to wherever it is needed.
class ParticipantPaymentPlans(models.Model):
    payment_request = models.ForeignKey(PaymentRequest, on_delete=models.CASCADE, related_name='participant_plans')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    plans = models.ManyToManyField(ParticipationPlan)

    def __str__(self) -> str:
        return f'{self.participant} in Payment {self.payment_request.id}'
