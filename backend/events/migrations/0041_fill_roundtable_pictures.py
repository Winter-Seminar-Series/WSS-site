from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2021)

    RoundTable.objects.filter(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(poster_picture='media/7th/roundtables/1.jpg')

    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(poster_picture='media/7th/roundtables/2.jpg')

    RoundTable.objects.filter(wss=wss, subject='Which one is for me? Masters or Ph.D.')\
        .update(poster_picture='media/7th/roundtables/3.jpg')

    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(poster_picture='media/7th/roundtables/4.jpg')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    RoundTable = apps.get_model('events', 'RoundTable')
    wss = WSS.objects.get(year=2021)

    RoundTable.objects.filter(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(poster_picture='')

    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(poster_picture='')

    RoundTable.objects.filter(wss=wss, subject='Which one is for me? Masters or Ph.D.')\
        .update(poster_picture='')

    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(poster_picture='')


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0040_add_7th_opening_ceremony'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
