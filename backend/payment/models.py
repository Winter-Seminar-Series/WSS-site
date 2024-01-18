from django.db import models
from core.models import Event
from participant.models import Participant, ParticipationPlan

class PaymentDiscount(models.Model):
    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE, blank=True)
    event = models.ForeignKey(Event, on_delete=models.CASCADE, blank=True)
    code = models.CharField(max_length=50, blank=False, unique=True)
    percentage = models.DecimalField(max_digits=4, decimal_places=2, default=0.0)
    amount = models.IntegerField(default=0)
    count = models.IntegerField(default=-1)

class PaymentRequest(models.Model):
    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)
    order_id = models.CharField(max_length=100, blank=True)