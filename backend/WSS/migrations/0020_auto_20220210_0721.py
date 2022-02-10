# Generated by Django 3.1.3 on 2022-02-10 07:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0024_auto_20220210_0721'),
        ('WSS', '0019_add_7th_WSS'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='agreement',
            field=models.BooleanField(
                default=False, verbose_name='I agree to the terms of service.'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='date_of_birth',
            field=models.DateField(blank=True, null=True,
                                   verbose_name='Date of Birth'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='major',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='open_to_work',
            field=models.BooleanField(
                default=False, verbose_name='I am open to job offers.'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='resume',
            field=models.FileField(blank=True, null=True, upload_to='uploads'),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='social_media_ids',
            field=models.CharField(
                blank=True, max_length=500, verbose_name='Social Media (LinkedIn, Github, ...)'),
        ),
        migrations.AlterField(
            model_name='userprofile',
            name='favorite_tags',
            field=models.ManyToManyField(
                blank=True, to='events.WssTag', verbose_name='Favorite tags'),
        ),
    ]
