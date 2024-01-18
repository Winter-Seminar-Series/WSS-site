# Generated by Django 4.2.8 on 2024-01-18 15:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password_reset_code', models.CharField(blank=True, max_length=5)),
            ],
        ),
        migrations.CreateModel(
            name='ParticipantInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, max_length=100)),
                ('last_name', models.CharField(blank=True, max_length=100)),
                ('national_code', models.CharField(blank=True, max_length=10)),
                ('phone_number', models.CharField(blank=True, max_length=15)),
                ('city', models.CharField(blank=True, max_length=100)),
                ('birth_date', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female'), ('O', 'Other')], default='M', max_length=1)),
                ('university', models.CharField(blank=True, max_length=100)),
                ('major', models.CharField(blank=True, max_length=100)),
                ('job', models.CharField(blank=True, max_length=100)),
                ('is_open_to_work', models.BooleanField(default=False)),
                ('fields_of_interest', models.TextField(blank=True)),
                ('grade', models.CharField(choices=[('B', 'Bachelor'), ('M', 'Master'), ('P', 'PhD')], default='B', max_length=1)),
                ('introduction_method', models.TextField(blank=True)),
                ('linkedin', models.CharField(blank=True, max_length=100)),
                ('github', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Participation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('info', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.participantinfo')),
                ('participant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.participant')),
            ],
        ),
        migrations.CreateModel(
            name='ParticipationPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('price', models.IntegerField(default=0)),
                ('description', models.TextField(blank=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
            ],
        ),
        migrations.CreateModel(
            name='ParticipationAttachment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attachment', models.FileField(blank=True, upload_to='participation/')),
                ('description', models.TextField(blank=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('participation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.participation')),
            ],
        ),
        migrations.AddField(
            model_name='participation',
            name='plan',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='participant.participationplan'),
        ),
        migrations.AddField(
            model_name='participant',
            name='info',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='participant.participantinfo'),
        ),
        migrations.AddField(
            model_name='participant',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
