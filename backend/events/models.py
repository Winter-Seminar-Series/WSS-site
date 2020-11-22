from datetime import timedelta

from django.db import models
from django.urls import reverse
from polymorphic.models import PolymorphicModel
from taggit.managers import TaggableManager


class BaseEvent(PolymorphicModel):  # Is implicitly Abstract
    wss = models.ForeignKey(to='WSS.WSS', related_name='events', on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    start_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(default=timedelta())
    venue = models.ForeignKey(to='Venue', related_name='events', null=True, blank=True, on_delete=models.SET_NULL)
    key_words = TaggableManager(blank=True)
    audience = models.CharField(blank=True, max_length=200)
    link = models.URLField(max_length=256)

    class Meta:
        ordering = ('start_time',)

    def __str__(self):
        return self.title

    @property
    def end_time(self):
        return self.start_time + self.duration

    @property
    def keywords(self):
        return self.key_words.names()


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
    speaker = models.ForeignKey(to='people.Speaker', related_name='seminars', on_delete=models.RESTRICT)
    material = models.OneToOneField(to='SeminarMaterial', null=True, blank=True, on_delete=models.SET_NULL)

    @property
    def get_absolute_url(self):
        return reverse('events:seminar', args=[self.pk])


class PosterSession(BaseEvent):
    abstract = models.TextField()
    speaker = models.ForeignKey(to='people.Speaker', related_name='postersessions', on_delete=models.RESTRICT)
    material = models.OneToOneField(to='PosterMaterial', null=True, blank=True, on_delete=models.SET_NULL)
    is_persian = models.BooleanField(null=False, default=False)

    @property
    def get_absolute_url(self):
        return reverse('events:postersession', args=[self.pk])


class Workshop(BaseEvent):
    syllabus = models.TextField()
    sponsor = models.ForeignKey(to='WSS.Sponsor', related_name='workshops', null=True, blank=True, on_delete=models.SET_NULL)
    speaker = models.ForeignKey(to='people.Speaker', related_name='workshops', on_delete=models.RESTRICT)
    material = models.OneToOneField(to='WorkshopMaterial', null=True, blank=True, on_delete=models.SET_NULL)
    registration_link = models.URLField(null=True, blank=True)
    price = models.IntegerField(default=30000)
    capacity = models.IntegerField(default=0)

    @property
    def get_absolute_url(self):
        return reverse('events:workshop', args=[self.pk])

    def __str__(self):
        return self.title + ", " + "Speaker: " + self.speaker.name + ", " + (self.start_time.strftime("%A %d %B %Y, %H:%M, ") if self.start_time != None else "") + "Price: " + str(self.price) + " Tomans"


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


class PosterMaterial(Material):
    poster = models.ImageField(upload_to='poster_pictures/', null=True, blank=True)
    def __str__(self):
        if hasattr(self, 'postersession'):
            return 'Material of {}'.format(self.postersession)
        return 'Added Material'
