from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Labtalk = apps.get_model('events', 'LabTalk')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)

    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(field='Low Power Design, Fault Tolerance, Real-Time Embedded Systems, Internet of Things (IoT)')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Labtalk = apps.get_model('events', 'LabTalk')
    wss = WSS.objects.get(year=2021)

    Labtalk.objects.filter(wss=wss, title='Embedded System Research lab')\
        .update(poster_picture='')
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0040_update_labtalk_7th_speaker_data'),
        ('events', '0038_update_labtalk_pictures'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
