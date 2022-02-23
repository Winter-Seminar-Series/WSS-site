# Generated by Django 3.1.3 on 2022-02-17 20:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('WSS', '0020_auto_20220210_0721'),
    ]

    operations = [
        migrations.CreateModel(
            name='DiscountCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.CharField(max_length=128)),
                ('related_wss', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='discount_codes', to='WSS.wss')),
            ],
        ),
    ]