from django.db import models

from participant.models import Participation


class Certificate(models.Model):
    participation = models.ForeignKey(Participation, on_delete=models.CASCADE)
    certificate = models.FileField(upload_to='certificates/')
