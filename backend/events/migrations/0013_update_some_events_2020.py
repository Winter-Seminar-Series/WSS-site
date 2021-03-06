from django.db import migrations


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    Speaker = apps.get_model('people', 'Speaker')
    Workshop = apps.get_model('events', 'Workshop')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)

    Seminar.objects.filter(wss=wss, title='Understanding the role of training regimes continual training of neural networks').update(title='Understanding the role of training regimes in continual training of neural networks')
    Seminar.objects.filter(wss=wss, title='Algorithms vs. Mechanisms: Bayesian Blackbox Reductions in Mechanism Design').delete()
    Speaker.objects.filter(name='Rad Niazadeh').delete()

    Workshop.objects.filter(wss=wss, title='Conceptual Blending in Computational Creativity').update(
        title='A Study of Computational Creativity from the Perspective of Conceptual Blending',
        syllabus='In this talk, we will talk about creativity. Creativity is a skill to have novel ideas in problem-solving and produce surprising products. Human creativity appears in music, art, jokes, novel stories, movies, and every other area. We simulate humans creativity in intelligence agents. A creative agent can interpret and enhance humans creativity; They also can produce creative ideas which are surprising and useful. In this talk, we focus on conceptual blending, which is a process to blend to mental spaces and create a novel mental space. All new and surprising ideas are a new version of a combination of old ideas. After generating some creative ideas, we study some metrics for evaluation products.'
        )


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0012_fill_more_seminars_2020'),
    ]

    operations = [
        migrations.RunPython(forwards)
    ]
