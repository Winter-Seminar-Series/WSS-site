from django.db import migrations
    

def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=[
        'Mohammad Haft-Javaheiran',
    ]).update(name='Mohammad Haft-Javaherian')

def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=[
        'Mohammad Haft-Javaherian',
    ]).update(name='Mohammad Haft-Javaheiran')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0027_add_new_speakers_2020'),
        ('events', '0008_fill_more_seminars_2020')
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
