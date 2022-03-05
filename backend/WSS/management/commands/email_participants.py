from django.core.management.base import BaseCommand, CommandError
from WSS.models import WSS
import threading
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

        ps = [('a.a.ghanati@gmail.com', 'علی'),
              ('farzamzohdi@gmail.com', 'فرزام')]
        for p in ps:
            print(p)
            send_mail(
                'SURVEY', '...',
                settings.EMAIL_HOST_USER,
                [p[0]],
                fail_silently=False,
                html_message=PERSIAN_BASE_HTML_CONTENT.format(
                    SURVEY_EMAIL.format(
                        p[1])
                )
            )
