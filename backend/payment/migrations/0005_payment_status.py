from django.db import migrations, models

STATUS_FIELD = models.CharField(
    choices=[('pending', 'Pending'), ('paid', 'Paid'), ('failed', 'Failed')], default='pending', max_length=10
)


def backfill_status(apps, schema_editor):
    # Paid requests are known; unpaid ones may have failed or been abandoned, so they stay pending and are
    # settled by their next verification.
    for model in ('PaymentRequest', 'GroupPaymentRequest'):
        apps.get_model('payment', model).objects.filter(paid=True).update(status='paid')


class Migration(migrations.Migration):
    """An explicit payment state, so a failed payment releases its discount use exactly once."""

    dependencies = [
        ('payment', '0004_grouppaymentrequest'),
    ]

    operations = [
        migrations.AddField(model_name='paymentrequest', name='status', field=STATUS_FIELD),
        migrations.AddField(model_name='grouppaymentrequest', name='status', field=STATUS_FIELD.clone()),
        migrations.RunPython(backfill_status, migrations.RunPython.noop),
    ]
