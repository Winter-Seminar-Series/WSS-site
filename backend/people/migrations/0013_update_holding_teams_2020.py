from django.db import migrations


def forwards(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    Staff = apps.get_model('people', 'Staff')

    wss = WSS.objects.get(year=2020)

    ordered_holding_teams = [
        'Technical',
        'Content',
        'Network',
        'Branding',
        'Social',
        'Media',
        'Presentation Management'
    ]

    # There's two Alireza Ilami because of a bug in previous migrations. So, one of them will be removed.
    Staff.objects.filter(name='Alireza Ilami').first().delete()

    director_team = HoldingTeam.objects.create(wss=wss, name='Event Director', order=1)
    director_team.staff.add(Staff.objects.get(name='Alireza Ilami'))


    for i, team_name in enumerate(ordered_holding_teams):
        HoldingTeam.objects.filter(wss=wss, name=team_name).update(order=i+2)
    

def rollback(apps, schema_editor):
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    HoldingTeam.objects.filter(wss__year=2020, name='Event Director').delete()


    

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0012_holdingteam_order'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
