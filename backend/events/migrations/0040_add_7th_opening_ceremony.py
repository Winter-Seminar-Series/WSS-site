from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    date = datetime(2022, 2, 24) - timedelta(hours=3, minutes=30)

    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Opening Ceremony',
        audience='',
        speaker=Speaker.objects.filter(name='Opening Ceremony').last(),
        abstract='''''',
        start_time=date + timedelta(hours=14),
        duration=timedelta(minutes=30),
        room='room1'
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    titles = [
        'Winter Seminar Series Opening Ceremony',
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0041_add_event_general_speaker'),
        ('events', '0039_update_heydarnoori_labtalk'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
