# -*- coding: utf-8 -*-
# Generated by Django 1.11.26 on 2020-10-22 19:47
from __future__ import unicode_literals
from django.db import migrations

def forwards(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    Staff.objects.create(
        name='Alireza Ilami',
        picture='media/2020/staff/Alireza-Ilami.jpg'
    )
    Staff.objects.create(
        name='Mehdi Farvardin',
        picture='media/2020/staff/Mehdi-Farvardin.jpg'
    )
    Staff.objects.create(
        name='Hossein Firooz',
        picture='media/2020/staff/Hossein-Firooz.jpg'
    )
    Staff.objects.create(
        name='Sepehr Amini Afshar',
        picture='media/2020/staff/Sepehr-Amini Afshar.jpg'
    )
    Staff.objects.create(
        name='Farzam Zohdinasab',
        picture='media/2020/staff/Farzam-Zohdinasab.jpg'
    )
    Staff.objects.create(
        name='Pooya Moeini',
        picture='media/2020/staff/Pooya-Moeini.jpg'
    )
    Staff.objects.create(
        name='Seyed Mohammad mehdi Hatami',
        picture='media/2020/staff/Seyed-Mohammad-mehdi-Hatami.jpg'
    )
    Staff.objects.create(
        name='Emran Batmanghelich',
        picture='media/2020/staff/Emran-Batmanghelich.jpg'
    )
    Staff.objects.create(
        name='Ahmad Salimi',
        picture='media/2020/staff/Ahmad-Salimi.jpg'
    )
    Staff.objects.create(
        name='Ali asghar Ghanati',
        picture='media/2020/staff/Ali-asghar-Ghanati.jpg'
    )
    Staff.objects.create(
        name='Fatemeh Khashei',
        picture='media/2020/staff/Fatemeh-Khashei.jpg'
    )
    Staff.objects.create(
        name='Alireza Tajmir riahi',
        picture='media/2020/staff/Alireza-Tajmir-riahi.jpg'
    )
    Staff.objects.create(
        name='Mohammad mehdi Barghi',
        picture='media/2020/staff/Mohammad-mehdi-Barghi.jpg'
    )
    Staff.objects.create(
        name='Seyed Alireza Hashemi',
        picture='media/2020/staff/Seyed-Alireza-Hashemi.jpeg'
    )
    Staff.objects.create(
        name='Amirhossein Hadian',
        picture='media/2020/staff/Amirhossein-Hadian.jpg'
    )
    Staff.objects.create(
        name='Amirmohammad Imani',
        picture='media/2020/staff/Amirmohammad-Imani.jpg'
    )
    Staff.objects.create(
        name='Sajjad Rezvani',
        picture='media/2020/staff/Sajjad-Rezvani.jpg'
    )
    Staff.objects.create(
        name='Shima Ramadani',
        picture='media/2020/staff/Shima-Ramadani.jpg'
    )
    Staff.objects.create(
        name='Mehdi Jalali',
        picture='media/2020/staff/Mehdi-Jalali.jpg'
    )
    Staff.objects.create(
        name='Seyed Alireza Hosseini',
        picture='media/2020/staff/Seyed-Alireza-Hosseini.jpg'
    )
    Staff.objects.create(
        name='Sara Azarnoosh',
        picture='media/2020/staff/Sara-Azarnoosh.jpg'
    )
    Staff.objects.create(
        name='Dorna Dehghani',
        picture='media/2020/staff/Dorna-Dehghani.jpg'
    )
    Staff.objects.create(
        name='Ghazal Shenavar',
        picture='media/2020/staff/Ghazal-Shenavar.jpg'
    )
    Staff.objects.create(
        name='Helia Akhtarkavian',
        picture='media/2020/staff/Helia-Akhtarkavian.jpg'
    )
    Staff.objects.create(
        name='Sabiheh Tajdari',
        picture='media/2020/staff/Sabiheh-Tajdari.jpg'
    )
    Staff.objects.create(
        name='Sahel Messforoosh',
        picture='media/2020/staff/Sahel-Messforoosh.jpg'
    )
    Staff.objects.create(
        name='Esmaeil Pahang',
        picture='media/2020/staff/Esmaeil-Pahang.jpg'
    )
    Staff.objects.create(
        name='Hamila Meili',
        picture='media/2020/staff/Hamila-Meili.jpg'
    )
    Staff.objects.create(
        name='Mahdieh Ebrahimpoor',
        picture='media/2020/staff/Mahdieh-Ebrahimpoor.jpg'
    )
    Staff.objects.create(
        name='Roya Aghvami',
        picture='media/2020/staff/Roya-Aghvami.jpg'
    )
    Staff.objects.create(
        name='Sara Zahedi',
        picture='media/2020/staff/Sara-Zahedi.jpg'
    )
    Staff.objects.create(
        name='Hossein Aghamohammadi',
        picture='media/2020/staff/Hossein-Aghamohammadi.jpg'
    )
    Staff.objects.create(
        name='Vahid Zehtab',
        picture='media/2020/staff/Vahid-Zehtab.jpg'
    )
    Staff.objects.create(
        name='Amirhossein Asem Yousefi',
        picture='media/2020/staff/Amirhossein-Asem-Yousefi.jpg'
    )
    Staff.objects.create(
        name='Alireza Ziaei',
        picture='media/2020/staff/Alireza-Ziaei.jpg'
    )
    Staff.objects.create(
        name='Ehsan Movafagh',
        picture='media/2020/staff/Ehsan-Movafagh.jpg'
    )
    Staff.objects.create(
        name='ArhsiA Akhavan',
        picture='media/2020/staff/ArhsiA-Akhavan.jpg'
    )
    Staff.objects.create(
        name='Fatemeh Asgari',
        picture='media/2020/staff/Fatemeh-Asgari.jpg'
    )

def rollback(apps, schema_editor):
    Staff = apps.get_model('people', 'Staff')
    Staff.objects.filter(
        name_in=[
            'Alireza Ilami',
            'Mehdi Farvardin',
            'Hossein Firooz',
            'Sepehr Amini Afshar',
            'Farzam Zohdinasab',
            'Pooya Moeini',
            'Seyed Mohammad mehdi Hatami',
            'Emran Batmanghelich',
            'Ahmad Salimi',
            'Ali asghar Ghanati',
            'Fatemeh Khashei',
            'Alireza Tajmir riahi',
            'Mohammad mehdi Barghi',
            'Seyed Alireza Hashemi',
            'Amirhossein Hadian',
            'Amirmohammad Imani',
            'Sajjad Rezvani',
            'Shima Ramadani',
            'Mehdi Jalali',
            'Seyed Alireza Hosseini',
            'Sara Azarnoosh',
            'Dorna Dehghani',
            'Ghazal Shenavar',
            'Helia Akhtarkavian',
            'Sabiheh Tajdari',
            'Sahel Messforoosh',
            'Esmaeil Pahang',
            'Hamila Meili',
            'Mahdieh Ebrahimpoor',
            'Roya Aghvami',
            'Sara Zahedi',
            'Hossein Aghamohammadi',
            'Vahid Zehtab',
            'Amirhossein Asem Yousefi',
            'Alireza Ziaei',
            'Ehsan Movafagh',
            'ArshiA Akhavan',
            'Fatemeh Asgari'
        ]
    ).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('people', '0003_fill_speakers_data'),
    ]

    operations = [
        migrations.RunPython(forwards, rollback)
    ]