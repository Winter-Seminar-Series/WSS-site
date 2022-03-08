from django.core.management.base import BaseCommand
from WSS.models import WSS
from django.core.mail import send_mail
from django.conf import settings
from templates.consts import *


class Command(BaseCommand):
    help = 'sends an email to all participants of given year'

    def add_arguments(self, parser):
        parser.add_argument('year', type=int)

    def handle(self, *args, **options):
        year = options.get('year', 2021)
        wss = WSS.objects.get(year=year)

        # ps = [('a.a.ghanati@gmail.com', 'علی'),
        #       ('farzamzohdi@gmail.com', 'فرزام'),
        #       ('sheiramed@gmail.com', 'Sheima Ramedani'),
        #       ('arahmizad@gmail.com', 'Ali Rahmizad'),
        #       ('SoroushJahanzad@gmail.com', 'Soroush Jahanzad'),
        #       ('arshiamoghimi98@gmail.com', 'Arshia Moghimi'),
        #       ('pooyayou@gmail.com', 'Pooya Yousefi'),
        #       ('yasmin.kadkhodaei@gmail.com', 'Yasmin Kadkhodaei'),
        #       ('arian_z@rocketmail.com', 'arian zamani'),
        #       ('Mehrad_Milanloo@yahoo.com', 'Mehrad Milanloo'),
        #       (' hssoleymanmh@gmail.com', 'Mohammad Hossein Soleymani'),
        #       ('amirm137878@gmail.com', 'Amirmahdi Namjoo'),
        #       ('kkibian@gmail.com', 'Kian Bahadori'),
        #       ('mahdi.farvardin@gmail.com', 'Mahdi Farvardin'),
        #       ('imanm1381@gmail.com', 'Iman Mohammadi'),
        #       ('s.nazari80820@gmail.com', 'Soheil Nazari'),
        #       ('m.h.dolatabadi.a@gmail.com ', 'محمدحسین دولت‌آبادی '),
        #       ('ali.javanmard14@gmail.com ', 'علی جوانمرد'),
        #       ('ali.javanmard14@gmail.com ', 'Ali Javanmard '),
        #       ('mahdi_b7978@yahoo.com', 'MohammadMahdi Barghi'),
        #       ('dnya.nvb@gmail.com', 'Donya Navabi'),
        #       ('mhmmoshtaghi@gmail.com', 'Mohammad Moshtaghi'),
        #       ('Paradisez2001@gmail.com ', 'Pardis Zahraei'),
        #       ('ssrahimi2@gmail.com', 'سیاوش رحیمی شاطرانلو'),
        #       ('Tajdari996@gmail.com ', 'Sabiha Tajdari '),
        #       ('hyousefi1379@gmail.com ', ''),
        #       ('alizademhdi@gmail.com', 'mahdi alizade'),
        #       ('hesamsoleymani20@gmail.com', 'Hesam Soleymani'),
        #       ('behzadnabawi@gmail.com', 'Behzad Nabavi'),
        #       ('hastikarimi2002@gmail.com ', 'Hasti Karimi'),
        #       ('sarazm.2000@gmail.com', 'Sara Zahedi'),
        #       ('reihane.zohrabi@gmail.com', 'Reihane Zohrabi'),
        #       ('babashahnegar@gmail.com', 'Negar Babashah'),
        #       ('mohammad.abolnejadian@gmail.com', 'محمد ابول نژاديان '),
        #       ('farzamzohdi@gmail.com', 'farzam'),
        #       ('mobina.salimipanah@gmail.com', 'mobina'),
        #       ('mohammadali1379@gmail.com', 'MohammadAli MohammadKhani'),
        #       ('royadaneshi2001@gmail.com', 'Roya Daneshi'),
        #       ('sorousherafat@gmail.com', 'Soroush Sherafat'),
        #       ]
        for p in wss.participants.all():
            # print(p.user_profile.user.email)
            # print(p.user_profile.user.first_name)
            # print(p)
            send_mail(
                'SURVEY', '...',
                settings.EMAIL_HOST_USER,
                [p.user_profile.user.email],
                fail_silently=True,
                html_message=PERSIAN_BASE_HTML_CONTENT.format(
                    SURVEY_EMAIL.format(
                        p.user_profile.user.first_name)
                )
            )
