from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(
            title='From Data to Decisions: A Distributionally Robust Approach',
            abstract='''A broad spectrum of applications, such as power systems operation, manufacturing, energy management, anomaly detection, and security, can be viewed as decision-making problems in uncertain and dynamic environments. This class of problems is naturally formulated in an optimization framework whose exact solution is often intractable. In this seminar, considering randomized (data-driven) counterparts of these programs, we discuss their tractability and a probabilistic bridge between the proposed random solutions and the original ones. A particular focus will be given to a decision-making procedure known as distributionally robust optimization.''')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(
            title='From Data to Decisions in Dynamic Environments',
            abstract='''A broad spectrum of applications, such as power systems operation, manufacturing, energy management, anomaly detection, and security, can be viewed as decision-making problems in uncertain and dynamic environments. This class of problems is naturally formulated in an optimization framework whose exact solution is often intractable. In this seminar, we consider tractable randomized (data-driven) counterparts of these programs and study a probabilistic bridge between these solutions and the original ones.''')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0037_add_labtalk_7th_speaker_data'),
        ('events', '0030_add_labtalks_7th'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
