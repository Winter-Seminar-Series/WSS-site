# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)

    seminars = {
        1: {
            (5, 0): ['Mostafa Dehghgani'],
            (6, 0): ['Mohammad Hossein Rohban', 'Mona Azadkia'],
            (9, 0): ['Mehraveh Salehi'],
            (9, 30): ['Gholamali Aminian', 'Mojtaba Tefagh']
        },
        2: {
            (5, 0): ['Seyed Mohsen Moosavi Dezfooli', 'Nassir Navab'],
            (6, 0): ['Mahdi Soltanolkotabi'],
            (9, 0): ['Sepehr Assadi', 'Mohamad Kazem Shirani Faradonbeh'],
            (9, 30): ['Mohammad Haft-Javaherian']
        },
        3: {
            (5, 0): ['Amir Shaikhha'],
            (6, 0): ['Mostafa Rezazad', 'Hamed Hassani'],
            (9, 0): ['Mehrdad Farajtabar', 'Mahmoud Ghandi'],
            (9, 30): ['Vijay Vazirani']
        },
        4: {
            (5, 0): ['Amin Gohari'],
            (6, 0): ['Dorsa Sadigh'],
            (9, 0): ['Alexandre Alahi'],
            (9, 30): ['Ehsan Kazemi']
        }
    }

    date = datetime(2020, 12, 30)
    for day in seminars:
        for hour in seminars[day]:
            time = date + timedelta(days=day, hours=hour[0], minutes=hour[1])
            Seminar.objects.filter(wss=wss, speaker__name__in=seminars[day][hour]).update(start_time=time)



class Migration(migrations.Migration):

    dependencies = [
        ('events', '0012_update_some_events_2020'),
        ('people', '0029_update_speaker_name')
    ]

    operations = [
        migrations.RunPython(forwards)
    ]
