from django.db import models
from polymorphic.models import PolymorphicModel
from simple_history.models import HistoricalRecords


class Human(PolymorphicModel):
    name = models.CharField(max_length=40)
    picture = models.ImageField(upload_to='human_pictures/')
    history = HistoricalRecords()

    def __str__(self):
        return self.name

    class Meta:
        abstract = True


class Speaker(Human):
    degree = models.CharField(max_length=20)
    place = models.CharField(max_length=50)
    bio = models.TextField()
    history = HistoricalRecords()


class HoldingTeam(models.Model):
    wss = models.ForeignKey(to='WSS.WSS', related_name='holding_teams', verbose_name='WSS')
    name = models.CharField(max_length=50)
    description = models.TextField()
    staff = models.ManyToManyField(to='HistoricalStaff', related_name='holding_teams', blank=True)

    def __str__(self):
        return self.name


class Staff(Human):
    history = HistoricalRecords()

    class Meta:
        verbose_name_plural = 'Staff'


class Role(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class TechnicalExpert(Human):
    role = models.ForeignKey(to=Role, related_name='technical_experts')
