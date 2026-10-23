"""BlurHash (https://blurha.sh) of an image: a ~30-character placeholder the frontend paints before the image loads.

The hash itself comes from the reference implementation (`blurhash-python`). This module prepares the pixels:
the image is shrunk to `SAMPLE_SIZE` pixels first, so cost does not depend on the upload's resolution.
"""

import logging
from typing import BinaryIO

import blurhash
from PIL import Image, ImageOps

logger = logging.getLogger(__name__)

X_COMPONENTS = 4
Y_COMPONENTS = 3
SAMPLE_SIZE = 32


def encode_image(image: Image.Image, x_components: int = X_COMPONENTS, y_components: int = Y_COMPONENTS) -> str:
    """Hash of a Pillow image. Transparent areas count as white, like the page behind the image."""
    image = ImageOps.exif_transpose(image)
    if image.format == 'JPEG':
        # Lets the decoder skip most of the work for large photos.
        image.draft('RGB', (SAMPLE_SIZE * 2, SAMPLE_SIZE * 2))
    image = image.convert('RGBA')
    background = Image.new('RGBA', image.size, (255, 255, 255, 255))
    image = Image.alpha_composite(background, image).convert('RGB')
    image.thumbnail((SAMPLE_SIZE, SAMPLE_SIZE), Image.Resampling.BILINEAR, reducing_gap=2.0)
    return blurhash.encode(image, x_components, y_components)


def encode_file(file: BinaryIO) -> str:
    """Hash of an image file, or '' when it cannot be decoded (a bad placeholder must never block an upload)."""
    try:
        with Image.open(file) as image:
            return encode_image(image)
    except Exception:  # noqa: BLE001 - Pillow raises many types for broken or hostile files.
        logger.warning('Could not compute a BlurHash', exc_info=True)
        return ''
