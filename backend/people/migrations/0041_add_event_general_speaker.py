# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')
    ctype = ContentType.objects.get_for_model(Speakers)

    Speakers.objects.get_or_create(
        name='Opening Ceremony',
        defaults={
            'picture': 'media/7th/speakers/WSS.jpeg',
            'degree': 'Winter Seminar Series',
            'place': 'Sharif University of Technology',
            'polymorphic_ctype': ctype,
            'bio': '''''',
        })
        
    Speakers.objects.filter(name='Opening Ceremony').update(
            picture='media/7th/speakers/WSS.jpeg',
            degree='Winter Seminar Series',
            place='Sharif University of Technology',
            polymorphic_ctype=ctype,
            bio='''''')


def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Seminar = apps.get_model('event', 'Seminar')
    PosterSession = apps.get_model('events', 'PosterSession')
    Workshop = apps.get_model('events', 'Workshop')
    names = ['Opening Ceremony', ]
    speakers = Speakers.objects.filter(name__in=names)
    Seminar.objects.filter(speaker__in=speakers).delete()
    PosterSession.objects.filter(speaker__in=speakers).delete()
    Workshop.objects.filter(speaker__in=speakers).delete()
    speakers.delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0040_update_labtalk_7th_speaker_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
