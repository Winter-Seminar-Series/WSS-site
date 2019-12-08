from django.db import models
from django.utils.safestring import mark_safe
from pip._vendor import requests
from sorl.thumbnail import ImageField

from events.models import Workshop, Seminar, PosterSession


class WSS(models.Model):
    year = models.PositiveSmallIntegerField()
    description = models.TextField()
    registration_link = models.URLField(null=True, blank=True)
    proposal_link = models.URLField(null=True, blank=True)
    participants_count_link = models.URLField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    main_clip = models.OneToOneField(to='Clip', null=True, blank=True, related_name='+')
    main_image = models.OneToOneField(to='Image', null=True, blank=True, related_name='+')

    class Meta:
        ordering = ('-year',)
        verbose_name = 'Winter Seminar Series'
        verbose_name_plural = 'Winter Seminar Series'

    def __str__(self):
        return 'WSS {}'.format(self.year)

    @property
    def main_image_url(self):
        if not self.main_image:
            return None
        return self.main_image.image.url

    @property
    def main_clip_url(self):
        if not self.main_clip:
            return None
        return self.main_clip.clip.url

    @property
    def workshops(self):
        return Workshop.objects.filter(wss=self)

    @property
    def seminars(self):
        return Seminar.objects.filter(wss=self)

    @property
    def postersessions(self):
        return PosterSession.objects.filter(wss=self)

    @property
    def staff_count(self):
        return len(set().union(
            *[holding_team.staff.values_list('pk') for holding_team in self.holding_teams.all()]
        ))

    @property
    def keynote_seminars(self):
        return self.seminars.filter(is_keynote=True)

    @property
    def non_keynote_seminars(self):
        return self.seminars.filter(is_keynote=False)

    @property
    def main_sponsorships(self):
        return self.sponsorships.filter(is_main=True)

    @property
    def not_main_sponsorships(self):
        return self.sponsorships.filter(is_main=False)

    @classmethod
    def active_wss(cls):
        return cls.objects.first()

    @property
    def is_active(self):
        return self.pk == WSS.active_wss().pk

    @property
    def participants_count(self):
        try:
            return requests.get(self.participants_count_link).content
        except:
            return 0


class Clip(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='clips', verbose_name='WSS')
    clip = models.FileField(upload_to='clips/')

    def __str__(self):
        return 'Clip of {}'.format(self.wss)


class Image(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='images', verbose_name='WSS')
    image = ImageField(upload_to='images/')

    def __str__(self):
        return 'Image of {}'.format(self.wss)


class Sponsor(models.Model):
    name = models.CharField(max_length=70)
    logo = models.ImageField(upload_to='logos/')
    url = models.URLField()

    def __str__(self):
        return self.name

    def logo_tag(self):
        if not self.logo:
            return None
        return mark_safe('<img src={} width=40 height=40>'.format(self.logo.url))

    logo_tag.short_description = 'logo'


class Sponsorship(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='sponsorships')
    sponsor = models.ForeignKey(to=Sponsor, related_name='sponsorships')
    is_main = models.BooleanField()

    def __str__(self):
        return self.sponsor.name

    @property
    def logo_url(self):
        if not self.sponsor.logo:
            return None
        return self.sponsor.logo.url


class ExternalLink(models.Model):
    type = models.CharField(max_length=40)
    url = models.URLField()

    def __str__(self):
        return '{}: {}'.format(self.type, self.url)


GRADE_CHOICES = [('ms', 'MS'), ('bs', "BS"), ('phd', 'PHD'), ('oth', 'other')]


class Grade(models.Model):
    level = models.CharField(max_length=3, choices=GRADE_CHOICES, primary_key=True)
    capacity = models.IntegerField()


INTRODUCTION = [('telegram', 'telegram'), ('instageram', 'instageram'), ('facebook', 'facebook'),
                ('twitter', 'twitter'), ('poster', 'poster'), ('friends', 'friends'), ('other', 'other')]
GENDER = [('woman', 'woman'), ('man', 'man')]
PAYMENT_CHOICES = [('OK', 'پرداخت شده'), ('NO', "پرداخت نشده")]


class Participant(models.Model):
    id = models.BigIntegerField(primary_key=True, default=0)
    name_family = models.CharField(max_length=250)
    phone_number = models.CharField(max_length=13)
    email = models.EmailField()
    job = models.CharField(max_length=250)
    university = models.CharField(max_length=250)
    introduction_method = models.CharField(max_length=250, choices=INTRODUCTION)
    gender = models.CharField(max_length=50, choices=GENDER)
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    field_of_interest = models.CharField(max_length=1500)
    payment_status = models.CharField(max_length=2, default='NO', choices=PAYMENT_CHOICES)
    grade = models.CharField(max_length=30, choices=GRADE_CHOICES)
    is_student = models.BooleanField(default=False)
    payment_id = models.IntegerField(default=0)
    workshops = models.ManyToManyField(to=Workshop, blank=True)
    sign_timestamp = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [['email', 'payment_id']]


class Reserve(models.Model):
    name = models.CharField(max_length=50)
    grade = models.CharField(max_length=70)
    student_number = models.CharField(max_length=70, blank=True)
    email = models.EmailField(primary_key=True)
    major = models.CharField(max_length=30)


class ShortLink(models.Model):
    short_link = models.CharField(max_length=300, primary_key=True)
    url = models.CharField(max_length=300)
