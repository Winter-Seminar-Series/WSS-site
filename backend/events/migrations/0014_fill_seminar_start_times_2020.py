from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)

    seminars = {
        1: {
            (17, 0, 50): ['Mostafa Dehghani', 'Seyed-Mohsen Moosavi-Dezfooli'],
            (18, 0, 50): ['Mohammad Hossein Rohban', 'Mona Azadkia'],
            (21, 0, 25): ['Mehraveh Salehi', 'Ehsan Kazemi'],
            (21, 30, 25): ['Gholamali Aminian', 'Mojtaba Tefagh']
        },
        2: {
            (17, 0, 50): ['Nassir Navab'],
            (18, 0, 50): ['Mahdi Soltanolkotabi', 'Soheil Behnezhad'],
            (21, 0, 25): ['Sepehr Assadi', 'Mohamad Kazem Shirani Faradonbeh'],
            (21, 30, 25): ['Mohammad Haft-Javaherian']
        },
        3: {
            (17, 0, 50): ['Amir Shaikhha', 'Shahram Ghandeharizadeh'],
            (18, 0, 50): ['Mostafa Rezazad', 'Hamed Hassani'],
            (21, 0, 25): ['Mehrdad Farajtabar', 'Mahmoud Ghandi'],
            (21, 30, 25): ['Vijay Vazirani']
        },
        4: {
            (17, 0, 50): ['Amin Gohari'],
            (18, 0, 50): ['Dorsa Sadigh'],
            (21, 0, 25): ['Alexandre Alahi'],
            (21, 30, 25): ['Shayan Oveis Gharan']
        }
    }

    date = datetime(2020, 12, 30)
    for day in seminars:
        for hour in seminars[day]:
            time = date + timedelta(days=day, hours=hour[0], minutes=hour[1])
            duration = timedelta(minutes=hour[2])
            Seminar.objects.filter(wss=wss, speaker__name__in=seminars[day][hour]).update(start_time=time, duration=duration)


def rollback(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    Seminar.objects.filter(wss__year=2020).update(start_time=None, duration=timedelta())


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0013_update_some_events_2020'),
        ('people', '0028_update_speaker_name')
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
