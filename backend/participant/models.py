from core.models import Event
from django.contrib.auth.models import User
from django.db import models


class ParticipantInfo(models.Model):
    first_name_persian = models.CharField(max_length=50, blank=True)
    last_name_persian = models.CharField(max_length=50, blank=True)
    national_code = models.CharField(max_length=10, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    image = models.ImageField(upload_to='participant/', blank=True)
    bio = models.TextField(blank=True)
    designation = models.CharField(max_length=50, blank=True)

class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, blank=True, null=True)
    password_reset_code = models.CharField(max_length=5, blank=True)

class ParticipationType(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField(default=0)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

class Participation(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.CASCADE)
    participation_type = models.ForeignKey(ParticipationType, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

class ParticipationAttachment(models.Model):
    participation = models.ForeignKey(Participation, on_delete=models.CASCADE)
    attachment = models.FileField(upload_to='participation/', blank=True)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)