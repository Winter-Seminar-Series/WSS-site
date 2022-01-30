# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations

def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.create(
        name = 'Hamed Haddadi',
        picture = 'media/2020/speakers/Hamed-Haddadi.jpg',
        degree = 'PhD',
        place = 'Imperial College London',
        bio = '''Hamed is a Reader in Human-Centred Systems and the Director of Postgraduate Studies at the Dyson School of Design Engineering at The Faculty of Engineering, Imperial College London. He serves as a Security Science Fellow of the Institute for Security Science and Technology, leads the Systems and Algorithms Laboratory, and is an Academic Fellow of the Data Science Institute. . In his industrial role, he is a Visiting Professor and the Chief Scientist at Brave Software where he works on developing privacy-preserving analytics protocols. He is interested in User-Centred Systems, IoT, Applied Machine Learning, and Data Security & Privacy. He enjoys designing and building systems that enable better use of our digital footprint, while respecting users' privacy.


He studied for BEng/MSc/PhD at University College London and the University of Cambridge. He was a postdoctoral researcher at Max Planck Institute for Software Systems in Germany, and a postdoctoral research fellow at Department of Pharmacology, University of Cambridge and The Royal Veterinary College, University of London, followed by few years as a Lecturer and consequently Senior Lecturer in Digital Media at Queen Mary University of London. He has spent time working and collaborating with Brave Software, Intel Research, Microsoft Research, AT&T Research, Telefonica, and Sony Europe. When not in the lab, he prefers to be on a ski slope or in a kayak.'''
    )
    Speakers.objects.create(
        name = 'Pooya Hatami',
        picture = 'media/2020/speakers/Pooya-Hatami.jpg',
        degree = 'PhD, University of Chicago',
        place = 'CSE, Ohio State University',
        bio = '''Pooya Hatami is an assistant professor in the CSE department at the Ohio State University. His research interests are broadly in theoretical computer science, on topics such as randomness and pseudorandomness, communication complexity, analysis of Boolean functions, and additive combinatorics. He obtained his Ph.D. from the University of Chicago, where he was advised by Alexander Razborov and Madhur Tulsiani. Before joining OSU, he spent a few years as a postdoctoral researcher in the Institute for Advanced Study, DIMACS, and the University of Texas at Austin.''',
    )
    Speakers.objects.create(
        name = 'Amir Moradi',
        picture = 'media/2020/speakers/Amir-Moradi.jpg',
        degree = 'Prof.',
        place = 'University of Cologne, Germany',
        bio = '''Amir Moradi received the M.Sc. and Ph.D. degrees in computer engineering from Sharif University of Technology, Tehran, Iran, in 2004 and 2008 respectively. Afterwards, till 2015 he worked as a Post-Doctoral researcher at the chair for Embedded Security, Ruhr University Bochum, Germany. In 2016 after obtaining the Habilitation degree, he joined the faculty of Electrical Engineering and Information Technology at Ruhr University Bochum, and afterwards has become a professor at the same faculty. Since October 2021 he is a professor for IT Security at the Institute for Computer Science at the University of Cologne, Germany. His current research interests include physical security of embedded systems, passive and active physical attacks, and the corresponding countermeasures. To date, he has published over 140 peer-reviewed journal articles and conference papers, in both destructive and constructive aspects of side-channel analysis. He also served as Program Committee Member (and the Chair) of several security- and cryptography-related conferences and workshops.''',
    )
    Speakers.objects.create(
        name = 'Mohammad Hajiabadi',
        picture = 'media/2020/speakers/Mohammad-Hajiabadi.jpg',
        degree = 'PhD',
        place = 'Assistant Professor, University of Waterloo',
        bio = '''Mohammad Hajiabadi is an Assistant Professor of Computer Science at the University of Waterloo. Prior to that, he was an Assistant Professor in Computer Science at Pennsylvania State University. He was a postdoctoral researcher at UC Berkeley and the University of Virginia for three years. He received his PhD in Computer Science from the University of Victoria. His main research interests are in Foundations of Cryptography, and Theoretical Computer Science.''',
    )
    Speakers.objects.create(
        name = 'Soheil Abbasloo',
        picture = 'media/2020/speakers/Soheil-Abbasloo.jpg',
        degree = 'PhD',
        place = 'University of Toronto',
        bio = '''Soheil Abbasloo received a Ph.D. degree in electrical engineering from the New York University in 2020. Before his studies at NYU, he worked as a Network Protocol Designer and a Software Engineer for more than four years.  He is currently a postdoctoral fellow at the department of computer science, University of Toronto. His research is centered around congestion control, ultra-low latency networks, machine learning-assisted network design, scheduling and resource management, datacenter networks, and cellular networks.''',
    )

def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=['Pooya Hatami', 'Amir Moradi', 'Mohammad Hajiabadi', 'Soheil Abbasloo',]).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0032_fill_2019_speakers_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
