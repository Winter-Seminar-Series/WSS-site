from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2021)
    ctype = ContentType.objects.get_for_model(Seminar)

    Seminar.objects.filter(wss=wss, speaker__name='Masoumeh Ebrahimi')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Behzad Salami')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Mahdi Cheraghchi')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Azam Soleimanian')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Hadi Daneshmand')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Farzan Farnia')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Maryam Kamgarpour')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Hassan Ashtiani')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Pantea Zardoshti')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Moradi')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Shaikhha')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Shahram Khazaei')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Soheil Abbasloo')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Hamed Haddadi')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Pooya Hatami')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Iman Hajirasouliha')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hossein Rohban')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Sadrosadati')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Shahrad')\
        .update(room="room1")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hajiabadi')\
        .update(room="room2")
    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(room="room1")


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2021)

    Seminar.objects.filter(wss=wss, speaker__name='Masoumeh Ebrahimi')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Behzad Salami')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Mahdi Cheraghchi')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Azam Soleimanian')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Hadi Daneshmand')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Zamir')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Farzan Farnia')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Maryam Kamgarpour')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Hassan Ashtiani')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Pantea Zardoshti')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Moradi')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Amir Shaikhha')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Shahram Khazaei')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Kavé Salamatian')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Soheil Abbasloo')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Hamed Haddadi')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Pooya Hatami')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Iman Hajirasouliha')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hossein Rohban')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Peyman Mohajerin Esfahani')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Sadrosadati')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Shahrad')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Mohammad Hajiabadi')\
        .update(room="")
    Seminar.objects.filter(wss=wss, speaker__name='Stefan Schmid')\
        .update(room="")
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0038_add_wss_7th_roundtable_speakers'),
        ('events', '0034_add_room_field'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
