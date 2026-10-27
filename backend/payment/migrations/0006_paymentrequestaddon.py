import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    """The add-ons ordered in a payment. Additive only."""

    dependencies = [
        ('participant', '0006_plan_addons'),
        ('payment', '0005_payment_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='PaymentRequestAddon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                (
                    'addon',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='payment_lines',
                        to='participant.planaddon',
                    ),
                ),
                (
                    'payment',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='addon_lines',
                        to='payment.paymentrequest',
                    ),
                ),
            ],
        ),
        migrations.AddConstraint(
            model_name='paymentrequestaddon',
            constraint=models.UniqueConstraint(fields=('payment', 'addon'), name='unique_addon_per_payment'),
        ),
    ]
