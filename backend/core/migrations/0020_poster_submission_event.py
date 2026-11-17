from django.db import migrations, models
import django.db.models.deletion


def assign_legacy_submissions(apps, schema_editor):
    Submission = apps.get_model('core', 'PosterSessionImage')
    Event = apps.get_model('core', 'Event')
    alias = schema_editor.connection.alias
    submissions = Submission.objects.using(alias).filter(event__isnull=True)
    if submissions.exists():
        # The organisers confirmed that all 39 pre-migration submissions belong to WSS 10.
        event = Event.objects.using(alias).get(order=10)
        submissions.update(event_id=event.pk)


def ensure_rollback_safe(apps, schema_editor):
    Submission = apps.get_model('core', 'PosterSessionImage')
    if Submission.objects.using(schema_editor.connection.alias).exclude(event__order=10).exists():
        raise RuntimeError(
            'Cannot remove event scoping while submissions from other editions exist. '
            'Preserve or export them before rollback.'
        )


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0019_alter_organization_logo_alter_speaker_image_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='postersessionimage',
            name='event',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='core.event'),
        ),
        migrations.RunPython(assign_legacy_submissions, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='postersessionimage',
            name='event',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='core.event'),
        ),
        migrations.AlterField(
            model_name='postersessionimage',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='auth.user'),
        ),
        migrations.AddConstraint(
            model_name='postersessionimage',
            constraint=models.UniqueConstraint(fields=('user', 'event'), name='unique_poster_submission_per_user_event'),
        ),
        migrations.RunPython(migrations.RunPython.noop, ensure_rollback_safe),
    ]
