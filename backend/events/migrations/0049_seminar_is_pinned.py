# Generated by Django 3.1.3 on 2023-04-04 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0048_update_salamatian_seminar_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='seminar',
            name='is_pinned',
            field=models.BooleanField(default=False),
        ),
    ]