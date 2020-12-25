from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Workshop = apps.get_model('events', 'Workshop')

    workshops_by_time = {
        datetime(2020, 12, 27): [
            "A Study of Computational Creativity from the Perspective of Conceptual Blending",
            "Vehicle Behavior Prediction in Self-driving Cars, from an Industrial Perspective",
        ],
        datetime(2020, 12, 28): [
            "A brief history of word embeddings and implement the sentiment analysis project with bert",
        ],
        datetime(2020, 12, 29): [
            "Machine Learning on Persian Text: Using Transfer Learning Word and Document Vectors(word2vec and doc2vec)",
        ],
        datetime(2020, 12, 30): [
            "Towards Big Data Processing by Spark Unified Analytics Engine",
            "Transfer Learning in NLP with Huggingface",
        ],
    }

    duration = timedelta(hours=3)
    start_time = timedelta(hours=17)
    for time in workshops_by_time:
        for title in workshops_by_time[time]:
            Workshop.objects.filter(wss__year=2020, title=title)\
                .update(start_time=time+start_time, duration=duration)


def rollback(apps, schema_editor):
    Workshop = apps.get_model('events', 'Workshop')
    Workshop.objects.filter(wss__year=2020).update(start_time=None, duration=timedelta())


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0014_fill_seminar_start_times_2020'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
