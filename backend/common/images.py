"""Public images are stored as WebP, small enough to send straight from the bucket to the browser."""

import io
import logging

from PIL import Image, ImageOps

logger = logging.getLogger(__name__)

MAX_BYTES = 512 * 1024
# Above the largest rendered size (an 816px poster on a 2x screen).
MAX_SIDE = 2048
QUALITIES = (100, 95, 90)
# Each step after the lowest quality still does not fit shrinks the image by this factor.
SHRINK = 0.85


def _encode(image: Image.Image, quality: int) -> bytes:
    buffer = io.BytesIO()
    image.save(buffer, 'WEBP', quality=quality, method=6)
    return buffer.getvalue()


def to_webp(data: bytes) -> bytes | None:
    """WebP of an image at the best quality in QUALITIES that is within MAX_BYTES and smaller than the original. An
    original over MAX_BYTES that no quality brings under it is shrunk until it fits at the lowest quality. None means
    keep the original: not a still raster image (SVG, animated GIF, broken file), or already smaller than WebP at
    QUALITIES can make it."""
    try:
        with Image.open(io.BytesIO(data)) as source:
            # An MPO (phone camera JPEG) counts as animated for its extra depth/preview frames: only the first is the photo.
            if getattr(source, 'is_animated', False) and source.format != 'MPO':
                return None
            image = ImageOps.exif_transpose(source)
            image = image.convert('RGBA' if 'A' in image.getbands() or 'transparency' in image.info else 'RGB')
    except Exception:  # noqa: BLE001 - Pillow raises many types for files it cannot decode (e.g. SVG).
        return None

    image.thumbnail((MAX_SIDE, MAX_SIDE), Image.Resampling.LANCZOS)
    for quality in QUALITIES:
        webp = _encode(image, quality)
        if len(webp) <= MAX_BYTES and len(webp) < len(data):
            return webp
    if len(data) <= MAX_BYTES:
        return None
    while len(webp) > MAX_BYTES and min(image.size) > 64:
        image = image.resize((round(image.width * SHRINK), round(image.height * SHRINK)), Image.Resampling.LANCZOS)
        webp = _encode(image, QUALITIES[-1])
    return webp
