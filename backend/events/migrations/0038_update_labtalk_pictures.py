from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Labtalk = apps.get_model('events', 'LabTalk')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)

    Labtalk.objects.filter(wss=wss, title='Data Science and Machine Leaning Lab (DML)')\
        .update(poster_picture='media/7th/labtalks/Rabiee-Lab.jpeg')

    Labtalk.objects.filter(wss=wss, title='Intelligent Software Enginering')\
        .update(poster_picture='media/7th/labtalks/Heydarnoori-Lab.jpeg')

    Labtalk.objects.filter(wss=wss, title='Robust/Interpretable ML Lab')\
        .update(poster_picture='media/7th/labtalks/Rohban-Lab.jpeg')

    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(poster_picture='media/7th/labtalks/Ejlali-Lab.jpeg')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Labtalk = apps.get_model('events', 'LabTalk')
    wss = WSS.objects.get(year=2021)
    
    Labtalk.objects.filter(wss=wss, title='Data Science and Machine Leaning Lab (DML)')\
        .update(poster_picture='')

    Labtalk.objects.filter(wss=wss, title='Intelligent Software Enginering')\
        .update(poster_picture='')

    Labtalk.objects.filter(wss=wss, title='Robust/Interpretable ML Lab')\
        .update(poster_picture='')

    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(poster_picture='')
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0039_update_speakers'),
        ('events', '0037_update_labtalk_times'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
