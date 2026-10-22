from django.db import migrations, models


def close_in_person_plans(apps, schema_editor):
    # Until now the code refused every "In Person…" mode of attendance by name. Keep them closed, now as data that
    # the organisers can change in the admin.
    ParticipationPlan = apps.get_model('participant', 'ParticipationPlan')
    ParticipationPlan.objects.filter(kind='M', mode_of_attendance__name__startswith='In Person').update(is_open=False)


class Migration(migrations.Migration):
    """
    - ParticipationPlan.is_open / capacity replace the hard-coded "In Person" closure and the IN_PERSON_LIMIT env.
    - Participant.password_reset_code goes: reset links now carry Django's signed, expiring token, which needs no
      storage. Outstanding plain-text codes are discarded with it. Reversing restores the column, empty.
    """

    dependencies = [
        ('participant', '0004_alter_participationattachment_attachment'),
    ]

    operations = [
        migrations.AddField(
            model_name='participationplan',
            name='is_open',
            field=models.BooleanField(
                default=True, help_text='Whether it can be bought right now. Close a plan instead of deleting it.'
            ),
        ),
        migrations.AddField(
            model_name='participationplan',
            name='capacity',
            field=models.PositiveIntegerField(
                blank=True,
                null=True,
                help_text='Maximum number of registrations; empty for no limit. Checked at checkout.',
            ),
        ),
        migrations.RunPython(close_in_person_plans, migrations.RunPython.noop),
        migrations.RemoveField(model_name='participant', name='password_reset_code'),
    ]
