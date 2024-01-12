from core.models import Event
from django.contrib.auth.models import User
from django.db import models


class ParticipantInfo(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other')
    )
    GRADE_CHOICES = (
        ('B', 'Bachelor'),
        ('M', 'Master'),
        ('P', 'PhD'),
    )

    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    national_code = models.CharField(max_length=10, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=100, blank=True)
    birth_date = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, default='M', choices=GENDER_CHOICES)
    university = models.CharField(max_length=100, blank=True)
    major = models.CharField(max_length=100, blank=True)
    job = models.CharField(max_length=100, blank=True)
    is_open_to_work = models.BooleanField(default=False)
    fields_of_interest = models.TextField(blank=True)
    grade = models.CharField(max_length=1, default='B', choices=GRADE_CHOICES)
    introduction_method = models.TextField(blank=True)
    linkedin = models.CharField(max_length=100, blank=True)
    github = models.CharField(max_length=100, blank=True)

class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, blank=True, null=True)
    password_reset_code = models.CharField(max_length=5, blank=True)

    def __str__(self):
        return f'{self.user.first_name} {self.user.last_name}'

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