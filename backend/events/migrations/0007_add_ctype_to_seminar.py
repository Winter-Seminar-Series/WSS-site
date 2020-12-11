from django.db import migrations
from django.contrib.contenttypes.models import ContentType


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')

    ctype = ContentType.objects.get_for_model(Seminar)
    Seminar.objects.filter(polymorphic_ctype__isnull=True).update(polymorphic_ctype=ctype)


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0011_fill_seminar_data'),
        ('events', '0006_add_default_to_keynote'),
    ]

    operations = [
        migrations.RunPython(forwards)
    ]
