from django.db import migrations


def forwards(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    Staff = apps.get_model('people', 'Staff')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2020)

    ordered_holding_teams = [
        'Content',
        'Technical',
        'Network',
        'Branding',
        'Social',
        'Media',
        'Presentation Management'
    ]

    HoldingTeam.objects.filter(wss=wss, name='Event Director').update(name='Manager & Director')

    ctype = ContentType.objects.get_for_model(Staff)

    Staff.objects.create(
        polymorphic_ctype=ctype,
        name='Shayan Oveis gharan',
        picture='media/2020/staff/Shayan-Oveis-gharan.jpg'
    )

    scientific = HoldingTeam.objects.create(wss=wss, name='Scientific Secretary', order=2)
    scientific.staff.add(Staff.objects.get(name='Shayan Oveis gharan'))

    for i, team_name in enumerate(ordered_holding_teams):
        HoldingTeam.objects.filter(wss=wss, name=team_name).update(order=i+3)


def rollback(apps, schema_editor):
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    HoldingTeam.objects.filter(wss__year=2020, name='Scientific Secretary').delete()

    Staff = apps.get_model('people', 'Staff')
    Staff.objects.get(
        name='Shayan Oveis gharan'
    ).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0016_fill_more_speakers_data_2020'),
    ]

    operations = [
        migrations.RunPython(forwards)
    ]
