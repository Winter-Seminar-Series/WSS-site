from django.db import migrations
    

def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    
    Speakers.objects.filter(name='Azam Soleimanian')\
        .update(place="Applied Researcher - Cryptography, ConsenSys")
    Speakers.objects.filter(name='Mohammad Hossein Rohban')\
        .update(picture='media/7th/speakers/MohammadHossein-Rohban.jpg')

def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    
    Speakers.objects.filter(name='Azam Soleimanian')\
        .update(place="Researcher, EPFL")
    Speakers.objects.filter(name='Mohammad Hossein Rohban')\
        .update(picture='media/7th/speakers/Mohammad-Hossein-Rohban.jpg')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0038_add_wss_7th_roundtable_speakers'),
        ('events', '0035_add_seminar_rooms')
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
