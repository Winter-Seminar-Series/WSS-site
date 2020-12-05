# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations

def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)
    teams = apps.get_model('people', 'HoldingTeam')
    team = teams.objects.create(
        wss=wss,
        name='content',
        staff=Staff.objects.filter(name__in=['Mehdi Farvardin', 'Hossein Firooz', 'Sepehr Amini Afshar', 'Farzam Zohdinasab', 'Pooya Moeini', 'Seyed Mohammad mehdi Hatami'])
    )
    team = teams.objects.create(
        wss=wss,
        name='technical',
        staff=Staff.objects.filter(name__in=['Emran Batman ghelich', 'Ahmad Salimi', 'Ali asghar Ghanati', 'Fateme Khashei', 'Alireza Tajmir riahi', 'Mohammad mehdi Barghi', 'Seyed Alireza Hashemi', 'ArhsiA Akhavan'])
    )
    team = teams.objects.create(
        wss=wss,
        name='network',
        staff=Staff.objects.filter(name__in=['Amirhossein Hadian', 'Amirmohammad Imani', 'Sajjad Rezvani', 'Shima Ramadani', 'Mehdi Jalali', 'Sara Azarnoosh', 'Ehsan Movafagh'])
    )
    team = teams.objects.create(
        wss=wss,
        name='branding',
        staff=Staff.objects.get(name='Seyed Alireza Hosseini')
    )
    team = teams.objects.create(
        wss=wss,
        name='social',
        staff=Staff.objects.filter(name__in=['Sara Azarnoosh', 'Dorna Dehghani', 'Ghazal Shenavar', 'Helia Akhtarkavian', 'Sabiheh Tajdari', 'Sahel Messforoosh', 'Esmaeil Pahang'])
    )
    team = teams.objects.create(
        wss=wss,
        name='media',
        staff=Staff.objects.filter(name__in=['Hamila Meili', 'Mahdieh Ebrahimpoor', 'Roya Aghvami', 'Sara Zahedi', 'Hossein Aghamohammadi'])
    )
    team = teams.objects.create(
        wss=wss,
        name='presentation management',
        staff=Staff.objects.filter(name__in=['Alireza Ziaei', 'Amirhossein Asem Yousefi', 'Vahid Zehtab', 'Sajjad Rezvani'])
    )


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')

    wss = WSS.objects.get(year=2020)

    teams.objects.filter(wss=wss, name__in=['content', 'technical', 'network', 'branding', 'social', 'media', 'presentation management']).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0004_fill_staff_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
