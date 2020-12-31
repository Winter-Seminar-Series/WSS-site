from django.db import migrations


def forwards(apps, schema_editor):
    Speakers = apps.get_model('people', 'Speaker')
    ContentType = apps.get_model('contenttypes', 'ContentType')

    ctype = ContentType.objects.get_for_model(Speakers)

    Speakers.objects.create(
        name='Ali Sharifi-Zarchi',
        degree='Ph.D.',
        place='Computer Engineering Department, Sharif University of Technology',
        bio='Ali Sharifi-Zarchi is currently a faculty member of Bioinformatics and AI in Computer Engineering Department, Sharif University of Technology, and also Chief Technology Officer of PardisGene, a leading company of precision genomics in Tehran. He received his B.Sc. and M.Sc. of Software Engineering from the same department, and Ph.D. of Bioinformatics from University of Tehran. He conducted bioinformatics research at the Max Planck Institute of Molecular Biomedicine, and Computer Science Department, CSU. He was also a PI of Bioinformatics lab at Royan institute of Stem Cell Biology and Technology. Ali has been a gold medal winner of the International Olympiad of Informatics (IOI). He has been the chair, and currently an elected member of the International Scientific Committee of the IOI.',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Ali-Sharifi-Zarchi.jpg',
    )
    Speakers.objects.create(
        name='Fatemeh Nejatbakhshesfahani',
        degree='Dr. rer.',
        place='Ludwig Maximilian University of Munich',
        bio='Fatemeh Nejatbakhsh currently works at Infineon Technologies, AG head quarter in Munich, Germany as a verification engineer/software developer and project owner. She worked at the Department of Neuroradiology at LMU as a research scientist and she finished her Ph. D. Working on multimodal image processing using MRI data. She was a former visiting researcher at Columbia University in New York City, USA. Fatemeh does research in developing methods for medical image processing for medical devices and products. She got the YIP award from Infineon Technologies in 2019 and she received the international students scholarship in 2015 from TUM. She was invited as an invited lecturer at Harvard Medical School and Weill Cornell Medicine College during her Ph.D.',
        polymorphic_ctype=ctype,
        picture='media/2020/speakers/Fatemeh-Nejatbakhsh.jpg',
    )
    
    Speakers.objects.filter(name='Soheil Behnezhad').update(degree='Ph.D. Candidate')
    

def rollback(apps, schema_editor):
    Speaker = apps.get_model('people', 'Speaker')
    Seminar = apps.get_model('events', 'Seminar')
    names = [
        'Ali Sharifi-Zarchi',
        'Fatemeh Nejatbakhshesfahani'
    ]
    speakers = Speaker.objects.filter(name__in=names)
    Seminar.objects.filter(speaker__in=speakers).delete()
    speakers.delete()
    
    Speaker.objects.filter(name='Soheil Behnezhad').update(degree='Ph.D.')

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0029_update_some_staff'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]