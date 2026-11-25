from django.db import models
from common.fields import WebPImageField
from common.models import BlurHashMixin, blurhash_field
from core.models import Event, UniqueUploadPath


class Staff(BlurHashMixin, models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=150, blank=True)
    description = models.TextField(max_length=5000, blank=True)
    image = WebPImageField(upload_to=UniqueUploadPath('staff'), blank=True)
    website = models.URLField(max_length=200, blank=True)
    linkedin = models.URLField(max_length=200, blank=True)
    github = models.URLField(max_length=200, blank=True)
    email = models.EmailField(max_length=254, blank=True)

    BLURHASH_FIELDS = {'image': 'image_blurhash'}
    image_blurhash = blurhash_field()

    def __str__(self) -> str:
        return f'{self.name} - {self.designation}'


class StaffTeam(models.Model):
    name = models.TextField(max_length=50, blank=False)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    display_order = models.PositiveIntegerField(default=0, help_text='Lower numbers appear first within an edition.')

    class Meta:
        ordering = ('display_order', 'id')

    def __str__(self) -> str:
        return f'{self.event} - {self.name}'


class StaffTeamMember(models.Model):
    staff = models.ForeignKey(Staff, on_delete=models.CASCADE, related_name='events')
    staff_team = models.ForeignKey(StaffTeam, on_delete=models.CASCADE, related_name='members')
    display_order = models.PositiveIntegerField(default=0, help_text='Lower numbers appear first within the team.')

    class Meta:
        ordering = ('display_order', 'id')

    def __str__(self) -> str:
        return f'{self.staff_team} - {self.staff}'
