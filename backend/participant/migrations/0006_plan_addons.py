import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    """Add-ons (lunch, parking…) sold with a plan, and the units participants have paid for. Additive only."""

    dependencies = [
        ('participant', '0005_plan_availability_and_reset_tokens'),
        ('payment', '0005_payment_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlanAddon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('price', models.PositiveIntegerField(help_text='Rial, per unit.')),
                (
                    'discountable',
                    models.BooleanField(
                        default=False,
                        help_text=(
                            'Whether discount codes apply to it. Off: it is always paid in full, like a workshop.'
                        ),
                    ),
                ),
                (
                    'is_open',
                    models.BooleanField(
                        default=True,
                        help_text='Whether it can be bought right now. Close an add-on instead of deleting it.',
                    ),
                ),
                (
                    'capacity',
                    models.PositiveIntegerField(
                        blank=True,
                        help_text='Units that can be sold in total; empty for no limit. Checked at checkout.',
                        null=True,
                    ),
                ),
                (
                    'max_per_participant',
                    models.PositiveIntegerField(
                        default=1,
                        help_text='Most units one participant can hold, across all their purchases.',
                        validators=[django.core.validators.MinValueValidator(1)],
                    ),
                ),
                (
                    'plan',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='addons',
                        to='participant.participationplan',
                    ),
                ),
            ],
            options={
                'ordering': ('plan_id', 'id'),
            },
        ),
        migrations.CreateModel(
            name='AddonPurchase',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('date', models.DateTimeField(auto_now_add=True)),
                (
                    'addon',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name='purchases',
                        to='participant.planaddon',
                    ),
                ),
                (
                    'participant',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='addon_purchases',
                        to='participant.participant',
                    ),
                ),
                (
                    'payment',
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name='addon_purchases',
                        to='payment.paymentrequest',
                    ),
                ),
            ],
        ),
    ]
