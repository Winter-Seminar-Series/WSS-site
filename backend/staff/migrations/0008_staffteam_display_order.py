import re
from collections import defaultdict

from django.db import migrations, models


# Preserve the previous frontend order when moving ownership of it to the database.
PREVIOUS_TEAM_ORDER = (
    'committee', 'scientific', 'executive', 'excutive', 'technical', 'networking',
    'content', 'social', 'media', 'marketing', 'branding', 'sponsorship', 'finance', 'human',
)


def initialise_display_order(apps, schema_editor):
    StaffTeam = apps.get_model('staff', 'StaffTeam')
    alias = schema_editor.connection.alias
    groups = defaultdict(list)
    for team in StaffTeam.objects.using(alias).select_related('event').all():
        groups[team.event_id].append(team)

    def rank(team):
        name = re.sub(r'\s+', ' ', re.sub(r'[_-]+', ' ', team.name.lower())).strip()
        if team.event.order == 11 and name in ('executive', 'excutive'):
            return len(PREVIOUS_TEAM_ORDER) + 1
        return next((i for i, keyword in enumerate(PREVIOUS_TEAM_ORDER) if keyword in name), len(PREVIOUS_TEAM_ORDER))

    for teams in groups.values():
        for position, team in enumerate(sorted(teams, key=lambda team: (rank(team), team.name.casefold(), team.pk)), 1):
            team.display_order = position * 10
    StaffTeam.objects.using(alias).bulk_update(
        [team for teams in groups.values() for team in teams], ['display_order'],
    )


def reset_display_order(apps, schema_editor):
    apps.get_model('staff', 'StaffTeam').objects.using(schema_editor.connection.alias).update(display_order=0)


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0007_alter_staff_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='staffteam',
            name='display_order',
            field=models.PositiveIntegerField(default=0, help_text='Lower numbers appear first within an edition.'),
        ),
        migrations.AlterModelOptions(
            name='staffteam',
            options={'ordering': ('display_order', 'id')},
        ),
        migrations.RunPython(initialise_display_order, reset_display_order),
    ]
