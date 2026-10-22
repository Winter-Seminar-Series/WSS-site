import datetime

from django.db import migrations

# The real dates of each edition, by `order` (they match frontend/lib/editions.ts). Earlier rows carried
# placeholder dates (most said 2024-02-29) that leaked into the admin and Metabase.
EDITION_DATES = {
    3: ('2017-12-27', '2017-12-28'),
    4: ('2018-12-26', '2018-12-27'),
    5: ('2020-01-02', '2020-01-03'),
    6: ('2020-12-31', '2021-01-03'),
    7: ('2022-02-24', '2022-02-27'),
    8: ('2023-04-06', '2023-04-09'),
    9: ('2024-02-28', '2024-03-03'),
    10: ('2025-04-10', '2025-04-11'),
}


def correct_dates(apps, schema_editor):
    Event = apps.get_model('core', 'Event')
    for order, (start, end) in EDITION_DATES.items():
        Event.objects.filter(name='WSS', order=order).update(
            starting_date=datetime.date.fromisoformat(start),
            ending_date=datetime.date.fromisoformat(end),
        )


class Migration(migrations.Migration):
    """Data fix. One-way: the old values were wrong, so reversing leaves the corrected dates in place."""

    dependencies = [
        ('core', '0014_alter_postersessionimage_image_alter_speaker_image_and_more'),
    ]

    operations = [migrations.RunPython(correct_dates, migrations.RunPython.noop)]
