from __future__ import unicode_literals
from django.db import migrations
from django.db.models import F


def forwards(apps, schema_editor):
    Staff = apps.get_model("people", "Staff")
    HoldingTeam = apps.get_model("people", "HoldingTeam")
    ContentType = apps.get_model("contenttypes", "ContentType")

    ctype = ContentType.objects.get_for_model(Staff)

    presentation_team = HoldingTeam.objects.get(
        wss__year=2020, name="Presentation Management"
    )
    # presentation_team.staff.all().update(order=F("order") + 1)
    new_staff = Staff.objects.create(
        name="Kianoosh Abbasi",
        picture="media/2020/staff/Kianoosh-Abbasi.jpg",
        polymorphic_ctype=ctype,
        order=5,  # waiting for order
    )
    presentation_team.staff.add(new_staff)


def rollback(apps, schema_editor):
    HoldingTeam = apps.get_model("people", "HoldingTeam")

    presentation_team = HoldingTeam.objects.get(
        wss__year=2020, name="Presentation Management"
    )
    presentation_team.staff.filter(name="Kianoosh Abbasi").delete()
    # presentation_team.staff.all().update(order=F("order") - 1)


class Migration(migrations.Migration):

    dependencies = [
        ("people", "0030_add_and_update_speakers"),
    ]

    operations = [migrations.RunPython(forwards, rollback)]
