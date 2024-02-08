from django.db import models
from core.models import Event

class Sponsor(models.Model):
    name = models.TextField(max_length=50, blank=False)
    description = models.TextField(max_length=1000, blank=True)
    thumbnail = models.ImageField(upload_to='sponsors/', blank=True)
    website = models.URLField(blank=True)

    def __str__(self) -> str:
        return f'{self.name}'

class SponsorImage(models.Model):
    sponsor = models.ForeignKey(Sponsor, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='sponsors/', blank=False)

    def __str__(self) -> str:
        return f'{self.sponsor}'

class Sponsorship(models.Model):
    sponsor = models.ForeignKey(Sponsor, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.sponsor} - {self.event}'