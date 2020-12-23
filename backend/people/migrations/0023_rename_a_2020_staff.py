# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    
    Staff.objects.filter(name='Hamila Meili').update(name='Hamila Mailee')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0022_remove_second_Mahdi_Farvardin_again'),
    ]

    operations = [
        migrations.RunPython(forwards)
    ]
