# Generated by Django 3.1.3 on 2020-12-03 18:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WSS', '0008_auto_convert_participant_timestamp_to_auto_now_add'),
    ]

    operations = [
        migrations.CreateModel(
            name='Announcement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create_timestamp', models.DateTimeField(auto_now_add=True)),
                ('last_modify_timestamp', models.DateTimeField(auto_now=True)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('wss', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='announcements', to='WSS.wss', verbose_name='WSS')),
            ],
        ),
    ]