from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    Workshop = apps.get_model('events', 'Workshop')

    room_url_pattern = "https://vclass.ecourse.sharif.edu/ch/ssc-{}"

    seminars_by_room = {
        1: [
            'Mostafa Dehghani',
            'Nassir Navab',
            'Amir Shaikhha',
            'Amin Gohari',
            'Mehraveh Salehi',
            'Sepehr Assadi',
            'Mehrdad Farajtabar',
            'Alexandre Alahi',
        ],
        2: [
            'Seyed-Mohsen Moosavi-Dezfooli',
            'Shahram Ghandeharizadeh',
            'Ehsan Kazemi',
            'Mohamad Kazem Shirani Faradonbeh',
            'Mahmoud Ghandi',
        ],
        3: [
            'Mohammad Hossein Rohban',
            'Gholamali Aminian',
            'Mahdi Soltanolkotabi',
            'Mohammad Haft-Javaherian',
            'Mostafa Rezazad',
            'Vijay Vazirani',
            'Dorsa Sadigh',
            'Shayan Oveis Gharan',
        ],
        4: [
            'Mona Azadkia',
            'Mojtaba Tefagh',
            'Soheil Behnezhad',
            'Hamed Hassani',
        ],
    }

    workshops_by_room = {
        1: [
            'Mohammadhossein Bahari',
            'Mohammad Dehghani',
            'Mohammad Heydari',
        ],
        2: [
            'Maryam Sadat Eslami',
            'Mohammad Fazeli',
            'Mohammad Mahdi Samiei',
        ],
    }

    for room_id in seminars_by_room:
        Seminar.objects.filter(wss__year=2020, speaker__name__in=seminars_by_room[room_id])\
            .update(link=room_url_pattern.format(room_id))

    for room_id in workshops_by_room:
        Workshop.objects.filter(wss__year=2020, speaker__name__in=workshops_by_room[room_id])\
            .update(link=room_url_pattern.format(room_id))

def rollback(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    Workshop = apps.get_model('events', 'Workshop')
    Seminar.objects.filter(wss__year=2020).update(link=None)
    Workshop.objects.filter(wss__year=2020).update(link=None)


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0015_fill_workshop_times_2020'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
