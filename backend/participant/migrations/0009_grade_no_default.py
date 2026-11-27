from django.db import migrations, models


class Migration(migrations.Migration):
    """New profiles start with no grade, so the participant picks one instead of inheriting Bachelor. Existing rows
    keep what they hold."""

    dependencies = [
        ('participant', '0008_normalize_universities'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participantinfo',
            name='grade',
            field=models.CharField(
                blank=True, choices=[('B', 'Bachelor'), ('M', 'Master'), ('P', 'PhD')], max_length=1
            ),
        ),
    ]
