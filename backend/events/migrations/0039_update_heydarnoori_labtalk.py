from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Labtalk = apps.get_model('events', 'LabTalk')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)

    Labtalk.objects.filter(wss=wss, title='Intelligent Software Enginering')\
        .update(title='Intelligent Software Engineering')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Labtalk = apps.get_model('events', 'LabTalk')
    wss = WSS.objects.get(year=2021)

    Labtalk.objects.filter(wss=wss, title='Intelligent Software Engineering')\
        .update(title='Intelligent Software Enginering')
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0040_update_labtalk_7th_speaker_data'),
        ('events', '0039_update_ejlali_labtalk'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
