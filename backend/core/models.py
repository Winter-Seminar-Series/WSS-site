from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

class EmailModelBackend(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return None
        else:
            if user.check_password(password):
                return user
        return None

class Event(models.Model):
    class Meta:
        unique_together = ['name', 'order']

    name = models.TextField(max_length=50)
    order = models.IntegerField(default=1)
    description = models.TextField(max_length=1000, blank=True)
    starting_date = models.DateField()
    ending_date = models.DateField()

    def __str__(self) -> str:
        end = str(self.order)[-1]
        if end == '1':
            end = 'st'
        elif end == '2':
            end = 'nd'
        elif end == '3':
            end = 'rd'
        else:
            end = 'th'
        return f'{self.order}{end} {self.name}'

class SubEvent(models.Model):
    kind = (
        ('S', 'Seminar'),
        ('W', 'Workshop'),
        ('R', 'Round Table'),
        ('L', 'Lab Talk'),
        ('P', 'Poster Session')
    )

    venue_choices = (
        ('V', 'Virtual'),
        ('P', 'Physical'),
    )

    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    kind = models.CharField(max_length=1, choices=kind, default='S')
    name = models.TextField(max_length=200)
    description = models.TextField(max_length=1000, blank=True)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    date = models.DateField()
    venue = models.CharField(max_length=1, choices=venue_choices, default='V')
    link = models.URLField(max_length=200, blank=True)
    poster = models.ImageField(upload_to='posters/', null=True, blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)

class Speaker(models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=50, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    image = models.ImageField(upload_to='speakers/', null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name}'

class Seminar(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

class Workshop(models.Model):
    name = models.TextField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    poster = models.ImageField(upload_to='posters/', null=True, blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', null=True, blank=True)

    def __str__(self) -> str:
        return f'{self.name}'

class WorkshopSession(models.Model):
    workshop = models.ForeignKey(Workshop, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)
    name = models.TextField(max_length=100)
    description = models.TextField(max_length=1000, blank=True)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    date = models.DateField()

    def __str__(self):
        return f'{self.workshop} - {self.date}'

class RoundTable(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speakers = models.ManyToManyField(Speaker)

class LabTalk(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

class PosterSession(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)