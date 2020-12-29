from django.db import migrations
from django.db.models import F

def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    HoldingTeam = apps.get_model('people', 'HoldingTeam')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    staff_ctype = ContentType.objects.get_for_model(Staff)

    technical_team = HoldingTeam.objects.get(wss__year=2020, name='Technical')
    newstaff = Staff.objects.create(
        name='Hamed AliMohammadZadeh',
        picture='media/2020/staff/Hamed-AliMohammadZadeh.jpg',
        polymorphic_ctype=staff_ctype
    )
    technical_team.staff.add(newstaff)

    technincal_new_orders = {
        'Hamed AliMohammadZadeh': 4,
        'Alireza Tajmir Riahi': 5,
        'Fatemeh Khashei': 6,
        'Seyed Alireza Hashemi': 7,
        'Mohammad Mehdi Barghi': 8
    }

    for name in technincal_new_orders:
        technical_team.staff.filter(name=name).update(order=technincal_new_orders[name])


def rollback(apps, schema_editor):
    HoldingTeam = apps.get_model('people', 'HoldingTeam')

    technical_team = HoldingTeam.objects.get(wss__year=2020, name='Technical')
    technical_team.staff.filter(name='Hamed AliMohammadZadeh').delete()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0028_update_speaker_name'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
