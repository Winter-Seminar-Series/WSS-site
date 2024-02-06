from django.db import models
from core.models import Event
from participant.models import Participant, ParticipationPlan

class PaymentDiscount(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True)
    code = models.CharField(max_length=50, blank=False, unique=True)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    amount = models.IntegerField(default=0)
    count = models.IntegerField(default=-1)

class PaymentRequest(models.Model):
    plans = models.ManyToManyField(ParticipationPlan)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)
    order_id = models.CharField(max_length=100, blank=True)

    def get_price(self):
        plans = self.plans.all()
        total_price = sum(plan.price for plan in plans if plan.kind == 'M')
        calculated_price = total_price
        if self.discount is not None:
            amount = int(self.discount.amount)
            percentage = float(self.discount.percentage)
            if amount != 0:
                calculated_price -= amount
            elif percentage > 0:
                calculated_price -= calculated_price * percentage / 100.
        calculated_price = int(calculated_price)
        total_price += sum(plan.price for plan in plans if plan.kind == 'W')
        calculated_price += sum(plan.price for plan in plans if plan.kind == 'W')
        return total_price, calculated_price