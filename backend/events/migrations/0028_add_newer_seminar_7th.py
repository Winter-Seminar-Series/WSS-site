from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    date = datetime(2022, 2, 24)

    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Algorithms for single-cell tumor phylogeny inference and deep learning imaging models for tumor purity estimation',
        audience='',
        abstract='''In this talk, I will present computational problems and combinatorial optimization solutions related to the evolution of somatic mutations in cancer using both bulk and single-cell sequencing data. I will also discuss some deep learning methods for estimating tumor purity in cancer.''',
        speaker=Speaker.objects.filter(name='Iman Hajirasouliha').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    titles = [
        'Algorithms for single-cell tumor phylogeny inference and deep learning imaging models for tumor purity estimation',
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0036_add_newer_7th_speaker_data'),
        ('events', '0027_update_schmid_seminar_abstract'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
