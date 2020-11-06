# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:26
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('people', '0001_initial'),
        ('events', '0001_initial'),
        ('WSS', '0002_auto_20201022_1926'),
    ]

    operations = [
        migrations.AddField(
            model_name='workshop',
            name='speaker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='workshops', to='people.Speaker'),
        ),
        migrations.AddField(
            model_name='workshop',
            name='sponsor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='workshops', to='WSS.Sponsor'),
        ),
        migrations.AddField(
            model_name='seminar',
            name='material',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='events.SeminarMaterial'),
        ),
        migrations.AddField(
            model_name='seminar',
            name='speaker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='seminars', to='people.Speaker'),
        ),
        migrations.AddField(
            model_name='postersession',
            name='material',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='events.PosterMaterial'),
        ),
        migrations.AddField(
            model_name='postersession',
            name='speaker',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='postersessions', to='people.Speaker'),
        ),
    ]