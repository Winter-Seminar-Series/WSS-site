from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')

    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24)
    RoundTable.objects.get(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(start_time=date + timedelta(hours=21, minutes=30), duration=timedelta(minutes=90))

    date = datetime(2022, 2, 25)
    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(start_time=date + timedelta(hours=21, minutes=30), duration=timedelta(minutes=90))

    date = datetime(2022, 2, 26)
    rt = RoundTable.objects.filter(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')
    rt.update(start_time=date + timedelta(hours=21, minutes=30),
              duration=timedelta(minutes=90))
    rt.speakers.remove(Speaker.objects.filter(name='Soheil Abbaslooa').last())
    rt.speakers.add(Speaker.objects.filter(name='Soheil Abbasloo').last())
    rt.save()

    date = datetime(2022, 2, 27)
    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(start_time=date + timedelta(hours=21, minutes=30), duration=timedelta(minutes=90))


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    RoundTable = apps.get_model('events', 'RoundTable')
    Speaker = apps.get_model('people', 'Speaker')
    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24)
    RoundTable.objects.get(wss=wss, subject='Ph.D. student\'s life - Academic life')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    date = datetime(2022, 2, 25)
    RoundTable.objects.filter(wss=wss, subject='Path to the academic job - How to research')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    date = datetime(2022, 2, 26)
    rt = RoundTable.objects.filter(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')
    rt.update(start_time=date + timedelta(hours=10),
              duration=timedelta(minutes=45))
    rt.speakers.remove(Speaker.objects.filter(name='Soheil Abbasloo').last())
    rt.speakers.add(Speaker.objects.filter(name='Soheil Abbaslooa').last())
    rt.save()

    date = datetime(2022, 2, 27)
    RoundTable.objects.filter(wss=wss, subject='On the gap between Research and Industry - Industry for Research or Research for Industry')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0041_fill_roundtable_pictures'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
