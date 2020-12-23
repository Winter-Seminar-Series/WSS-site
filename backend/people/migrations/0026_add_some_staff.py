# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations
from django.db.models import F

def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    ctype = ContentType.objects.get_for_model(Staff)

    presentation_team = HoldingTeam.objects.get(wss__year=2020, name='Presentation Management')
    presentation_team.staff.all().update(order=F('order')+1)
    new_staff = Staff.objects.create(
        name='Erfan Farhadi',
        picture='media/2020/staff/Erfan-Farhadi.jpg',
        polymorphic_ctype=ctype,
        order=1
    )
    presentation_team.staff.add(new_staff)

def rollback(apps, schema_editor):
    HoldingTeam = apps.get_model('people', 'HoldingTeam')

    presentation_team = HoldingTeam.objects.get(wss__year=2020, name='Presentation Management')
    presentation_team.staff.filter(name='Erfan Farhadi').delete()
    presentation_team.staff.all().update(order=F('order')-1)
    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0025_rename_some_2020_staff'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
