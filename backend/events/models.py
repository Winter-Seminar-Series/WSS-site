from datetime import timedelta

from django.db import models
from django.urls import reverse
from polymorphic.models import PolymorphicModel
from taggit.managers import TaggableManager
import datetime
from people.models import Speaker


class WssTag(models.Model):
    wss = models.ForeignKey(
        to='WSS.WSS', related_name='tag', on_delete=models.CASCADE)
    name = models.CharField(
        max_length=100, verbose_name="Tag", primary_key=True)


class Room(models.Model):
    tag = models.TextField()
    url = models.URLField(blank=True, null=True, max_length=255)

    def __str__(self):
        return "Room %d" % self.id

    def __repr__(self):
        return self.__str__()


class BaseEvent(PolymorphicModel):  # Is implicitly Abstract
    wss = models.ForeignKey(
        to='WSS.WSS', related_name='events', on_delete=models.CASCADE)
    title = models.CharField(max_length=150)
    start_time = models.DateTimeField(null=True, blank=True)
    duration = models.DurationField(default=timedelta())
    venue = models.ForeignKey(to='Venue', related_name='events',
                              null=True, blank=True, on_delete=models.SET_NULL)
    key_words = TaggableManager(blank=True)
    audience = models.CharField(blank=True, max_length=200)
    link = models.URLField(blank=True, null=True, max_length=256)
    tags = models.ManyToManyField(WssTag, blank=True)
    calender_link = models.URLField(blank=True, null=True, max_length=512)
    poster_picture = models.CharField(max_length=200, null=True, blank=True)
    stream_room = models.ForeignKey(Room, models.CASCADE, related_name='events', blank=True, null=True)

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

    @property
    def is_available(self):
        return self.start_time <= datetime.datetime.now(tz=datetime.timezone.utc) <= self.end_time

    @property
    def type(self):
        return self.__class__.__name__.lower()


class Event(BaseEvent):
    class Meta:
        verbose_name_plural = 'Other Events'


class Venue(models.Model):
    name = models.CharField(max_length=100)
    address = models.TextField()

    def __str__(self):
        return self.name


class RoundTable(BaseEvent):
    subject = models.CharField(blank=True, max_length=256)
    speakers = models.ManyToManyField(Speaker)


class LabTalk(BaseEvent):
    head = models.ForeignKey(
        to='people.Speaker', related_name='labtalks', on_delete=models.RESTRICT)
    field = models.CharField(blank=True, max_length=256)
    website_link = models.URLField(blank=True, null=True, max_length=256)


class Seminar(BaseEvent):
    abstract = models.TextField()
    is_keynote = models.BooleanField(default=False)
    is_pinned = models.BooleanField(default=False)
    speaker = models.ForeignKey(
        to='people.Speaker', related_name='seminars', on_delete=models.RESTRICT)
    material = models.OneToOneField(
        to='SeminarMaterial', null=True, blank=True, on_delete=models.SET_NULL)
    room = models.CharField(blank=True, max_length=256, null=True)


class PosterSession(BaseEvent):
    abstract = models.TextField()
    speaker = models.ForeignKey(
        to='people.Speaker', related_name='postersessions', on_delete=models.RESTRICT)
    material = models.OneToOneField(
        to='PosterMaterial', null=True, blank=True, on_delete=models.SET_NULL)
    is_persian = models.BooleanField(null=False, default=False)


class Workshop(BaseEvent):
    syllabus = models.TextField()
    sponsor = models.ForeignKey(to='WSS.Sponsor', related_name='workshops',
                                null=True, blank=True, on_delete=models.SET_NULL)
    speaker = models.ForeignKey(
        to='people.Speaker', related_name='workshops', on_delete=models.RESTRICT)
    material = models.OneToOneField(
        to='WorkshopMaterial', null=True, blank=True, on_delete=models.SET_NULL)
    registration_link = models.URLField(null=True, blank=True)
    price = models.IntegerField(default=30000)
    capacity = models.IntegerField(default=0)

    @property
    def remaining_capacity(self):
        return self.capacity - self.participants.all().count()

    def __str__(self):
        return self.title + ", " + "Speaker: " + self.speaker.name + ", " + (
            self.start_time.strftime("%A %d %B %Y, %H:%M, ") if self.start_time != None else "") + "Price: " + str(
            self.price) + " Tomans"


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
    poster = models.ImageField(
        upload_to='poster_pictures/', null=True, blank=True)

    def __str__(self):
        if hasattr(self, 'postersession'):
            return 'Material of {}'.format(self.postersession)
        return 'Added Material'
