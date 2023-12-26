from django.db import models

class Event(models.Model):
    class Meta:
        unique_together = ['name', 'order']

    name = models.TextField(max_length=50, blank=False)
    order = models.IntegerField(default=1)
    description = models.TextField(max_length=1000, blank=True)
    starting_date = models.DateField()
    ending_date = models.DateField()

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
    name = models.TextField(max_length=200, blank=False)
    description = models.TextField(max_length=1000, blank=True)
    starting_time = models.TimeField()
    ending_time = models.TimeField()
    date = models.DateField()
    venue = models.CharField(max_length=1, choices=venue_choices, default='V')
    link = models.URLField(max_length=200, blank=True)
    poster = models.ImageField(upload_to='posters/', blank=True)
    thumbnail = models.ImageField(upload_to='thumbnails/', blank=True)

class Speaker(models.Model):
    name = models.TextField(max_length=50, blank=False)
    designation = models.TextField(max_length=50, blank=True)
    description = models.TextField(max_length=1000, blank=True)
    image = models.ImageField(upload_to='speakers/', blank=True)

class Seminar(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

class Workshop(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

class RoundTable(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speakers = models.ManyToManyField(Speaker)

class LabTalk(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)

class PosterSession(models.Model):
    sub_event = models.OneToOneField(SubEvent, on_delete=models.CASCADE)
    speaker = models.ForeignKey(Speaker, on_delete=models.CASCADE)