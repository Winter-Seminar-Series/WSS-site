from django.db import models
from django.conf import settings

import requests

class SpotPlayerAPI:
    def __init__(self) -> None:
        self.endpoint = "https://panel.spotplayer.ir/license/edit/"
        self.headers = {
            "Content-Type": "application/json",
            "$API": settings.SPOTPLAYER_API_KEY,
            "$LEVEL": "-1",
        }
    
    def create_license(self, courses, participant):
        data = {
	        "course": list(set([course.course_id for course in courses])),
	        "name": participant.info.first_name + " " + participant.info.last_name + " " + participant.user.email,
	        "watermark": {
                "texts": [
                    {
                        "text": participant.info.phone_number if participant.info.phone_number else participant.user.email,
                    }
                ]
            },
            "device": {
		        "p0": 3, # All Devices 1-99
		        "p1": 1, # Windows 0-99
		        "p2": 1, # MacOS 0-99
		        "p4": 1, # Android 0-99
	        },
        }
        res = requests.post(self.endpoint, json=data, headers=self.headers)
        data = res.json()
        if res.status_code > 299 or res.status_code < 200:
            raise Exception(data['ex']['msg'])
        license = SpotPlayerLicense.objects.create(
            license_id=data['_id'],
            license_key=data['key'],
            license_url=data['url']
        )
        SpotPlayerCourseLicense.objects.bulk_create([
            SpotPlayerCourseLicense(
                course=course,
                license=license
            ) for course in courses
        ])
        return license

# Create your models here.
class SpotPlayerCourse(models.Model):
    course_id = models.CharField(max_length=100)
    course_name = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.course_name}'

class SpotPlayerLicense(models.Model):
    license_id = models.CharField(max_length=100)
    license_key = models.CharField(max_length=200)
    license_url = models.CharField(max_length=200)

    def __str__(self):
        return f'{self.license_key}'

class SpotPlayerCourseLicense(models.Model):
    course = models.ForeignKey(SpotPlayerCourse, on_delete=models.CASCADE)
    license = models.ForeignKey(SpotPlayerLicense, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.course} - {self.license}'