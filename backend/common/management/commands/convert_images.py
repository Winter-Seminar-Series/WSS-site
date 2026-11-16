"""Convert stored public images to WebP (`common.images.to_webp`) and give them the immutable Cache-Control header.

    python manage.py convert_images --dry-run     # count, change nothing
    python manage.py convert_images [--limit N]   # convert (at most N files)

Every `WebPImageField` is covered. Each file is uploaded again under a new name (converted, or as it was when WebP
would not help, e.g. SVG) and its rows are pointed at it with a conditional UPDATE, so a row whose image was replaced
meanwhile is left alone. The old object stays in the bucket: pages cached before the run still link to it.
Re-runnable: a file that already has the header is skipped. Exits non-zero if a file could not be processed.
"""

import logging
import os
from collections import defaultdict
from concurrent.futures import ThreadPoolExecutor

from django.apps import apps
from django.core.files.base import ContentFile
from django.core.files.storage import storages
from django.core.management.base import BaseCommand, CommandError
from django.db.models import Q

from common.fields import WebPImageField
from common.images import to_webp
from common.storage import PUBLIC_CACHE_CONTROL, MediaStorage

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = 'Convert stored public images to WebP and make them cacheable.'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Only report what would be converted.')
        parser.add_argument('--limit', type=int, help='Process at most this many files (for a trial run).')
        parser.add_argument('--workers', type=int, default=2, help='Files processed in parallel (default: 2).')

    def handle(self, *args, dry_run, limit, workers, **options):
        storage = storages['default']
        if not isinstance(storage, MediaStorage):
            raise CommandError('The default storage is not common.storage.MediaStorage.')

        # File name -> the rows that point at it (one file can be shared, e.g. by a poster and a thumbnail).
        rows = defaultdict(list)
        for model in apps.get_models():
            for field in model._meta.fields:
                if isinstance(field, WebPImageField):
                    has_file = ~Q(**{field.name: ''}) & Q(**{f'{field.name}__isnull': False})
                    for pk, name in model._default_manager.filter(has_file).values_list('pk', field.name):
                        rows[name].append((model, field, pk))
        names = sorted(rows)[:limit]
        self.stdout.write(f'{len(names)} file(s) referenced by {sum(len(rows[n]) for n in names)} row(s).')

        def work(name):
            try:
                if storage.bucket.Object(name).cache_control == PUBLIC_CACHE_CONTROL:
                    return name, 'done', 0, 0
                with storage.open(name, 'rb') as handle:
                    data = handle.read()
                webp = to_webp(data)
                outcome, sizes = ('converted' if webp else 'kept'), (len(data), len(webp or data))
                if dry_run:
                    return name, outcome, *sizes
                _, first_field, _ = rows[name][0]
                new_name = storage.save(
                    first_field.generate_filename(None, 'image.webp' if webp else os.path.basename(name)),
                    ContentFile(webp or data),
                )
                updated = sum(
                    model._default_manager.filter(pk=pk, **{field.name: name}).update(**{field.name: new_name})
                    for model, field, pk in rows[name]
                )
                return name, outcome if updated else 'changed meanwhile', *sizes
            except Exception:  # noqa: BLE001 - one broken object must not stop the run.
                logger.exception('Could not convert %s', name)
                return name, 'failed', 0, 0

        totals = defaultdict(int)
        before = after = 0
        with ThreadPoolExecutor(max_workers=workers) as pool:
            for index, (name, outcome, size_before, size_after) in enumerate(pool.map(work, names), start=1):
                totals[outcome] += 1
                before += size_before
                after += size_after
                if outcome == 'failed':
                    self.stderr.write(f'failed: {name}')
                if index % 100 == 0:
                    self.stdout.write(f'  {index}/{len(names)}')

        verb = 'would be' if dry_run else 'were'
        self.stdout.write(self.style.SUCCESS(
            f'{dict(totals)}. The processed files {verb} {before / 2**20:.1f} MB, now {after / 2**20:.1f} MB.'
        ))
        if totals['failed']:
            raise CommandError(f'{totals["failed"]} file(s) could not be processed; see the log above.')
