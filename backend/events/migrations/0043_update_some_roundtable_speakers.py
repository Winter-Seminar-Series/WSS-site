from django.db import migrations


def forwards(apps, schema_editor):
    from datetime import datetime, timedelta
    RoundTable = apps.get_model('events', 'RoundTable')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')

    wss = WSS.objects.get(year=2021)

    rt = RoundTable.objects.get(
        wss=wss, subject='Ph.D. student\'s life - Academic life')
    rt.speakers.remove(Speaker.objects.filter(name='Amir Moradi').last())
    rt.save()

    rt = RoundTable.objects.get(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')
    rt.speakers.add(Speaker.objects.filter(name='Arash Pourdamghani').last())
    rt.save()


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    RoundTable = apps.get_model('events', 'RoundTable')
    Speaker = apps.get_model('people', 'Speaker')

    wss = WSS.objects.get(year=2021)

    rt = RoundTable.objects.get(
        wss=wss, subject='Ph.D. student\'s life - Academic life')
    rt.speakers.add(Speaker.objects.filter(name='Amir Moradi').last())
    rt.save()

    rt = RoundTable.objects.get(
        wss=wss, subject='Which one is for me? Masters or Ph.D.')
    rt.speakers.remove(Speaker.objects.filter(
        name='Arash Pourdamghani').last())
    rt.save()


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0043_add_a_new_roundtable_speaker'),
        ('events', '0042_fix_roundtable_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
