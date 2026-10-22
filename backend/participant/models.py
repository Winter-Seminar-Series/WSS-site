from django.contrib.auth.models import User
from django.db import models

from core.models import Event, UniqueUploadPath, Workshop
from spotplayer.models import SpotPlayerCourse, SpotPlayerLicense


class ParticipantInfo(models.Model):
    """A participant's profile. Each registration snapshots it (Participation.info), so the profile can change later
    without rewriting what was true when they paid."""

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
    birth_date = models.DateField(null=True, blank=True)
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

    def __str__(self):
        return f'{self.first_name} {self.last_name} - {self.national_code}'


class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        if self.info:
            return f'{self.info.first_name} {self.info.last_name} - {self.user.email}'
        else:
            return f'NO INFO - user: {self.user}'


class ModeOfAttendance(models.Model):
    name = models.CharField(max_length=50)
    is_national_code_required = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.name}'


class ParticipationPlan(models.Model):
    """Something a participant can buy for an edition: a mode of attendance (`M`) or a workshop (`W`). Prices are
    in Rial."""

    KIND_WORKSHOP = 'W'
    KIND_MODE = 'M'
    KIND_CHOICES = (
        (KIND_WORKSHOP, 'Workshop'),
        (KIND_MODE, 'Mode of Attendance')
    )

    price = models.IntegerField(default=0)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    kind = models.CharField(max_length=1, choices=KIND_CHOICES)
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE, null=True, blank=True)
    mode_of_attendance = models.ForeignKey(ModeOfAttendance, on_delete=models.CASCADE, null=True, blank=True)
    spotplayer_course = models.ForeignKey(SpotPlayerCourse, on_delete=models.SET_NULL, null=True, blank=True)
    is_open = models.BooleanField(
        default=True,
        help_text='Whether it can be bought right now. Close a plan instead of deleting it.',
    )
    capacity = models.PositiveIntegerField(
        null=True,
        blank=True,
        help_text='Maximum number of registrations; empty for no limit. Checked at checkout.',
    )

    def __str__(self):
        return f'{self.event} - {self.workshop if self.kind == self.KIND_WORKSHOP else self.mode_of_attendance}'


class Participation(models.Model):
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    info = models.ForeignKey(ParticipantInfo, on_delete=models.SET_NULL, null=True, blank=True)
    plan = models.ForeignKey(ParticipationPlan, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    spotplayer_license = models.ForeignKey(SpotPlayerLicense, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.participant} - {self.plan}'


class ParticipationAttachment(models.Model):
    participation = models.ForeignKey(Participation, on_delete=models.CASCADE)
    attachment = models.FileField(upload_to=UniqueUploadPath('participation'), null=True, blank=True)
    description = models.TextField(blank=True)
    date = models.DateTimeField(auto_now_add=True)
