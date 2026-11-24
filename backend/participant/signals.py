import logging

from django.db import transaction
from django.db.models.signals import post_delete
from django.dispatch import receiver

from participant.models import CV

logger = logging.getLogger(__name__)


def delete_stored_file(storage, name: str) -> None:
    """Deletes a file once the transaction that dropped its row commits. A CV is personal data: it must not outlive
    its row. A storage failure is logged (by object name only, which is random) and never undoes the database change.
    """

    def delete():
        try:
            storage.delete(name)
        except Exception:
            logger.exception('Could not delete stored file %s', name)

    transaction.on_commit(delete)


@receiver(post_delete, sender=CV, dispatch_uid='participant.cv.delete_file')
def delete_cv_file(sender, instance: CV, **kwargs):
    # Fires for every way a row goes: the API, the admin, and cascades from a deleted user.
    if instance.file:
        delete_stored_file(instance.file.storage, instance.file.name)
