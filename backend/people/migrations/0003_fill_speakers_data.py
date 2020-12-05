# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations

def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.create(
        name='Shahram Ghandeharizadeh',
        degree='Ph.D.',
        place='on the faculty at the University of Southern California',
        bio='Shahram Ghandeharizadeh received his Ph.D. degree in Computer Science from the University of Wisconsin, Madison, in 1990. Since then, he has been on the faculty at the University of Southern California.  His research interests include design, implementation and evaluation of novel architectures for high performance data intensive applications, multimedia based social networking systems, parallel database systems, and cache augmented databases.  His research has been recognized with a variety of awards including the NSF Young Investigator award and the ACM Software System Award.  He has served on the organizing committees of numerous conferences; most recently as the general chair of VLDB 2019 and the general co-chair of FAB 2020.  He is the current chair of the steering committee of the ACM Symposium on Cloud Computing.'
    )
    Speakers.objects.create(
        name='Rad Niazadeh',
        degree='Ph.D.',
        place='Assistant Professor at the University of Chicago Booth School of Business',
        bio='Rad Niazadeh is an Assistant Professor of Operations Management at the University of Chicago Booth School of Business. He studies the interplay between algorithms, incentives and learning. He is mostly inserted in advancing the theoretical methodologies and foundations of market design and revenue management, and applying these methodologies to design faster and more efficient online marketaffiliations and e-commerce platforms. Prior to joining Booth, he was a Motwani postdoctoral fellow at Stanford University, Department of Computer Science, and a visiting faculty in the market algorithms group at Google Research NYC. He received his PhD in Computer Science from Cornell University. Rad has received the INFORMS Revenue Management and Pricing Dissertation Award (honorable mention), the Google PhD Fellowship in Market Algorithms, Stanford Motwani fellowship, and Cornell Jacobs fellowship.'
    )
    Speakers.objects.create(
        name='Amir Shaikhha',
        degree='Ph.D.',
        place=' Assistant Professor (Lecturer) at the University of Edinburgh',
        bio='Amir Shaikhha is an Assistant Professor (Lecturer) in the School of Informatics at the University of Edinburgh. His research focuses on the design and implementation of data-analytics systems by using techniques from the databases, programming languages, compilers, and machine learning communities.\nPrior to that, he was a Departmental Lecturer at Oxford. He earned his Ph.D. from EPFL in 2018, for which he was awarded a Google Ph.D. Fellowship in structured data analysis, as well as a Ph.D. thesis distinction award.'
    )
    Speakers.objects.create(
        name='Ehsan Kazemi',
        degree='Ph.D.',
        place='Research software engineer at Google',
        bio='Ehsan Kazemi is a Research software engineer at Google, Zurich. His main research interests are machine learning, data mining and applications of these fields in computational biology and social networks. He was a postdoctoral research fellow at Yale Institute for Network Science (YINS), Yale University from 2017 to 2020. He completed his PhD. at LCA4, EPF Lausanne. He received both his B.S. and M.S. degrees in Communication Systems from Sharif University of Technology. He won the NOKIA Mobile Data Challenge (MDC) on the Next place Prediction. He is the recipient of Swiss National Science Foundation (SNSF) Post-Doctoral Fellowship and two TATA Group research grants.'
    )
    Speakers.objects.create(
        name='Alexandre Alahi',
        degree='Ph.D.',
        place='Assistant Professor at EPFL',
        bio='Alexandre Alahi is currently an Assistant Professor at EPFL. He spent five years at Stanford University as a Post-doc and Research Scientist after obtaining his Ph.D. from EPFL. His research enables machines to perceive the world and make decisions in the context of transportation problems and smart environments. He has worked on the theoretical challenges and practical applications of socially-aware Artificial Intelligence, i.e., systems equipped with perception and social intelligence. He was awarded the Swiss NSF early and advanced researcher grants for his work on predicting human social behavior. He won the CVPR Open Source Award (2012) for his work on Retina-inspired image descriptors, and the ICDSC Challenge Prize (2009) for his sparsity-driven algorithm that has tracked more than 100 million pedestrians to date. His research has been covered internationally by BBC, abc, PBS, Euronews, Wall street journal, and other national news outlets around the world. Alexandre has also co-founded multiple startups such as Visiosafe, and won several startup competitions. He was elected as one of the Top 20 Swiss Venture leaders in 2010.'
    )
    Speakers.objects.create(
        name='Vijay Vazirani',
        degree='Ph.D.',
        place='Distinguished Professor at the University of California',
        bio='Vijay Vazirani got his Bachelor\'s degree in Computer Science from MIT in 1979 and his Ph.D. from the University of California at Berkeley in 1983. He is currently Distinguished Professor at the University of California, Irvine.\nVazirani has made seminal contributions to the theory of algorithms, in particular to the classical maximum matching problem, approximation algorithms and algorithmic game theory, as well as to complexity theory, in which he established, with Les Valiant, the hardness of unique solution instances of NP-complete problems. In 2001 he published what was widely regarded as the definitive book on Approximation Algorithms. This book has been translated into four languages. His research on algorithms for the maximum matching problem spans four decades and on market equilibria spans two decades. His current research interest is algorithms for matching markets. He is an ACM Fellow and a Guggenheim Fellow.'
    )
    Speakers.objects.create(
        name='Dorsa Sadigh',
        degree='Ph.D.',
        place='assistant professor at Stanford University',
        bio='Dorsa Sadigh is an assistant professor in Computer Science and Electrical Engineering at Stanford University.  Her research interests lie in the intersection of robotics, learning, and control theory. Specifically, she is interested in developing algorithms for safe and adaptive human-robot interaction. Dorsa has received her doctoral degree in Electrical Engineering and Computer Sciences (EECS) from UC Berkeley in 2017, and has received her bachelor’s degree in EECS from UC Berkeley in 2012.  She is awarded the NSF CAREER award, the AFOSR Young Investigator award, the IEEE TCCPS early career award, the Google Faculty Award, and the Amazon Faculty Research Award.'
    )
    Speakers.objects.create(
        name='Seyed-Mohsen Moosavi-Dezfooli',
        degree='Ph.D.',
        place='postdoctoral researcher at the ETH Zurich',
        bio='Seyed-Mohsen Moosavi-Dezfooli is a postdoctoral researcher in the Institute for Machine Learning at the ETH Zurich. His research interests broadly include machine learning, computer vision, and signal processing. Currently, his research focuses on understanding the geometric inductive bias of deep architectures, including their behavior in adversarial settings. Seyed-Mohsen received a PhD in Computer and Communication Sciences under the supervision of Prof. Pascal Frossard at the EPFL, Switzerland. During his PhD, he interned for the Apple AI Research in 2017, where he worked on autonomous technologies. He obtained his MSc from the EPFL in 2014, and his BSc from Amirkabir University of Technology, Iran, in 2012.'
    )
    Speakers.objects.create(
        name='Mohammad Hossein Rohban',
        degree='Ph.D.',
        place='assistant professor at Sharif University of Technology',
        bio='Mohammad Hossein Rohban received his BS, MS ad PhD degrees in Computer Engineering from Sharif University of Technology. Currently, he is an assistant professor in the Department of Computer Engineering at Sharif University of Technology. His current research interests include interpretable and robust machine learning, anomaly detection, and computational Biology. He previously spent three years as a postdoctoral associate at the Broad In- stitute of Harvard and MIT and focused on various problems at the intersection of machine learning and image-based computational Biology, where he published several pres- tigious papers on the mentioned subjects in the relevant journals.'
    )
    Speakers.objects.create(
        name='Mehrdad Farajtabar',
        degree='Ph.D.',
        place='research scientist at Google DeepMind',
        bio='Mehrdad Farajtabar is a research scientist at Google DeepMind working on machine learning and applications. His recent research interests are continual learning of neural networks, learning under evolving data distributions, causal inference and reinforcement learning. He has graduated with PhD in computational science and engineering from Georgia Tech in 2018 and holds M.Sc. and B.Sc. degrees in Artificial Intelligence and Software Engineering from Sharif University of Technology.'
    )

def rollback(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    Speakers.objects.filter(name__in=['Shahram Ghandeharizadeh', 'Rad Niazadeh', 'Amir Shaikhha', 'Ehsan Kazemi', 'Alexandre Alahi', 'Vijay Vazirani', 'Dorsa Sadigh', 'Seyed-Mohsen Moosavi-Dezfooli', 'Mohammad Hossein Rohban', 'Mehrdad Farajtabar']).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0002_auto_20201112_1807'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
