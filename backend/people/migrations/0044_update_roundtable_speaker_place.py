# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')

    Speakers.objects.filter(name='Arash Pourdamghani').update(
        picture='media/7th/speakers/Arash-Pourdamghani.jpg',
        degree='Ph.D. Student',
        place='Researcher, Intelligent Networks (INET), TU Berlin')


def rollback(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0043_add_a_new_roundtable_speaker'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
