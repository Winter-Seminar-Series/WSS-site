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
        title='The Quest for Efficient Serverless Computing',
        audience='',
        abstract='''This talk focuses on resource management in an emerging cloud service model called serverless computing. Serverless computing has gained popularity in the past few years by offering exceptional scalability capabilities and a flexible pricing model. This paradigm has materialized in services such as AWS Lambda, Azure Functions, and Google Cloud Functions. The talk introduces this service model to broad audiences, and presents some of its resource management challenges. To do so, two characterization studies will be presented: 1) a cluster-wide characterization of the entire serverless workload at Azure Functions, and 2) a detailed micro-architectural study of Apache OpenWhisk platform. The insights gained by the first study led to designing an adaptive scheduling policy reducing cold starts and resource wastage, and the observations in the second study revealed inefficiencies in cloud-grade processors in serving serverless workloads.''',
        speaker=Speaker.objects.filter(name='Mohammad Shahrad').last(),
        start_time=date + timedelta(hours=10),
        duration=timedelta(minutes=45)
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    titles = [
        'The Quest for Efficient Serverless Computing',
    ]

    Seminar.objects.filter(wss=wss, title__in=titles).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0035_add_new_7th_speaker_data'),
        ('events', '0025_add_seminars_7th'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
