import re
from collections import defaultdict

from django.db import migrations, models


def role_rank(designation):
    """The frontend's previous order (lib/staff-order.ts roleRank), so nothing moves on the site at deploy time."""
    role = re.sub(r'\s+', ' ', re.sub(r'[_-]+', ' ', designation.lower())).strip()
    if not role:
        return 7
    for rank, prefixes in (
        (0, ('president',)),
        (1, ('vice president',)),
        (4, ('sub head',)),
        (2, ('head', 'co head')),
        (3, ('leader',)),
        (5, ('senior',)),
    ):
        if role.startswith(prefixes):
            return rank
    return 6


def initialise_display_order(apps, schema_editor):
    StaffTeamMember = apps.get_model('staff', 'StaffTeamMember')
    alias = schema_editor.connection.alias
    teams = defaultdict(list)
    for member in StaffTeamMember.objects.using(alias).select_related('staff'):
        teams[member.staff_team_id].append(member)

    def key(member):
        staff = member.staff
        return role_rank(staff.designation), staff.designation.casefold(), staff.name.casefold(), member.pk

    for members in teams.values():
        for position, member in enumerate(sorted(members, key=key), 1):
            # Gaps of 10 leave room to insert someone without renumbering the team.
            member.display_order = position * 10
    StaffTeamMember.objects.using(alias).bulk_update(
        [member for members in teams.values() for member in members], ['display_order'], batch_size=500,
    )


def reset_display_order(apps, schema_editor):
    apps.get_model('staff', 'StaffTeamMember').objects.using(schema_editor.connection.alias).update(display_order=0)


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0008_staffteam_display_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='staffteammember',
            name='display_order',
            field=models.PositiveIntegerField(default=0, help_text='Lower numbers appear first within the team.'),
        ),
        migrations.AlterModelOptions(
            name='staffteammember',
            options={'ordering': ('display_order', 'id')},
        ),
        migrations.RunPython(initialise_display_order, reset_display_order),
    ]
