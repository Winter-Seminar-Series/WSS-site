from django.db import models
from django.db.models.deletion import CASCADE
from django.utils.safestring import mark_safe
from django.contrib.auth.models import User
from pip._vendor import requests
from sorl.thumbnail import ImageField
from django.core.validators import MinValueValidator
from events.models import Workshop, Seminar, PosterSession, WssTag

GRADE_GROUPS = {
    'Bachelor': ['Bachelor'],
    'Master': ['Master', 'PhD or Higher'],
    'PhD or Higher': ['Master', 'PhD or Higher']
}

GRADE_GROUP_LIMITS = {
    'Bachelor': 'bs_participant_limit',
    'Master': 'msOrPhd_participant_limit',
    'PhD or Higher': 'msOrPhd_participant_limit'
}

class GradeDoesNotSpecifiedException(Exception):
    pass

class WSS(models.Model):
    year = models.PositiveSmallIntegerField()
    description = models.TextField(null=True, blank=True)
    registration_open = models.BooleanField(null=False, default=False)
    workshop_registration_open = models.BooleanField(null=False, default=False)
    # registration_link = models.URLField(null=True, blank=True)
    calendar_link = models.URLField(null=True, blank=True)
    ical_link = models.URLField(null=True, blank=True)
    proposal_link = models.URLField(null=True, blank=True)
    participants_count_link = models.URLField(null=True, blank=True)
    # Show Participants in homepage
    show_stats = models.BooleanField(null=False, default=True)
    start_date = models.DateField()
    end_date = models.DateField()
    main_clip = models.OneToOneField(to='Clip', null=True, blank=True, related_name='+', on_delete=models.SET_NULL)
    booklet = models.OneToOneField(to='Booklet', null=True, blank=True, related_name='+', on_delete=models.SET_NULL)
    main_image = models.OneToOneField(to='Image', null=True, blank=True, related_name='+', on_delete=models.SET_NULL)
    registration_fee = models.PositiveIntegerField(default=10000, validators=[MinValueValidator(1000)])
    bs_participant_limit = models.PositiveIntegerField(default=100)
    msOrPhd_participant_limit = models.PositiveIntegerField(default=100)
    participant_workshop_limit = models.PositiveIntegerField(default=3)

    class Meta:
        ordering = ('-year',)
        verbose_name = 'Winter Seminar Series'
        verbose_name_plural = 'Winter Seminar Series'

    def __str__(self):
        return 'WSS {}'.format(self.year)
    
    def is_capacity_full(self, grade: str):
        if grade not in GRADE_GROUPS:
            raise GradeDoesNotSpecifiedException()
        
        return self.participants.filter(user_profile__grade__in=GRADE_GROUPS[grade]).count() >= getattr(self, GRADE_GROUP_LIMITS[grade])

    @property
    def bs_participant_count(self):
        return self.participants.filter(user_profile__grade='Bachelor').count()
    
    @property
    def ms_participant_count(self):
        return self.participants.filter(user_profile__grade='Master').count()
    
    @property
    def phd_participant_count(self):
        return self.participants.filter(user_profile__grade='PhD or Higher').count()
    
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
    def booklet_url(self):
        if not self.booklet:
            return None
        return self.booklet.booklet.url

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
    def is_registration_open(self):
        return self.registration_open

    @property
    def participants_count(self):
        return self.participants.count()


class Clip(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='clips', verbose_name='WSS', on_delete=models.CASCADE)
    clip = models.FileField(upload_to='clips/')

    def __str__(self):
        return 'Clip of {}'.format(self.wss)


class Booklet(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='booklets', verbose_name='WSS', on_delete=models.CASCADE)
    booklet = models.FileField(upload_to='booklets/')

    def __str__(self):
        return 'Booklet of {}'.format(self.wss)


class Image(models.Model):
    wss = models.ForeignKey(to='WSS', related_name='images', verbose_name='WSS', on_delete=models.CASCADE)
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
    wss = models.ForeignKey(to='WSS', related_name='sponsorships', on_delete=models.CASCADE)
    sponsor = models.ForeignKey(to=Sponsor, related_name='sponsorships', on_delete=models.RESTRICT)
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


GRADE_CHOICES = [(None, "Please Select"), ('Bachelor', 'Bachelor'), ('Master', "Master"), ('PhD or Higher', "PhD or Higher")]


class Grade(models.Model):
    level = models.CharField(max_length=30, choices=GRADE_CHOICES, primary_key=True)
    capacity = models.IntegerField()

    def __str__(self):
        return self.level


INTRODUCTION = [(None, 'Please Select'), ('Telegram', 'Telegram'), ('Instagram', 'Instagram'), ('Facebook', 'Facebook'),
                ('Twitter', 'Twitter'), ('Poster', 'Poster'), ('Linkedin', 'Linkedin'), ('YouTube', 'YouTube'), ('Friends', 'Friends'), ('Other', 'Other')]
GENDER = [('Female', 'Female'), ('Male', 'Male'), ('Other', 'Other')]


class Participant(models.Model):
    current_wss = models.ForeignKey('WSS', null=True, related_name='participants', verbose_name='WSS', on_delete=models.SET_NULL)
    user_profile = models.ForeignKey('UserProfile', null=True, related_name='participants', on_delete=models.SET_NULL)
    payment_ref_id = models.CharField(max_length=250, default="NOT_PAYED")
    payment_amount = models.PositiveIntegerField(default=0)
    payment_timestamp = models.DateTimeField(auto_now_add=True)
    registered_workshops = models.ManyToManyField(Workshop, related_name='participants', blank=True)

    class Meta:
        unique_together = [['current_wss', 'user_profile']]
    
    def __str__(self):
        return f"{self.current_wss} - {self.user_profile}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, null=True, default=None, on_delete=models.CASCADE, related_name='profile')
    id = models.BigAutoField(primary_key=True)
    phone_number = models.CharField(max_length=13, verbose_name="Phone Number")
    age = models.PositiveSmallIntegerField(null=True)
    job = models.CharField(max_length=250)
    university = models.CharField(max_length=250)
    introduction_method = models.CharField(max_length=250, choices=INTRODUCTION, default=None, verbose_name="How were you introduced to WSS?", null=True)
    gender = models.CharField(max_length=50, choices=GENDER, blank=False, default=None, null=True)
    city = models.CharField(max_length=150)
    country = models.CharField(max_length=150)
    field_of_interest = models.CharField(max_length=1500, blank=True)
    grade = models.CharField(max_length=30, choices=GRADE_CHOICES, null=True)
    favorite_tags = models.ManyToManyField(WssTag, null=True, blank=True, verbose_name="Favorite tags")
    is_student = models.BooleanField(default=False, verbose_name="I am a Student")

    @property
    def email(self):
        return self.user.email

    @property
    def username(self):
        return self.user.username

    @property
    def first_name(self):
        return self.user.first_name

    @first_name.setter
    def first_name(self, value):
        self.user.first_name = value

    @property
    def last_name(self):
        return self.user.last_name

    @last_name.setter
    def last_name(self, value):
        self.user.last_name = value

    def __str__(self):
        return self.first_name + " " + self.last_name


class Reserve(models.Model):
    name = models.CharField(max_length=50)
    grade = models.CharField(max_length=70)
    student_number = models.CharField(max_length=70, blank=True)
    email = models.EmailField(primary_key=True)
    phone_number = models.CharField(default=0, max_length=13, verbose_name="Phone Number")
    major = models.CharField(max_length=30)

    def __str__(self):
        return self.email


class ShortLink(models.Model):
    short_link = models.CharField(max_length=300, primary_key=True)
    url = models.CharField(max_length=300)
    number_of_clicks = models.IntegerField(default=0)

    def __str__(self):
        return "http://wss.ce.sharif.ir/go/" + self.short_link


class Announcement(models.Model):
    wss = models.ForeignKey('WSS', null=True, related_name='announcements', verbose_name='WSS', on_delete=models.CASCADE)
    create_timestamp = models.DateTimeField(auto_now_add=True)
    last_modify_timestamp = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def __str__(self):
        return f"{self.wss}{self.create_timestamp}: {self.title}"