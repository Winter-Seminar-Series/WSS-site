# Generated by Django 4.2.8 on 2024-02-08 13:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("core", "0005_alter_speaker_designation"),
    ]

    operations = [
        migrations.AlterField(
            model_name="event",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
        migrations.AlterField(
            model_name="speaker",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
        migrations.AlterField(
            model_name="subevent",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
        migrations.AlterField(
            model_name="workshop",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
        migrations.AlterField(
            model_name="workshopsession",
            name="description",
            field=models.TextField(blank=True, max_length=5000),
        ),
    ]