# Generated by Django 3.1.3 on 2023-04-06 03:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0050_auto_20230404_1812'),
    ]

    operations = [
        migrations.AddField(
            model_name='baseevent',
            name='form_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]