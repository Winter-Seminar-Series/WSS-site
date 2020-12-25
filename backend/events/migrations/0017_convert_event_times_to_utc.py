from django.db import migrations
from django.db.models import F
from datetime import timedelta, datetime, timezone


def forwards(apps, schema_editor):
    Workshop = apps.get_model('events', 'Workshop')
    Seminar = apps.get_model('events', 'Seminar')

    start_time: datetime = F('start_time') - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss__year=2020)\
        .update(start_time=start_time)

    Workshop.objects.filter(wss__year=2020)\
        .update(start_time=start_time)


def rollback(apps, schema_editor):
    Workshop = apps.get_model('events', 'Workshop')
    Seminar = apps.get_model('events', 'Seminar')

    start_time: datetime = F('start_time') + timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss__year=2020)\
        .update(start_time=start_time)

    Workshop.objects.filter(wss__year=2020)\
        .update(start_time=start_time)


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0016_fill_events_links'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
