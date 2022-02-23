from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Labtalk = apps.get_model('events', 'LabTalk')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Labtalk)

    date = datetime(2022, 2, 24)
    Labtalk.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Data Science and Machine Leaning Lab (DML)',
        field='Data Science,  Multimedia Systems, Bioinformatics, Brain and Cognitive Science',
        website_link='http://dml.ir',
        head=Speaker.objects.filter(name='Hamid R. Rabiee').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )

    date = datetime(2022, 2, 25)
    Labtalk.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Intelligent Software Enginering',
        field='Software Engineering, Mining Software Repository, Software Maintenance and Evolution, Software Analytics, Empirical Software Engineering, Intelligent Software Engineering',
        website_link='http://ise.ce.sharif.ir/',
        head=Speaker.objects.filter(name='Abbas Heydarnoori').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )

    date = datetime(2022, 2, 26)
    Labtalk.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Robust/Interpretable ML Lab',
        field='Anomaly detection, adversarial robustness, Medical image process, reinforcement learning',
        website_link='http://sharif.edu/~rohban/',
        head=Speaker.objects.filter(name='Mohammad Hossein Rohban').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )

    date = datetime(2022, 2, 27)
    Labtalk.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Embedded System Research lab',
        field='IOT, Low Power, Fault Toler, Cyber Physical, Embedded Systems, ECU',
        website_link='http://Esrlab.ce.sharif.edu',
        head=Speaker.objects.filter(name='Alireza Ejlali').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Labtalk = apps.get_model('events', 'LabTalk')
    wss = WSS.objects.get(year=2021)

    titles = [
        'Data Science and Machine Leaning Lab (DML)',
        'Intelligent Software Enginering',
        'Robust/Interpretable ML Lab',
        'Embedded System Research lab',
    ]

    Labtalk.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0037_add_labtalk_7th_speaker_data'),
        ('events', '0029_auto_20220221_1851'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
