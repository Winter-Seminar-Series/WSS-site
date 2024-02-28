from django.db import models
from django.conf import settings

from participant.models import ParticipationPlan, Participant

import requests

class SkyroomAPI:
    def __init__(self):
        self.API_URL = settings.SKYROOM_API_ENDPOINT
        self.HEADERS = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'charset': 'utf-8'
        }

    def __get_link(self, room_id, user_id, nickname, access, concurrent=1, language="fa", ttl=10800):
        data = {
            "action": "createLoginUrl",
            "params": {
                "room_id": room_id,
                "user_id": user_id,
                "nickname": nickname,
                "access": access,
                "concurrent": concurrent,
                "language": language,
                "ttl": ttl,
            }
        }
        response = requests.post(self.API_URL, json=data, headers=self.HEADERS)
        response_data = response.json()
        if response_data['ok']:
            return response_data['result']
        return ''

    def get_user_link(self, room_id, participant_id, ttl=10800):
        participant = Participant.objects.get(pk=participant_id)
        return self.__get_link(
            room_id, participant_id, 
            f'{participant.info.first_name} {participant.info.last_name}', 
            1, 1, "fa", ttl)
    
    def get_admin_link(self, room_id):
        return self.__get_link(room_id, 0, "WSS", 3, 10, "fa", 10800)


# Create your models here.
class SkyroomRoom(models.Model):
    room_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class SkyroomEvent(models.Model):
    room = models.ForeignKey(SkyroomRoom, on_delete=models.CASCADE)
    plans = models.ManyToManyField(ParticipationPlan)
    title = models.CharField(max_length=200)
    description = models.TextField(max_length=5000, blank=True)
    starting_time = models.DateTimeField()
    duration = models.DurationField()
    tolerance = models.DurationField(default=600)

    def __str__(self):
        return f'{self.title} - {self.starting_time}'