from django.conf import settings
from django.db import models

# Create your models here.
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail

from templates.consts import *  


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    base_url = 'https://sharif-wss.ir'  # TODO
    email_message = "{}{}?token={}".format(base_url, reverse('password_reset:reset-password-request'), reset_password_token.key)

    send_mail(
        RESET_PASSWORD_SUBJECT, 'text content',
        settings.EMAIL_HOST_USER,
        [reset_password_token.user.email],
        fail_silently=True,
        html_message=BASE_HTML_CONTENT.format(email_message)
    )