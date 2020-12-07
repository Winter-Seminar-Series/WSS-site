# Generated by Django 3.1.3 on 2020-11-28 20:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WSS', '0005_add_participant_user_and_wss_fee'),
        ('events', '0004_baseevent_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='WssTag',
            fields=[
                ('name', models.CharField(max_length=100, primary_key=True, serialize=False, verbose_name='Tag')),
                ('wss', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tag', to='WSS.wss')),
            ],
        ),
        migrations.AddField(
            model_name='baseevent',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, to='events.WssTag'),
        ),
    ]
