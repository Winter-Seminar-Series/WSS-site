# Generated by Django 4.2.8 on 2023-12-26 15:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Staff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('designation', models.TextField(blank=True, max_length=50)),
                ('description', models.TextField(blank=True, max_length=1000)),
                ('image', models.ImageField(blank=True, upload_to='staff/')),
            ],
        ),
        migrations.CreateModel(
            name='StaffTeam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField(max_length=50)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.event')),
            ],
        ),
        migrations.CreateModel(
            name='StaffTeamMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('staff', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='staff.staff')),
                ('staff_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='staff.staffteam')),
            ],
        ),
    ]
