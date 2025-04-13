import logging
import os
import shutil
import subprocess
import tempfile

from django.conf import settings
from django.contrib import admin
from django.contrib import messages
from django.core.files.base import ContentFile
from django.db import close_old_connections, transaction
from concurrent.futures import ThreadPoolExecutor

from certificate.models import Certificate
from participant.models import Participant, Participation

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def prepare_latex_template(data, tex_template):
    """Replace placeholders in the LaTeX template with actual data."""
    for key, value in data.items():
        tex_template = tex_template.replace(f"\\VAR{{{key}}}", str(value))
    return tex_template


def create_cert(template, participation, data):
    close_old_connections()

    prepared_latex = prepare_latex_template(data, template)

    with tempfile.TemporaryDirectory() as tmpdirname:
        tex_path = os.path.join(tmpdirname, 'document.tex')

        # resource_dir = os.path.join(settings.BASE_DIR, 'certificate', 'resources')
        # background_image_path = os.path.join(resource_dir, 'background.png')
        #
        # shutil.copy(background_image_path, os.path.join(tmpdirname, 'background.png'))

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
            logger.error(f"Error output:\n{e.output}")
            return
        except subprocess.CalledProcessError as e:
            logger.info(f"Compilation failed for certificate {participation.id}!")
            logger.error(f"Error output:\n{e.stderr}")
            return

        pdf_path = os.path.join(tmpdirname, 'document.pdf')
        if not os.path.exists(pdf_path):
            logger.error(f"PDF not created for participation {participation.id}")
            return

        with open(pdf_path, 'rb') as pdf_file:
            pdf_content = pdf_file.read()

        try:
            with transaction.atomic():
                cert = Certificate(participation=participation)
                cert.certificate.save(
                    f'certificate_{participation.participant.user.id}_{participation.id}.pdf',
                    ContentFile(pdf_content)
                )
                cert.save()
                logger.info(f"Certificate saved for participation {participation.id}")
        except Exception as e:
            logger.error(f"Error saving certificate for participation {participation.id}: {e}")


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
                    'plan_name': participation.plan,
                }

                if 'In Person' == participation.plan.mode_of_attendance.name:
                    data['national_code'] = participant.info.national_code

                participation_data_pairs.append((participation, data))

    close_old_connections()

    with ThreadPoolExecutor() as executor:
        futures = [
            executor.submit(create_cert, template_content, participation, data)
            for participation, data in participation_data_pairs
        ]
        for future in futures:
            future.result()

    messages.success(request, f"Created {len(participation_data_pairs)} certificates.")


admin.site.register(Certificate)
