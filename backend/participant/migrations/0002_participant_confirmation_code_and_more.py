# Generated by Django 4.2.8 on 2024-02-03 08:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('participant', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='participant',
            name='confirmation_code',
            field=models.CharField(blank=True, max_length=5),
        ),
        migrations.AddField(
            model_name='participant',
            name='is_confirmed',
            field=models.BooleanField(default=False),
        ),
    ]
