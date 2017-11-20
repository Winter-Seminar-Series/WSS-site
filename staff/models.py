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


class HoldingTeam(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    wss = models.ForeignKey(to='WSS.WSS', related_name='holding_teams')
    staff = models.ManyToManyField(to='HistoricalStaff', related_name='holding_teams')


class Staff(Human):
    history = HistoricalRecords()
