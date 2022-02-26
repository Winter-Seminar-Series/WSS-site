from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 27) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(start_time=date + timedelta(hours=17, minutes=30), room="room2")


def rollback(apps):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 26) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(start_time=date + timedelta(hours=17, minutes=30), room="room1")


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0047_update_mohajerin_seminar_time'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
