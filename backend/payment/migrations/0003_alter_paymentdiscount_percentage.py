# Generated by Django 4.2.8 on 2024-02-06 12:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("payment", "0002_alter_paymentrequest_discount"),
    ]

    operations = [
        migrations.AlterField(
            model_name="paymentdiscount",
            name="percentage",
            field=models.DecimalField(decimal_places=2, default=0.0, max_digits=5),
        ),
    ]
