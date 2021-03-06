# Generated by Django 3.1.2 on 2020-11-12 18:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WSS', '0003_add_WSS_2020'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='current_wss',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='participants', to='WSS.wss', verbose_name='WSS'),
        ),
        migrations.AlterField(
            model_name='sponsorship',
            name='sponsor',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='sponsorships', to='WSS.sponsor'),
        ),
        migrations.AlterField(
            model_name='wss',
            name='booklet',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='WSS.booklet'),
        ),
        migrations.AlterField(
            model_name='wss',
            name='main_clip',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='WSS.clip'),
        ),
        migrations.AlterField(
            model_name='wss',
            name='main_image',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='+', to='WSS.image'),
        ),
    ]
