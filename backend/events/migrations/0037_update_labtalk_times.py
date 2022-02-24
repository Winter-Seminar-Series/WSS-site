from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Labtalk = apps.get_model('events', 'LabTalk')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Labtalk)

    date = datetime(2022, 2, 24) - timedelta(hours=3, minutes=30)
    Labtalk.objects.filter(wss=wss, title='Data Science and Machine Leaning Lab (DML)')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=90))

    date = datetime(2022, 2, 25) - timedelta(hours=3, minutes=30)
    Labtalk.objects.filter(wss=wss, title='Intelligent Software Enginering')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=90))

    date = datetime(2022, 2, 26) - timedelta(hours=3, minutes=30)
    Labtalk.objects.filter(wss=wss, title='Robust/Interpretable ML Lab')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=90))

    date = datetime(2022, 2, 27) - timedelta(hours=3, minutes=30)
    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=90))


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Labtalk = apps.get_model('events', 'LabTalk')
    wss = WSS.objects.get(year=2021)
    
    date = datetime(2022, 2, 24)
    Labtalk.objects.filter(wss=wss, title='Data Science and Machine Leaning Lab (DML)')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    date = datetime(2022, 2, 25)
    Labtalk.objects.filter(wss=wss, title='Intelligent Software Enginering')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    date = datetime(2022, 2, 26)
    Labtalk.objects.filter(wss=wss, title='Robust/Interpretable ML Lab')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    date = datetime(2022, 2, 27)
    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0039_update_speakers'),
        ('events', '0036_update_seminar_times'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
