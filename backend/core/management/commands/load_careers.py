"""Load organizations and speakers' careers from a JSON file. Logos are uploaded in the admin, per organization.

    python manage.py load_careers careers.json            # add what is missing
    python manage.py load_careers careers.json --replace  # also overwrite current organizations and careers
    python manage.py load_careers careers.json --dry-run  # validate and report, change nothing

The file is content, not code, so it is not in the repository. Copy it into the container first:
`docker compose cp careers.json backend:/tmp/careers.json`, then run the command on `/tmp/careers.json`.

    {
      "organizations": {"sharif": {"name": "Sharif University of Technology"}, ...},
      "speakers": [{"name": "Exact Speaker Name", "current": "sharif", "career": ["sharif", ...]}, ...]
    }

`current` may be null; `career` lists organization keys in display order. Organizations are matched by name, so
re-running is safe: an existing organization keeps its row and its logo. A speaker whose current organization or career
was already set (in the admin, say) keeps it unless --replace. Every speaker row with the name is updated: someone who
spoke at several editions has a row per edition.
"""

import json
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from core.models import CareerStep, Organization, Speaker


class Command(BaseCommand):
    help = "Load organizations and speakers' careers from a JSON file."

    def add_arguments(self, parser):
        parser.add_argument('file', help='Path to the careers JSON file.')
        parser.add_argument('--replace', action='store_true', help='Overwrite what is already set.')
        parser.add_argument('--dry-run', action='store_true', help='Validate and report; change nothing.')

    def handle(self, *args, **options):
        organizations, speakers = self._read(Path(options['file']))

        if options['dry_run']:
            names = [spec['name'] for spec in organizations.values()]
            existing = Organization.objects.filter(name__in=names).count()
            self.stdout.write(
                f'{len(names) - existing} organizations to create, {len(speakers)} speakers to update.'
            )
            return

        updated = 0
        with transaction.atomic():
            rows = {
                key: Organization.objects.get_or_create(name=spec['name'])[0] for key, spec in organizations.items()
            }
            for spec in speakers:
                for speaker in Speaker.objects.filter(name=spec['name']):
                    updated += self._update(speaker, spec, rows, options['replace'])
        self.stdout.write(self.style.SUCCESS(f'{len(rows)} organizations ready, {updated} speaker rows updated.'))

    def _read(self, path: Path) -> tuple[dict, list]:
        """Parses and validates the whole file before anything is written."""
        try:
            data = json.loads(path.read_text(encoding='utf-8'))
            organizations, speakers = data['organizations'], data['speakers']
        except (OSError, ValueError, KeyError, TypeError) as error:
            raise CommandError(f'Cannot read {path}: {error}') from error

        missing = sorted({spec['name'] for spec in speakers} - set(Speaker.objects.values_list('name', flat=True)))
        if missing:
            raise CommandError(f'No speaker named: {", ".join(missing)}')
        unknown = {
            key for spec in speakers for key in [spec['current'], *spec['career']] if key and key not in organizations
        }
        if unknown:
            raise CommandError(f'Unknown organization keys: {", ".join(sorted(unknown))}')
        repeated = [spec['name'] for spec in speakers if len(set(spec['career'])) != len(spec['career'])]
        if repeated:
            raise CommandError(f'An organization appears twice in the career of: {", ".join(repeated)}')
        return organizations, speakers

    def _update(self, speaker: Speaker, spec: dict, rows: dict[str, Organization], replace: bool) -> int:
        """Returns 1 if the speaker row changed."""
        changed = False
        current = rows[spec['current']] if spec['current'] else None
        if current and (replace or speaker.current_organization_id is None):
            speaker.current_organization = current
            speaker.save(update_fields=['current_organization'])
            changed = True
        if spec['career'] and (replace or not speaker.career.exists()):
            speaker.career.all().delete()
            CareerStep.objects.bulk_create(
                CareerStep(speaker=speaker, organization=rows[key], order=index)
                for index, key in enumerate(spec['career'])
            )
            changed = True
        return int(changed)
