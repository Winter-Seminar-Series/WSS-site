from django.db import models
from core.models import Event


class Staff(models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=150, blank=True)
    description = models.TextField(max_length=5000, blank=True)
    image = models.ImageField(upload_to='staff/', blank=True)

    def __str__(self) -> str:
        return f'{self.name} - {self.designation}'


class StaffTeam(models.Model):
    name = models.TextField(max_length=50, blank=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.event} - {self.name}'


class StaffTeamMember(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='events')
    staff_team = models.ForeignKey(StaffTeam, on_delete=models.CASCADE, related_name='members')

    def __str__(self) -> str:
        return f'{self.staff_team} - {self.staff}'
