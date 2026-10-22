from django.db import models
from django.db.models import F
from django.utils import timezone

from participant.models import ParticipationPlan


class SkyroomRoom(models.Model):
    room_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class SkyroomEventQuerySet(models.QuerySet):
    def for_user(self, user) -> 'SkyroomEventQuerySet':
        """Sessions the account has a paid plan for."""
        return self.filter(plans__participation__participant__user=user).distinct()

    def open_now(self) -> 'SkyroomEventQuerySet':
        """Sessions whose room can be entered now: from `tolerance` before the start to `tolerance` after the end."""
        now = timezone.now()
        return self.filter(
            starting_time__lte=now + F('tolerance'),
            starting_time__gte=now - F('duration') - F('tolerance'),
        )


class SkyroomEvent(models.Model):
    room = models.ForeignKey(SkyroomRoom, on_delete=models.CASCADE)
    plans = models.ManyToManyField(ParticipationPlan)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=5000, blank=True)
    starting_time = models.DateTimeField()
    duration = models.DurationField()
    tolerance = models.DurationField(default=600)

    objects = SkyroomEventQuerySet.as_manager()

    def __str__(self):
        return f'{self.title} - {self.starting_time}'
