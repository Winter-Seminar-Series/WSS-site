from django.core.files.base import ContentFile
from django.db import models

from common.images import to_webp


class WebPImageField(models.ImageField):
    """ImageField that converts each new upload with `common.images.to_webp` before storing it.

    Use it with a `UniqueUploadPath`, so every stored file has a new name: public media is cached as immutable.
    Files already stored are converted by `manage.py convert_images`.
    """

    def pre_save(self, model_instance, add):
        file = getattr(model_instance, self.attname)
        if file and not file._committed:
            file.file.seek(0)
            webp = to_webp(file.file.read())
            file.file.seek(0)
            if webp is not None:
                file.file = ContentFile(webp)
                file.name = 'image.webp'
        return super().pre_save(model_instance, add)
