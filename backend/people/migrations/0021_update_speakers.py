# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Speaker = apps.get_model('people', 'Speaker')
    
    Speaker.objects.filter(name='Mohamad Kazem Shirani Faradonbeh').update(picture='media/2020/speakers/Mohamad-Kazem-Shirani-Faradonbeh.jpeg')
    Speaker.objects.filter(name='Mojtaba Tefagh').update(picture='media/2020/speakers/Mojtaba-Tefagh.jpg')
    Speaker.objects.filter(name='Mohammad Fazeli').update(picture='media/2020/speakers/Mohammad-Fazeli.jpg')
    Speaker.objects.filter(name='Shahram Ghandeharizadeh').update(picture='media/2020/speakers/Shahram_Ghandeharizadeh.jpg')
    Speaker.objects.filter(name='Shahram Ghandeharizadeh').update(place='faculty member at the University of Southern California')
    Speaker.objects.filter(name='Mohammadhossein Bahari').update(picture='media/2020/speakers/Mohammadhossein-Bahari.jpeg')
    Speaker.objects.filter(name='Gholamali Aminian').update(picture='media/2020/speakers/Gholamali-Aminian.jpg')
    Speaker.objects.filter(name='Maryam Sadat Eslami').update(picture='media/2020/speakers/Maryam-Sadat-Eslami.jpeg')
    Speaker.objects.filter(name='Mostafa Rezazad').update(picture='media/2020/speakers/Mostafa-Rezazad.jpeg')
    Speaker.objects.filter(name='Mohammad Dehghani').update(picture='media/2020/speakers/Mohammad-Dehghani.jpeg')
    Speaker.objects.filter(name='Mohammad Heydari').update(picture='media/2020/speakers/Mohammad-Heydari.jpg')
    Speaker.objects.filter(name='Mehraveh Salehi').update(picture='media/2020/speakers/Mehraveh-Salehi.png')
    Speaker.objects.filter(name='Mohammad Mahdi Samiei').update(picture='media/2020/speakers/Mohammad-Mahdi-Samiei.JPG')
    Speaker.objects.filter(name='Mohammad Haft-Javaheiran').update(picture='media/2020/speakers/Mohammad-Haft-Javaheiran.jpg')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0020_fill_2020_holding_teams_again'),
    ]

    operations = [
        migrations.RunPython(forwards)
    ]