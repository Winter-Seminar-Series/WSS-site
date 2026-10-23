import uuid

from django.contrib.auth.models import User
from django.db import models
from django.utils.deconstruct import deconstructible

from common.models import BlurHashMixin, blurhash_field


@deconstructible
class UniqueUploadPath:
    """`upload_to` that stores every file under a random name, so URLs cannot be guessed or collide.

    Migrations reference it as `core.models.UniqueUploadPath`: keep it here.
    """

    def __init__(self, sub_path):
        self.sub_path = sub_path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        return f"{self.sub_path}/{uuid.uuid4()}.{ext}"


def ordinal(number: int) -> str:
    if 10 <= number % 100 <= 20:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(number % 10, 'th')
    return f'{number}{suffix}'


class Event(models.Model):
    """One edition of the series. Its id (not its order) is what the API's `<event_id>` and the frontend's edition
    registry (frontend/lib/editions.ts, `eventId`) refer to."""

    class Meta:
        unique_together = ['name', 'order']

    name = models.TextField(max_length=50)
    order = models.IntegerField(default=1)
    description = models.TextField(max_length=5000, blank=True)
    starting_date = models.DateField()
    ending_date = models.DateField()

    def __str__(self) -> str:
        return f'{ordinal(self.order)} {self.name}'


class SubEvent(BlurHashMixin, models.Model):
    KIND_CHOICES = (
        ('S', 'Seminar'),
        ('W', 'Workshop'),
        ('R', 'Round Table'),
        ('L', 'Lab Talk'),
        ('P', 'Poster Session')
    )

    VENUE_CHOICES = (
        ('V', 'Virtual'),
        ('P', 'Physical'),
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    kind = models.CharField(max_length=1, choices=KIND_CHOICES, default='S')
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=5000, blank=True)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    date = models.DateField()
    venue = models.CharField(max_length=1, choices=VENUE_CHOICES, default='V')
    link = models.URLField(max_length=200, blank=True)
    poster = models.ImageField(upload_to=UniqueUploadPath('posters'), null=True, blank=True)
    thumbnail = models.ImageField(upload_to=UniqueUploadPath('thumbnails'), null=True, blank=True)

    BLURHASH_FIELDS = {'poster': 'poster_blurhash', 'thumbnail': 'thumbnail_blurhash'}
    poster_blurhash = blurhash_field()
    thumbnail_blurhash = blurhash_field()

    def __str__(self) -> str:
        return f'{self.name}'


class Speaker(BlurHashMixin, models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=150, blank=True)
    description = models.TextField(max_length=5000, blank=True)
    image = models.ImageField(upload_to=UniqueUploadPath('speakers'), null=True, blank=True)

    BLURHASH_FIELDS = {'image': 'image_blurhash'}
    image_blurhash = blurhash_field()

    def __str__(self) -> str:
        return f'{self.name} - {self.designation}'


class Seminar(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.RESTRICT)

    def __str__(self) -> str:
        return f'{self.sub_event}'


class Workshop(BlurHashMixin, models.Model):
    name = models.TextField(max_length=100)
    description = models.TextField(max_length=5000, blank=True)
    poster = models.ImageField(upload_to='posters/', null=True, blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)

    BLURHASH_FIELDS = {'poster': 'poster_blurhash', 'thumbnail': 'thumbnail_blurhash'}
    poster_blurhash = blurhash_field()
    thumbnail_blurhash = blurhash_field()

    def __str__(self):
        return f'{self.name}'


class WorkshopSession(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.RESTRICT)
    name = models.TextField(max_length=100)
    description = models.TextField(max_length=5000, blank=True)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    date = models.DateField()

    def __str__(self):
        return f'{self.workshop} - {self.name} - {self.speaker}'


class RoundTable(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speakers = models.ManyToManyField(Speaker)

    def __str__(self) -> str:
        return f'{self.sub_event}'


class LabTalk(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.RESTRICT)

    def __str__(self) -> str:
        return f'{self.sub_event}'


class PosterSession(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.RESTRICT)

    def __str__(self) -> str:
        return f'{self.sub_event}'


class PosterSessionImage(models.Model):
    """A participant's poster-session submission (one per account)."""

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.FileField(upload_to=UniqueUploadPath('poster-images'))

    def __str__(self):
        return f"Poster Image of {self.user.username}"
