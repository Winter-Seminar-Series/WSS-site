from django.db import models

# Create your models here.
from django.conf import settings

from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created

from django.core.mail import send_mail
from templates.consts import *

''' Signal handlers should be placed somewhere which is automatically loaded (like here or models)
or be imported in ready() function in apps.py '''


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    base_url = 'https://wss.ce.sharif.edu/password-reset/confirm'
    reset_password_link = "{}/{}".format(base_url, reset_password_token.key)

    send_mail(
        RESET_PASSWORD_SUBJECT, 'text content',
        settings.EMAIL_HOST_USER,
        [reset_password_token.user.email],
        fail_silently=True,
        html_message=BASE_HTML_CONTENT.format(
            RESET_PASSWORD_EMAIL.format(reset_password_link))
    )
