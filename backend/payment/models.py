from django.db import models
from core.models import Event
from participant.models import Participant, ParticipationType

class PaymentDiscount(models.Model):
    plan = models.ForeignKey(ParticipationType, on_delete=models.CASCADE)
    code = models.TextField(max_length=50, blank=False)
    discount = models.DecimalField(max_digits=4, decimal_places=2, blank=False)
    count = models.IntegerField(default=-1)

class PaymentRequest(models.Model):
    plan = models.ForeignKey(ParticipationType, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    paid = models.BooleanField(default=False)
    discount = models.ForeignKey(PaymentDiscount, on_delete=models.CASCADE, null=True, blank=True)