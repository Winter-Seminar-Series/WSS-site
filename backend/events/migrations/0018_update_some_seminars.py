from django.db import migrations
from datetime import datetime, timedelta


def forwards(apps, schema_editor):
    Seminar = apps.get_model('events', 'Seminar')
    WSS = apps.get_model('WSS', 'WSS')
    Speaker = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    wss = WSS.objects.get(year=2020)
    ctype = ContentType.objects.get_for_model(Seminar)
    room_url_pattern = "https://vclass.ecourse.sharif.edu/ch/ssc-{}"

    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Dynamic Management of Social Distancing in COVID-19 Pandemic',
        abstract='COVID-19 raised many efforts worldwide in using IT, AI and Data Science solutions in order to help control the spread of the disease. Mask, the Iranian COVID-19 app which is developed by a volunteer team of students and profs from Sharif University of Technology and other universities, pioneered in employing several strategies, including digital contact tracing, symptoms check and  precision maps of the pandemic in Iran. We also developed strategies for dynamic management of social distancing restrictions, that were followed at nationwide scale and shown effective in controlling the third peak of the disease in Iran.',
        speaker=Speaker.objects.filter(name='Ali Sharifi-Zarchi').last()
    )
    Seminar.objects.create(
        wss=wss,
        polymorphic_ctype=ctype,
        title='Inner ear fluid investigation, A quantitative approach',
        audience='Machine learning and medical image processing interests',
        abstract='Intravenous contrast agent-enhanced magnetic resonance imaging of the endolymphatic space (ELS) of the inner ear permits direct, in-vivo, non-invasive visualization of labyrinthine structures and thus verification of endolymphatic hydrops (ELH). However, current volumetric assessment approaches lack normalization. The aim of this study was to develop a probabilistic atlas of the inner ear’s bony labyrinth as a first step towards an automated and reproducible volume-based quantification of the ELS. The study included three different datasets: a source dataset (D1) to build the probabilistic atlas and two testing sets (D2, D3). D1 included 24 right-handed patients (12 females; mean age 51.5 ± 3.9 years) and D2 5 patients (3 female; mean age 48.8 ± 5.01 years) with vestibular migraine without ELH or any measurable vestibular deficits. D3 consisted of five patients (one female; mean age 46 ± 5.2 years) suffering from unilateral Menière’s disease and ELH. Data processing comprised three steps: preprocessing using an affine and deformable fusion registration pipeline, computation of an atlas for the left and right inner ear using a label-assisted approach, and validation of the atlas based on localizing and segmenting previously unseen ears. The three-dimensional probabilistic atlas of the inner ear’s bony labyrinth consisted of the internal acoustic meatus and inner ears (including cochlea, otoliths, and semicircular canals) for both sides separately. The analyses showed a high level of agreement between the atlas-based segmentation and the manual gold standard with an overlap of 89% for the right ear and 86% for the left ear (measured by dice scores). This probabilistic in vivo atlas of the human inner ear’s bony labyrinth and thus of the inner ear’s total fluid space for both ears represents a necessary step towards a normalized, easily reproducible and reliable volumetric quantification of the perilymphatic and endolymphatic space in view of MR volumetric assessment of ELH. The proposed atlas lays the groundwork for state-of-the-art approaches (e.g., deep learning) and will be provided to the scientific community.',
        speaker=Speaker.objects.filter(name='Fatemeh Nejatbakhshesfahani').last()
    )

    # Re-schedule
    base_date = datetime(2020, 12, 30)
    Seminar.objects.filter(wss=wss, speaker__name='Ehsan Kazemi')\
        .update(start_time=base_date + timedelta(days=2, hours=21) - timedelta(hours=3, minutes=30))
    Seminar.objects.filter(wss=wss, speaker__name='Mona Azadkia')\
        .update(start_time=base_date + timedelta(days=4, hours=17) - timedelta(hours=3, minutes=30))

    Seminar.objects.filter(wss=wss, speaker__name='Ali Sharifi-Zarchi')\
        .update(start_time=base_date + timedelta(days=2, hours=17) - timedelta(hours=3, minutes=30),
                link=room_url_pattern.format(2))  # duration ?
    Seminar.objects.filter(wss=wss, speaker__name='Fatemeh Nejatbakhshesfahani')\
        .update(start_time=base_date + timedelta(days=4, hours=18) - timedelta(hours=3, minutes=30),
                duration=50, link=room_url_pattern.format(4))

    Seminar.objects.filter(wss=wss, speaker__name='Soheil Behnezhad')\
        .update(title='Recent Advances in Large-Scale Graph Algorithms')


def rollback(apps, schema_editor):
    WSS = apps.get_model('WSS', 'WSS')
    Seminar = apps.get_model('events', 'Seminar')
    wss = WSS.objects.get(year=2020)

    titles = [
        'Dynamic Management of Social Distancing in COVID-19 Pandemic',
        'Inner ear fluid investigation, A quantitative approach',
    ]
    Seminar.objects.filter(wss=wss, title__in=titles).delete()

    base_date = datetime(2020, 12, 30)
    Seminar.objects.filter(wss=wss, speaker__name='Ehsan Kazemi')\
        .update(start_time=base_date + timedelta(days=1, hours=21))
    Seminar.objects.filter(wss=wss, speaker__name='Mona Azadkia')\
        .update(start_time=base_date + timedelta(days=1, hours=18))

    Seminar.objects.filter(wss=wss, speaker__name='Soheil Behnezhad')\
        .update(title='Big Data Algorithms for Fundamental Graph Problems')


class Migration(migrations.Migration):

    dependencies = [
        ('people', '0030_add_and_update_speakers'),
        ('events', '0017_convert_event_times_to_utc'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
