import logging
import os
import subprocess
import tempfile

from django.conf import settings
from django.contrib import admin
from django.contrib import messages
from django.core.files.base import ContentFile
from concurrent.futures import ProcessPoolExecutor


from certificate.models import Certificate
from participant.models import Participant, Participation


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def prepare_latex_template(data, tex_template):
    """Replace placeholders in the LaTeX template with actual data."""
    for key, value in data.items():
        tex_template = tex_template.replace(f"\\VAR{{{key}}}", value)
    return tex_template


def create_cert(template, participation, data):
    prepared_latex = prepare_latex_template(data, template)

    with tempfile.TemporaryDirectory() as tmpdirname:
        tex_path = os.path.join(tmpdirname, 'document.tex')

        with open(tex_path, 'w', encoding='utf-8') as tex_file:
            tex_file.write(prepared_latex)

        try:
            subprocess.run(
                ['xelatex', '-output-directory', tmpdirname, tex_path],
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                timeout=60
            )
            logger.info(f"Certificate {participation.id} compiled successfully.")
        except subprocess.TimeoutExpired as e:
            logger.info(f"Compilation timed out for certificate {participation.id}!")
            logger.error(f"Error output:\n{e.stderr}")
            return
        except subprocess.CalledProcessError as e:
            logger.info(f"Compilation failed for certificate {participation.id}!")
            logger.error(f"Error output:\n{e.stderr}")
            return

        pdf_path = os.path.join(tmpdirname, 'document.pdf')
        with open(pdf_path, 'rb') as pdf_file:
            pdf_content = pdf_file.read()

        cert = Certificate(participation=participation)
        cert.certificate.save(f'certificate_{participation.participant.user.id}_{participation.id}.pdf',
                              ContentFile(pdf_content))
        cert.save()


def generate_certificates_for_users(modeladmin, request, queryset):
    resource_dir = os.path.join(settings.BASE_DIR, 'certificate', 'resources')
    template_path = os.path.join(resource_dir, 'main.tex')

    with open(template_path, 'r', encoding='utf-8') as file:
        template_content = file.read()

    participation_data_pairs = []

    for user in queryset:
        try:
            participant = Participant.objects.get(user=user)
        except Participant.DoesNotExist:
            continue

        participations = Participation.objects.filter(participant=participant)
        for participation in participations:
            if not Certificate.objects.filter(participation=participation).exists():
                data = {
                    'participation_id': participation.id,
                    'first_name': participant.info.first_name if participant.info else '',
                    'last_name': participant.info.last_name if participant.info else '',
                    'plan_name': participation.plan.name,
                }

                if 'In Person' in participation.plan.mode_of_attendance:
                    data['national_code'] = participant.info.national_code

                participation_data_pairs.append((participation, data))

    with ProcessPoolExecutor() as executor:
        futures = [
            executor.submit(
                create_cert,
                template_content,
                participation,
                data,
            )
            for participation, data in participation_data_pairs
        ]

        for future in futures:
            future.result()

    messages.success(request, f"Created {len(participation_data_pairs)} certificates.")


admin.site.register(Certificate)
