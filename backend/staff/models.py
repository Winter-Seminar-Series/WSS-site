from django.db import models
from core.models import Event

class Staff(models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=50, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    image = models.ImageField(upload_to='staff/', blank=True)

class StaffTeam(models.Model):
    name = models.TextField(max_length=50, blank=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

class StaffTeamMember(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='events')
    staff_team = models.ForeignKey(StaffTeam, on_delete=models.CASCADE, related_name='members')