# Generated by Django 4.2.8 on 2025-02-28 09:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('participant', '0002_participation_spotplayer_license_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='password_reset_code',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
