from django.contrib.postgres.fields import ArrayField
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
    
    def __str__(self) -> str:
        return f'{self.participant} - {self.timestamp}'


class GroupPaymentRequest(models.Model):
    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    participant_numbers = models.IntegerField(default=1)
    timestamp = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)
    order_id = models.CharField(max_length=100, blank=True)
    group_discount_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    participant_emails = ArrayField(models.EmailField(), blank=True, default=list)

    def save(self, *args, **kwargs):
        self.group_discount_percentage = self.get_group_discount_percentage(self.participant_numbers)
        super().save(*args, **kwargs)

    @staticmethod
    def get_group_discount_percentage(participant_numbers):
        discount_mapping = {
            3: 15,
            4: 20,
        }
        return discount_mapping.get(participant_numbers, 25 if participant_numbers >= 5 else 0)

    @property
    def all_participants(self):
        all_participants = [self.participant]
        other_participants = Participant.objects.filter(user__email__in=self.participant_emails)
        return all_participants.extend(other_participants)

    def get_price(self):
        plan = self.plan
        if plan.kind == 'W':
            return 0, 0
        total_price = plan.price
        calculated_price = total_price

        if self.group_discount_percentage > 0:
            calculated_price -= calculated_price * self.group_discount_percentage / 100.

        if self.discount is not None:
            amount = int(self.discount.amount)
            percentage = float(self.discount.percentage)
            if amount != 0:
                calculated_price = max(0, calculated_price - amount)
            elif percentage > 0:
                calculated_price -= calculated_price * percentage / 100.

        calculated_price = int(calculated_price)

        return self.participant_numbers * total_price, self.participant_numbers * calculated_price