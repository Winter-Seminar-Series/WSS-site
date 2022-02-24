from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(RoundTable)

    date = datetime(2022, 2, 24)
    rt = RoundTable.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        subject='Ph.D. student\'s life - Academic life',
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    speakers_names = [
        'Amir Moradi',
        'Hadi Daneshmand',
        'Mahdi Cheraghchi',
    ]
    for name in speakers_names:
        rt.speakers.add(Speaker.objects.filter(name=name).last())
    rt.save()

    date = datetime(2022, 2, 25)
    rt = RoundTable.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        subject='Path to the academic job - How to research',
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    speakers_names = [
        'Amir Zamir',
        'Hamed Hassani',
        'Abolfazl Motahari',
    ]
    for name in speakers_names:
        rt.speakers.add(Speaker.objects.filter(name=name).last())
    rt.save()

    date = datetime(2022, 2, 26)
    rt = RoundTable.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        subject='Which one is for me? Masters or Ph.D.',
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    speakers_names = [
        'Soheil Abbaslooa',
        'Kavé Salamatian',
    ]
    for name in speakers_names:
        rt.speakers.add(Speaker.objects.filter(name=name).last())
    rt.save()

    date = datetime(2022, 2, 27)
    rt = RoundTable.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        subject='On the gap between Research and Industry - Industry for Research or Research for Industry',
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )
    speakers_names = [
        'Hamed Haddadi',
        'Hessam Bagherinezhad',
        # 'Kooshyar', ?
    ]
    for name in speakers_names:
        rt.speakers.add(Speaker.objects.filter(name=name).last())
    rt.save()


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    RoundTable = apps.get_model('events', 'RoundTable')
    wss = WSS.objects.get(year=2021)

    subjects = [
        'Ph.D. student\'s life - Academic life',
        'Path to the academic job - How to research',
        'Which one is for me? Masters or Ph.D.',
        'On the gap between Research and Industry - Industry for Research or Research for Industry',
    ]

    RoundTable.objects.filter(wss=wss, subject__in=subjects).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0038_add_wss_7th_roundtable_speakers'),
        ('events', '0032_roundtable'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
