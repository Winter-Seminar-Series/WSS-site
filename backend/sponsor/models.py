from django.db import models
from core.models import Event

class Sponsor(models.Model):
    name = models.TextField(max_length=50, blank=False)
    description = models.TextField(max_length=1000, blank=True)
    thumbnail = models.ImageField(upload_to='sponsors/', blank=True)
    website = models.URLField(blank=True)

class SponsorImage(models.Model):
    sponsor = models.ForeignKey(Sponsor, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='sponsors/', blank=False)

class Sponsorship(models.Model):
    sponsor = models.ForeignKey(Sponsor, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)