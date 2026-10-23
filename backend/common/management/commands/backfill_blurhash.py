"""Compute the BlurHash of images that have none yet (or of all of them, with --force).

    python manage.py backfill_blurhash                   # every model that uses BlurHashMixin
    python manage.py backfill_blurhash core.Speaker      # only some models
    python manage.py backfill_blurhash --dry-run         # count, change nothing
    python manage.py backfill_blurhash --force           # recompute existing hashes too

Safe to run on a live site and to re-run: it only touches the hash columns, with one conditional UPDATE per row,
so a row whose image was replaced in the meantime is left for the next run instead of getting a stale hash.
"""

import logging
from concurrent.futures import ThreadPoolExecutor

from django.apps import apps
from django.core.management.base import BaseCommand, CommandError
from django.db.models import Q

from common.models import BlurHashMixin, compute_blurhash

logger = logging.getLogger(__name__)


def blurhash_models() -> list[type[BlurHashMixin]]:
    return [
        model
        for model in apps.get_models()
        if issubclass(model, BlurHashMixin) and model.BLURHASH_FIELDS
    ]


class Command(BaseCommand):
    help = 'Compute the BlurHash placeholders of existing images.'

    def add_arguments(self, parser):
        parser.add_argument('models', nargs='*', metavar='app_label.Model', help='Default: every model with BlurHash.')
        parser.add_argument('--force', action='store_true', help='Recompute hashes that already exist.')
        parser.add_argument('--dry-run', action='store_true', help='Only report what would be computed.')
        parser.add_argument('--workers', type=int, default=4, help='Parallel downloads from storage (default: 4).')
        parser.add_argument('--batch-size', type=int, default=200, help='Rows read per database round trip.')

    def handle(self, *args, models, force, dry_run, workers, batch_size, **options):
        if workers < 1 or batch_size < 1:
            raise CommandError('--workers and --batch-size must be at least 1.')
        targets = self._resolve(models)

        totals = {'done': 0, 'failed': 0, 'skipped': 0}
        for model in targets:
            for source, target in model.BLURHASH_FIELDS.items():
                self._backfill(model, source, target, force, dry_run, workers, batch_size, totals)

        verb = 'would compute' if dry_run else 'computed'
        self.stdout.write(
            self.style.SUCCESS(
                f'Done: {verb} {totals["done"]}, failed {totals["failed"]}, changed meanwhile {totals["skipped"]}.'
            )
        )
        if totals['failed']:
            raise CommandError(f'{totals["failed"]} image(s) could not be processed; see the log above.')

    def _resolve(self, labels: list[str]) -> list[type[BlurHashMixin]]:
        available = {model._meta.label: model for model in blurhash_models()}
        if not labels:
            return list(available.values())
        by_lower = {label.lower(): model for label, model in available.items()}
        try:
            return [by_lower[label.lower()] for label in labels]
        except KeyError as error:
            raise CommandError(f'Unknown model {error}. Choose from: {", ".join(sorted(available))}.') from None

    def _backfill(self, model, source, target, force, dry_run, workers, batch_size, totals):
        label = f'{model._meta.label}.{source}'
        has_image = ~Q(**{source: ''}) & Q(**{f'{source}__isnull': False})
        queryset = model._default_manager.filter(has_image)
        if not force:
            queryset = queryset.filter(**{target: ''})
        rows = list(queryset.order_by('pk').values_list('pk', source).iterator(chunk_size=batch_size))
        self.stdout.write(f'{label}: {len(rows)} image(s) to process')
        if dry_run or not rows:
            totals['done'] += len(rows)
            return

        def work(row):
            pk, name = row
            try:
                file = getattr(model(**{source: name}), source)
                return pk, name, compute_blurhash(file)
            except Exception:  # noqa: BLE001 - one broken object must not stop the run.
                logger.exception('%s pk=%s: could not read %s', label, pk, name)
                return pk, name, None

        with ThreadPoolExecutor(max_workers=workers) as pool:
            for index, (pk, name, blurhash) in enumerate(pool.map(work, rows), start=1):
                if not blurhash:
                    # None: storage failed. '': Pillow could not decode it. Either way the row stays as it was.
                    totals['failed'] += 1
                    self.stderr.write(f'{label} pk={pk}: unreadable image {name!r}')
                else:
                    # Conditional on the image still being the one we read: never write a stale hash.
                    changed = model._default_manager.filter(pk=pk, **{source: name}).update(**{target: blurhash})
                    totals['done' if changed else 'skipped'] += 1
                if index % 100 == 0:
                    self.stdout.write(f'  {index}/{len(rows)}')
