from django.core import checks
from django.core.exceptions import FieldDoesNotExist
from django.db import models
from django.db.models.fields.files import FieldFile

from common.blurhash import encode_file


def blurhash_field() -> models.CharField:
    """Column that holds the BlurHash of a sibling image field (see `BlurHashMixin`)."""
    return models.CharField(
        max_length=64, blank=True, default='', editable=False, help_text='Placeholder computed from the image.'
    )


def compute_blurhash(file: FieldFile) -> str:
    """BlurHash of a stored or freshly uploaded file; '' for an empty field or an unreadable image."""
    if not file:
        return ''
    if file._committed:
        with file.storage.open(file.name, 'rb') as handle:
            return encode_file(handle)
    handle = file.file
    handle.seek(0)
    try:
        return encode_file(handle)
    finally:
        handle.seek(0)  # The storage still has to upload it from the start.


class BlurHashMixin(models.Model):
    """Keeps a BlurHash next to each image field, so the frontend can paint a placeholder before the image loads.

    Declare `BLURHASH_FIELDS = {'image': 'image_blurhash'}` (image field -> hash field, the latter created with
    `blurhash_field()`). The hash is recomputed in `save()` whenever the image changes, from the upload that is
    already in memory (no storage round trip). Rows that predate the feature, or that were written with
    `bulk_create`/`update`/loaddata, are filled by `manage.py backfill_blurhash`.
    """

    BLURHASH_FIELDS: dict[str, str] = {}

    class Meta:
        abstract = True

    @classmethod
    def from_db(cls, db, field_names, values):
        instance = super().from_db(db, field_names, values)
        instance._remember_image_names()
        return instance

    @classmethod
    def check(cls, **kwargs):
        errors = super().check(**kwargs)
        for source, target in cls.BLURHASH_FIELDS.items():
            for name in (source, target):
                try:
                    cls._meta.get_field(name)
                except FieldDoesNotExist:
                    errors.append(
                        checks.Error(f'BLURHASH_FIELDS refers to the missing field "{name}".', obj=cls, id='common.E001')
                    )
        return errors

    def save(self, *args, **kwargs):
        update_fields = kwargs.get('update_fields')
        stale = [
            (source, target)
            for source, target in self.BLURHASH_FIELDS.items()
            # A deferred image field was not loaded, so it cannot have changed.
            if source in self.__dict__
            and (update_fields is None or source in update_fields)
            and self._image_name(source) != getattr(self, '_synced_image_names', {}).get(source, '')
        ]
        for source, target in stale:
            setattr(self, target, compute_blurhash(getattr(self, source)))
        if update_fields is not None and stale:
            kwargs['update_fields'] = {*update_fields, *(target for _, target in stale)}
        super().save(*args, **kwargs)
        self._remember_image_names()

    def _image_name(self, field: str) -> str:
        value = self.__dict__[field]
        return (getattr(value, 'name', value) or '') if value is not None else ''

    def _remember_image_names(self) -> None:
        self._synced_image_names = {
            source: self._image_name(source) for source in self.BLURHASH_FIELDS if source in self.__dict__
        }
