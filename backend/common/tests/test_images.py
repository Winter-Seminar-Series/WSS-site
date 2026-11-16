import io
import os

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import SimpleTestCase, TestCase, override_settings
from PIL import Image

from common.images import MAX_BYTES, MAX_SIDE, to_webp
from common.storage import PUBLIC_CACHE_CONTROL, MediaStorage
from common.testing import make_speaker
from core.models import Organization

IN_MEMORY_STORAGE = {
    'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}


def encoded(image: Image.Image, fmt: str, **options) -> bytes:
    buffer = io.BytesIO()
    image.save(buffer, fmt, **options)
    return buffer.getvalue()


def noise(size: tuple[int, int]) -> Image.Image:
    """Random pixels: the worst case for every codec, so the size limit really has to work."""
    return Image.frombytes('RGB', size, os.urandom(size[0] * size[1] * 3))


def decoded(data: bytes) -> Image.Image:
    image = Image.open(io.BytesIO(data))
    image.load()
    return image


class ToWebpTests(SimpleTestCase):
    def test_a_large_photo_becomes_a_webp_within_the_limit(self):
        original = encoded(noise((3000, 2000)), 'JPEG', quality=95)
        self.assertGreater(len(original), MAX_BYTES)

        webp = to_webp(original)

        image = decoded(webp)
        self.assertEqual(image.format, 'WEBP')
        self.assertLessEqual(len(webp), MAX_BYTES)
        self.assertLessEqual(max(image.size), MAX_SIDE)
        self.assertAlmostEqual(image.width / image.height, 1.5, delta=0.01)

    def test_a_small_image_keeps_its_size_and_top_quality(self):
        photo = Image.new('RGB', (800, 600), (30, 120, 200))
        webp = to_webp(encoded(photo, 'PNG'))

        self.assertEqual(decoded(webp).size, (800, 600))
        self.assertEqual(webp, to_webp(encoded(photo, 'BMP')))  # Same pixels, same quality 100 output.

    def test_transparency_is_kept(self):
        logo = Image.new('RGBA', (400, 400), (0, 0, 0, 0))
        logo.paste((200, 0, 0, 255), (100, 100, 300, 300))

        image = decoded(to_webp(encoded(logo, 'PNG')))

        self.assertEqual(image.mode, 'RGBA')
        self.assertEqual(image.getpixel((0, 0))[3], 0)

    def test_the_exif_rotation_is_applied(self):
        portrait = Image.new('RGB', (200, 100))
        exif = portrait.getexif()
        exif[0x0112] = 6  # Orientation: rotate 90 degrees.
        webp = to_webp(encoded(portrait, 'JPEG', exif=exif, quality=100))

        self.assertEqual(decoded(webp).size, (100, 200))

    def test_a_small_jpeg_becomes_a_smaller_webp_at_a_lower_quality(self):
        jpeg = encoded(noise((400, 300)).resize((40, 30)).resize((400, 300)), 'JPEG', quality=92)

        webp = to_webp(jpeg)

        self.assertLess(len(webp), len(jpeg))
        self.assertEqual(decoded(webp).size, (400, 300))

    def test_a_phone_photo_with_extra_frames_is_converted(self):
        photo = noise((1500, 1000))
        mpo = encoded(photo, 'MPO', save_all=True, append_images=[photo.resize((160, 120))], quality=95)
        self.assertGreater(len(mpo), MAX_BYTES)

        webp = to_webp(mpo)

        self.assertEqual(decoded(webp).format, 'WEBP')
        self.assertLessEqual(len(webp), MAX_BYTES)

    def test_files_that_webp_would_not_help_are_kept(self):
        # Already compressed harder than WebP at quality 90-100 can go.
        low_quality_jpeg = encoded(noise((64, 64)), 'JPEG', quality=30)
        frames = [Image.new('RGB', (20, 20), color) for color in ('red', 'blue')]
        animated = encoded(frames[0], 'GIF', save_all=True, append_images=frames[1:])

        for name, data in [
            ('svg', b'<svg xmlns="http://www.w3.org/2000/svg"/>'),
            ('animated gif', animated),
            ('broken', b'not an image'),
            ('already smaller than its WebP', low_quality_jpeg),
        ]:
            with self.subTest(name):
                self.assertIsNone(to_webp(data))


class MediaStorageCacheTests(SimpleTestCase):
    storage = MediaStorage(
        access_key='key', secret_key='secret', bucket_name='wss', endpoint_url='https://s3.example.test'
    )

    def test_public_media_is_cached_for_a_year(self):
        self.assertEqual(self.storage.get_object_parameters('speakers/a.webp')['CacheControl'], PUBLIC_CACHE_CONTROL)

    def test_private_files_get_no_public_cache_header(self):
        self.assertNotIn('CacheControl', self.storage.get_object_parameters('participation/a.png'))


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class WebPImageFieldTests(TestCase):
    def test_an_upload_is_stored_as_webp_under_a_random_name(self):
        speaker = make_speaker()
        speaker.image = SimpleUploadedFile('photo.png', encoded(noise((300, 300)), 'PNG'))
        speaker.save()

        self.assertRegex(speaker.image.name, r'^speakers/[0-9a-f-]{36}\.webp$')
        with speaker.image.storage.open(speaker.image.name, 'rb') as stored:
            self.assertEqual(decoded(stored.read()).format, 'WEBP')
        self.assertTrue(speaker.image_blurhash)

    def test_an_svg_is_stored_as_it_is(self):
        svg = b'<svg xmlns="http://www.w3.org/2000/svg"/>'
        organization = Organization.objects.create(
            name='Sharif', logo=SimpleUploadedFile('logo.svg', svg, content_type='image/svg+xml')
        )

        self.assertTrue(organization.logo.name.endswith('.svg'))
        with organization.logo.storage.open(organization.logo.name, 'rb') as stored:
            self.assertEqual(stored.read(), svg)
