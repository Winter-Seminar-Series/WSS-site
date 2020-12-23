from django.db import migrations


def forwards(apps, schema_editor):
    Workshop = apps.get_model('events', 'Workshop')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)

    capacities = {
        'Conceptual Blending in Computational Creativity': 45,
        'A brief history of word embeddings and implement the sentiment analysis project with bert': 15,
        'Machine Learning on Persian Text: Using Transfer Learning Word and Document Vectors(word2vec and doc2vec)': 30,
        'Towards Big Data Processing by Spark Unified Analytics Engine': 20,
        'Transfer Learning in NLP with Huggingface': 30,
        'Vehicle Behavior Prediction in Self-driving Cars, from an Industrial Perspective': 40,
    }

    for title in capacities:
        Workshop.objects\
            .filter(wss=wss, title=title)\
            .update(capacity=capacities[title])


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Workshop = apps.get_model('events', 'Workshop')
    wss = WSS.objects.get(year=2020)

    Workshop.objects.filter(wss=wss).update(capacity=0)


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0010_baseevent__url_allow_blank'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
