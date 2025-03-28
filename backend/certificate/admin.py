from django.contrib import admin
from django.contrib import messages
from django.core.files.base import ContentFile

from certificate.models import Certificate
from participant.models import Participant, Participation


def create_cert(data):
    # TODO: implement
    pass


def generate_certificates_for_users(modeladmin, request, queryset):
    created_count = 0

    for user in queryset:
        try:
            participant = Participant.objects.get(user=user)
        except Participant.DoesNotExist:
            continue

        participations = Participation.objects.filter(participant=participant)
        for participation in participations:
            if not Certificate.objects.filter(participation=participation).exists():
                data = {
                    'first_name': participant.info.first_name if participant.info else '',
                    'last_name': participant.info.last_name if participant.info else '',
                    'plan_name': participation.plan.name,
                    # TODO: Add more dynamic fields as needed
                }

                pdf_bytes = create_cert(data)

                cert = Certificate(participation=participation)
                cert.certificate.save(f'certificate_{user.id}_{participation.id}.pdf', ContentFile(pdf_bytes))
                cert.save()
                created_count += 1

    messages.success(request, f"Created {created_count} certificates.")


admin.site.register(Certificate)
