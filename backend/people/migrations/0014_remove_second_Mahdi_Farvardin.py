from django.db import migrations

def get_extra_staff(team):
    for staff in team.staff.all():
        if not staff.picture.startswith('media'):
            return staff
    
    return None

def forwards(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')

    wss = WSS.objects.get(year=2020)

    team = HoldingTeam.objects.get(wss=wss, name='Content')
    extra_staff = get_extra_staff(team)
    
    if extra_staff is not None:
        team.staff.remove(extra_staff)
        team.save()


def rollback(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0013_update_holding_teams_2020'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
