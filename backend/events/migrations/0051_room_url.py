# Generated by Django 3.1.3 on 2023-04-05 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0050_auto_20230404_1812'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='url',
            field=models.URLField(blank=True, max_length=255, null=True),
        ),
    ]
