from django.db import migrations


def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    ctype = ContentType.objects.get_for_model(Speakers)

    Speakers.objects.create(
        name='Hamed Hassani',
        degree='Ph.D.',
        place='assistant professor  at the University of Pennsylvania.',
        bio='Hamed Hassani is currently an assistant professor of Electrical and Systems Engineering department at the University of Pennsylvania. Prior to that, he was a research fellow at Simons Institute for the Theory of Computing (UC Berkeley) affiliated with the program of Foundations of Machine Learning, and a post-doctoral researcher in the Institute of Machine Learning at ETH Zurich. He received a Ph.D. degree in Computer and Communication Sciences from EPFL, Lausanne. He is the recipient of the 2014 IEEE Information Theory Society Thomas M. Cover Dissertation Award, 2015 IEEE International Symposium on Information Theory Student Paper Award, 2017 Simons-Berkeley Fellowship, 2018 NSF-CRII Research Initiative Award, 2020 Air Force Office of Scientific Research (AFOSR) Young Investigator Award, 2020 Intel Rising Star Faculty award, and 2020 National Science Foundation (NSF) CAREER Award.',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Hamed-Hassani.jpg',
    )
    Speakers.objects.create(
        name='Nassir Navab',
        degree='Ph.D.',
        place='full Professor and Laboratory Director, Technical University of Munich and Johns Hopkins University.',
        bio='Nassir Navab is a full Professor and Director of the Laboratory for Computer Aided Medical Procedures, Technical University of Munich and Johns Hopkins University. He has also secondary faculty appointments at both affiliated Medical Schools. He completed his PhD at INRIA and University of Paris XI, France, and enjoyed two years of post-doctoral fellowship at MIT Media Laboratory before joining Siemens Corporate Research (SCR) in 1994. At SCR, he was a distinguished member and received the Siemens Inventor of the Year Award in 2001. He received the SMIT Society Technology award in 2010 for introduction of Camera Augmented Mobile C-arm and Freehand SPECT technologies, and the ‘10 years lasting impact award’ of IEEE ISMAR in 2015. In 2012, he was elected as a Fellow of the MICCAI Society. He has acted as a member of the board of directors of the MICCAI Society, 2007-2012 and 2014-2017, and serves on the Steering committee of the IEEE Symposium on Mixed and Augmented Reality (ISMAR) and Information Processing in Computer Assisted Interventions (IPCAI). He is the author of hundreds of peer reviewed scientific papers, with more than 37160  citations and an h-index of 88 as of December  17, 2020. He is author of more than thirty awarded papers including 11 at MICCAI, 5 at IPCAI and three at IEEE ISMAR. He is the inventor of 50 granted US patents and more than 50 International ones. His current research interests include medical augmented reality, computer-aided surgery, medical robotics, and machine learning, for more information see https://www.medicalaugmentedreality.org/ and  http://campar.in.tum.de/WebHome).',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Nassir-Navab.jpg',
    )
    Speakers.objects.create(
        name='Soheil Behnezhad',
        degree='Ph.D.',
        place='PhD candidate at the University of Maryland',
        bio='Soheil Behnezhad is a PhD candidate at the University of Maryland. His research focus is on the foundations of big data algorithms --- that is, he studies algorithms whose resources (such as time and space) are sublinear in the input size. Soheil is a recipient of Google PhD Fellowship in Algorithms, has been a visiting graduate student at the Simons Institute of UC Berkeley, and has worked as a  Research Intern at Google Research, Upwork, and TTIC.',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Soheil-Behnezhad.jpg',
    )
    Speakers.objects.create(
        name='Shayan Oveis Gharan',
        degree='Ph.D.',
        place='associate professor at University of Washington',
        bio='Shayan Oveis Gharan is an associate professor in the Paul Allen School of Computer Science and Engineering at University of Washington. He received his PhD from the Management Science and Engineering department at Stanford University in 2013 with Amin Saberi and Luca Trevisan. Before joining UW he spent one and a half years as a postdoctoral Miller Fellow at UC Berkeley. Shayan\'s research exploits several tools in Mathematics such as theory of real stable and log-concave polynomials, and spectral graph theory to design and analyze algorithms for discrete objects.',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Shayan-Oveis-Gharan.jpg',
    )
    

def rollback(apps, schema_editor):
    Speaker = apps.get_model('people', 'Speaker')
    Seminar = apps.get_model('events', 'Seminar')
    names = [
        'Hamed Hassani',
        'Nassir Navab',
        'Soheil Behnezhad',
        'Shayan Oveis Gharan'
    ]
    speakers = Speaker.objects.filter(name__in=names)
    Seminar.objects.filter(speaker__in=speakers).delete()
    speakers.delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0026_add_some_staff'),
        ('WSS', '0015_wss_participant_workshop_limit'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]
