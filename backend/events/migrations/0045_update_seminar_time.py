from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    date = datetime(2022, 2, 25) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(start_time=date + timedelta(hours=17, minutes=30), duration=timedelta(minutes=60))


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0044_update_roundtable_speaker_place'),
        ('events', '0044_update_roundtable_time_again'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
