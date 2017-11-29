from django.db import models
from django.urls import reverse
from polymorphic.models import PolymorphicModel


class BaseEvent(PolymorphicModel):  # Is implicitly Abstract
    wss = models.ForeignKey(to='WSS.WSS', related_name='events')
    title = models.CharField(max_length=150)
    start_time = models.DateTimeField()
    duration = models.DurationField()
    venue = models.ForeignKey(to='Venue', related_name='events', null=True, blank=True)

    def __str__(self):
        return self.title


class Event(BaseEvent):
    class Meta:
        verbose_name_plural = 'Other Events'


class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()

    def __str__(self):
        return self.name


class Seminar(BaseEvent):
    abstract = models.TextField()
    is_keynote = models.BooleanField()
    speaker = models.ForeignKey(to='people.Speaker', related_name='seminars')
    material = models.OneToOneField(to='SeminarMaterial', null=True, blank=True)

    @property
    def get_absolute_url(self):
        return reverse('events:seminar',args=[self.pk])


class Workshop(BaseEvent):
    syllabus = models.TextField()
    sponsor = models.ForeignKey(to='WSS.Sponsor', related_name='workshops', null=True, blank=True)
    speaker = models.ForeignKey(to='people.Speaker', related_name='workshops')
    material = models.OneToOneField(to='WorkshopMaterial', null=True, blank=True)

    @property
    def get_absolute_url(self):
        return '/';reverse('events:workshop',args=[self.pk])


class Material(PolymorphicModel):
    slides = models.FileField(null=True, blank=True)
    video_url = models.URLField(null=True, blank=True)


class SeminarMaterial(Material):
    def __str__(self):
        if hasattr(self, 'seminar'):
            return 'Material of {}'.format(self.seminar)
        return 'Added Material'


class WorkshopMaterial(Material):
    def __str__(self):
        if hasattr(self, 'workshop'):
            return 'Material of {}'.format(self.workshop)
        return 'Added Material'
