from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    date = datetime(2022, 2, 24) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(start_time=date + timedelta(hours=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Masoumeh Ebrahimi')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Hadi Daneshmand')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Behzad Salami')\
        .update(start_time=date + timedelta(hours=17, minutes=30), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Mahdi Cheraghchi')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Azam Soleimanian')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))

    date = datetime(2022, 2, 25) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Farzan Farnia')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Maryam Kamgarpour')\
        .update(start_time=date + timedelta(hours=17, minutes=30), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Hassan Ashtiani')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Moradi')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Pantea Zardoshti')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Shaikhha')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))

    date = datetime(2022, 2, 26) - timedelta(hours=3, minutes=30)

    Seminar.objects.filter(wss=wss, speaker__name='Shahram Khazaei')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Pooya Hatami')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(start_time=date + timedelta(hours=17, minutes=30), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Soheil Abbasloo')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Iman Hajirasouliha')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Hamed Haddadi')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))

    date = datetime(2022, 2, 27) - timedelta(hours=3, minutes=30)
    
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hossein Rohban')\
        .update(start_time=date + timedelta(hours=16, minutes=15), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(start_time=date + timedelta(hours=17, minutes=30), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Sadrosadati')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hajiabadi')\
        .update(start_time=date + timedelta(hours=19), duration=timedelta(minutes=60))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Shahrad')\
        .update(start_time=date + timedelta(hours=20, minutes=15), duration=timedelta(minutes=60))


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    date = datetime(2022, 2, 24)

    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Masoumeh Ebrahimi')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Hadi Daneshmand')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Behzad Salami')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Mahdi Cheraghchi')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Azam Soleimanian')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    Seminar.objects.filter(wss=wss, speaker__name='Farzan Farnia')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Maryam Kamgarpour')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Hassan Ashtiani')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Moradi')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Pantea Zardoshti')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Amir Shaikhha')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))

    Seminar.objects.filter(wss=wss, speaker__name='Shahram Khazaei')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Pooya Hatami')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Soheil Abbasloo')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Iman Hajirasouliha')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Hamed Haddadi')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hossein Rohban')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Sadrosadati')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hajiabadi')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Shahrad')\
        .update(start_time=date + timedelta(hours=10), duration=timedelta(minutes=45))
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0039_update_speakers'),
        ('events', '0035_add_seminar_rooms'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
