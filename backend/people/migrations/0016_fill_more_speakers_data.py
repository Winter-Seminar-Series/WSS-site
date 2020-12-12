# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations


def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    ctype = ContentType.objects.get_for_model(Speakers)

    Speakers.objects.create(
        name='Mostafa Rezazad',
        degree='Ph.D.',
        place='senior researcher at the Institute for Research in Fundamental Sciences',
        bio='Dr Mostafa Rezazad Received his Ph.D. from the National University of Singapore. Then he joined the CiSDeM group at SUTD university to work on applying AI in the Cybersecurity domain. Now, he is a senior researcher at the Institute for Research in Fundamental Sciences where he is pursuing his research in various directions in the Networking field.',
        polymorphic_ctype=ctype
    )
    Speakers.objects.create(
        name='Mehraveh Salehi',
        degree='Ph.D.',
        place='Chief Experience Officer at Summary Analytics Inc., Seattle, WA',
        bio='Mehraveh Salehi is the Chief Experience Officer at Summary Analytics Inc., Seattle, WA. She received her Ph.D. in Electrical Engineering from Yale University (2019), and her B.Sc. from Sharif University of Technology (2014).  Her research lies at the intersection of artificial and natural intelligence with a focus on submodularity and its applications in the human brain. She is the recipient of numerous awards including 1st place in the inter-ivy 3-Minute Thesis (3MT) Competition at the United Nations (2019), the Young Scientist Award at MICCAI (2017), and Yale Advanced Graduate Leadership Program (AGLP) fellowship (2016).',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammad Haft-Javaheiran',
        degree='Ph.D.',
        place='Bullock Postdoctoral Research Fellow at Wellman Center',
        bio='Mohammad Haft-Javaherian is Bullock Postdoctoral Research Fellow at Wellman Center, Harvard Medical School and MIT Computer Science & Artificial Intelligence Lab, where he works with Brett Bouma and Polina Golland. He received his Ph.D. in Biomedical engineering from Cornell University, where he worked with Nozomi Nishimura and Chris Schaffer and had close collaboration with Mert Sabuncu.',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohamad Kazem Shirani Faradonbeh',
        degree='Ph.D.',
        place='assistant professor at the University of Georgia.',
        bio='received the Ph.D. degree in Statistics from the University of Michigan in 2017, and the B.Sc. degree in Electrical Engineering from Sharif University of Technology in 2012. He is currently an assistant professor of data science in the Department of Statistics at the University of Georgia.',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Gholamali Aminian',
        degree='Ph.D.',
        place='Honorary Research Fellow at UCL',
        bio='Gholamali Aminian received the B.Sc. degree in electrical engineering from Amirkabir University, Tehran, Iran, in 2010, and M.Sc. and Ph.D degrees in electrical engineering from Sharif University of Technology, Tehran, Iran, in 2012 and 2017, respectively. He is awarded the Newton international Fellowship by Royal Society and he is now Honorary Research Fellow at UCL. His field of interest includes Machine Learning, wireless communication, and information theory.',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mojtaba Tefagh',
        degree='Ph.D.',
        place='assistant professor at Sharif University of Technology.',
        bio='Since joining Stanford University, Mojtaba has been involved with studies related to applications of convex optimization in systems biology. In 2019, Mojtaba wrote his dissertation on "applications of convex optimization in metabolic network analysis" under the supervision of Professor Stephen P. Boyd. Since 2020, Mojtaba has been working as an assistant professor at Sharif University of Technology.',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammad Dehghani',
        degree='Master',
        place='Tarbiat Modares University',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammad Fazeli',
        degree='Master',
        place='Sharif University of Technology',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammad Heydari',
        degree='Master',
        place='Tarbiat Modares University',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Maryam Sadat Eslami',
        degree='Master',
        place='Iran university of science and technology',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammad Mahdi Samiei',
        degree='Ph.D.',
        place='Sharif University of Technology',
        polymorphic_ctype=ctype,
    )
    Speakers.objects.create(
        name='Mohammadhossein Bahari',
        degree='Master',
        place='EPFL',
        polymorphic_ctype=ctype,
    )
    

def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=[
        'Mostafa Rezazad',
        'Mehraveh Salehi',
        'Mohammad Haft-Javaheiran',
        'Mohamad Kazem Shirani Faradonbeh',
        'Gholamali Aminian',
        'Mojtaba Tefagh',
        'Mohammad Dehghani',
        'Mohammad Fazeli',
        'Mohammad Heydari',
        'Maryam Sadat Eslami',
        'Mohammad Mahdi Samiei',
        'Mohammadhossein Bahari',
    ]).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0015_staff_order'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]