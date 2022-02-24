from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24)
    RoundTable.objects.filter(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(start_time=date + timedelta(hours=18))

    date = datetime(2022, 2, 25)
    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(start_time=date + timedelta(hours=18))

    date = datetime(2022, 2, 26)
    RoundTable.objects.filter(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')\
        .update(start_time=date + timedelta(hours=18))

    date = datetime(2022, 2, 27)
    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(start_time=date + timedelta(hours=18))


def rollback(apps, schema_editor):
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24)
    RoundTable.objects.filter(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(start_time=date + timedelta(hours=21, minutes=30))

    date = datetime(2022, 2, 25)
    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(start_time=date + timedelta(hours=21, minutes=30))

    date = datetime(2022, 2, 26)
    RoundTable.objects.filter(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')\
        .update(start_time=date + timedelta(hours=21, minutes=30))

    date = datetime(2022, 2, 27)
    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(start_time=date + timedelta(hours=21, minutes=30))


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0043_update_some_roundtable_speakers'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
