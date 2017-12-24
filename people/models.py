from django.db import models
from polymorphic.models import PolymorphicModel


class Human(PolymorphicModel):
    name = models.CharField(max_length=40)
    picture = models.ImageField(upload_to='human_pictures/', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        abstract = True

    @property
    def picture_url(self):
        return self.picture.url if self.picture else None


class Speaker(Human):
    degree = models.CharField(max_length=30)
    place = models.CharField(max_length=50)
    bio = models.TextField()

    @property
    def short_bio(self):
        return '{}, {}'.format(self.degree, self.place)


class HoldingTeam(models.Model):
    wss = models.ForeignKey(to='WSS.WSS', related_name='holding_teams', verbose_name='WSS')
    name = models.CharField(max_length=50)
    staff = models.ManyToManyField(to='Staff', related_name='holding_teams', blank=True)

    class Meta:
        ordering = ('pk',)

    def __str__(self):
        return self.name


class Staff(Human):
    class Meta:
        verbose_name_plural = 'Staff'


class Role(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class TechnicalExpert(Human):
    role = models.ForeignKey(to=Role, related_name='technical_experts')
