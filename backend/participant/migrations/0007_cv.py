import core.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    """CVs, one per participant and edition. Additive only: a new table, nothing existing changes."""

    dependencies = [
        ('participant', '0006_plan_addons'),
        ('core', '0020_poster_submission_event'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='CV',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to=core.models.UniqueUploadPath('cv'))),
                ('file_name', models.CharField(max_length=255)),
                ('size', models.PositiveIntegerField(help_text='Bytes.')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                (
                    'event',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT, related_name='cvs', to='core.event'
                    ),
                ),
                (
                    'user',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='cvs',
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                'verbose_name': 'CV',
                'verbose_name_plural': 'CVs',
                'constraints': [
                    models.UniqueConstraint(fields=('user', 'event'), name='unique_cv_per_user_event'),
                ],
            },
        ),
    ]
