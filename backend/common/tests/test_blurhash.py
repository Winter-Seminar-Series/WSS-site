import io
from io import StringIO
from unittest import mock

from django.core.files.base import ContentFile
from django.core.files.uploadedfile import SimpleUploadedFile
from django.core.management import CommandError, call_command
from django.test import TestCase, override_settings
import blurhash as reference
from PIL import Image

from common import blurhash
from common.testing import make_event, make_seminar, make_speaker
from core.models import Speaker, Workshop
from staff.models import Staff

IN_MEMORY_STORAGE = {
    'default': {'BACKEND': 'django.core.files.storage.InMemoryStorage'},
    'staticfiles': {'BACKEND': 'django.contrib.staticfiles.storage.StaticFilesStorage'},
}


def image_bytes(color=(255, 0, 0), size=(40, 30), mode='RGB', fmt='PNG') -> bytes:
    buffer = io.BytesIO()
    Image.new(mode, size, color).save(buffer, fmt)
    return buffer.getvalue()


def upload(name='photo.png', **kwargs) -> SimpleUploadedFile:
    return SimpleUploadedFile(name, image_bytes(**kwargs), content_type='image/png')


BASE83 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~'


def dc_color(hash_: str) -> tuple[int, int, int]:
    """The average colour a hash stores: the four base83 digits after the two header characters."""
    value = 0
    for char in hash_[2:6]:
        value = value * 83 + BASE83.index(char)
    return value >> 16, (value >> 8) & 255, value & 255


class EncoderTests(TestCase):
    def test_hash_has_the_documented_shape(self):
        result = blurhash.encode_image(Image.new('RGB', (200, 100), (10, 20, 30)))

        self.assertEqual(len(result), 4 + 2 * blurhash.X_COMPONENTS * blurhash.Y_COMPONENTS)
        self.assertTrue(reference.is_valid_blurhash(result))

    def test_average_colour_survives(self):
        for color in [(255, 0, 0), (12, 200, 99), (0, 0, 0), (255, 255, 255)]:
            with self.subTest(color=color):
                result = blurhash.encode_image(Image.new('RGB', (64, 48), color))
                for got, want in zip(dc_color(result), color):
                    self.assertAlmostEqual(got, want, delta=1)

    def test_transparency_counts_as_white(self):
        result = blurhash.encode_image(Image.new('RGBA', (20, 20), (0, 0, 0, 0)))
        self.assertEqual(dc_color(result), (255, 255, 255))

    def test_palette_and_greyscale_images_are_accepted(self):
        for mode in ['P', 'L', 'LA', 'CMYK']:
            with self.subTest(mode=mode):
                self.assertEqual(len(blurhash.encode_image(Image.new(mode, (30, 30)))), 28)

    def test_large_jpeg_is_downscaled_not_decoded_in_full(self):
        data = image_bytes(size=(4000, 3000), fmt='JPEG')
        self.assertEqual(len(blurhash.encode_file(io.BytesIO(data))), 28)

    def test_a_broken_file_gives_an_empty_hash_instead_of_raising(self):
        with self.assertLogs('common.blurhash', level='WARNING'):
            self.assertEqual(blurhash.encode_file(io.BytesIO(b'definitely not an image')), '')

    def test_matches_the_reference_hash(self):
        # Solid mid-grey: the average colour is the only component, so the hash is fully determined.
        grey = Image.new('RGB', (8, 8), (128, 128, 128))
        self.assertEqual(blurhash.encode_image(grey), reference.encode(grey.copy(), 4, 3))


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class ModelHashTests(TestCase):
    def test_hash_is_computed_when_an_image_is_uploaded(self):
        speaker = Speaker.objects.create(name='Ada', image=upload())

        speaker.refresh_from_db()
        self.assertEqual(len(speaker.image_blurhash), 28)
        self.assertTrue(speaker.image.name.startswith('speakers/'))

    def test_the_upload_is_stored_whole_after_hashing(self):
        speaker = Speaker.objects.create(name='Ada', image=upload())

        with speaker.image.storage.open(speaker.image.name, 'rb') as stored:
            self.assertEqual(stored.read(), image_bytes())

    def test_each_image_field_gets_its_own_hash(self):
        workshop = Workshop.objects.create(name='W', poster=upload(color=(255, 0, 0)), thumbnail=upload(color=(0, 0, 255)))

        self.assertEqual(dc_color(workshop.poster_blurhash)[0], 255)
        self.assertEqual(dc_color(workshop.thumbnail_blurhash)[2], 255)

    def test_replacing_the_image_recomputes_and_clearing_empties(self):
        speaker = Speaker.objects.create(name='Ada', image=upload(color=(255, 0, 0)))
        first = speaker.image_blurhash

        speaker = Speaker.objects.get(pk=speaker.pk)
        speaker.image = upload(color=(0, 255, 0))
        speaker.save()
        self.assertNotEqual(speaker.image_blurhash, first)

        speaker = Speaker.objects.get(pk=speaker.pk)
        speaker.image = None
        speaker.save()
        self.assertEqual(Speaker.objects.get(pk=speaker.pk).image_blurhash, '')

    def test_saving_without_a_new_image_does_not_touch_storage_or_pillow(self):
        speaker = Speaker.objects.create(name='Ada', image=upload())
        speaker = Speaker.objects.get(pk=speaker.pk)

        with mock.patch('common.models.encode_file') as encode:
            speaker.name = 'Ada L.'
            speaker.save()
            speaker.save()

        encode.assert_not_called()

    def test_no_image_means_no_hash(self):
        self.assertEqual(Speaker.objects.create(name='Ada').image_blurhash, '')
        self.assertEqual(Staff.objects.create(name='Bob').image_blurhash, '')

    def test_an_unreadable_upload_still_saves_the_row(self):
        bad = SimpleUploadedFile('x.png', b'nope', content_type='image/png')

        with self.assertLogs('common.blurhash', level='WARNING'):
            speaker = Speaker.objects.create(name='Ada', image=bad)

        self.assertEqual(Speaker.objects.get(pk=speaker.pk).image_blurhash, '')
        self.assertTrue(speaker.image.name)

    def test_update_fields_save_includes_the_hash_only_when_the_image_is_saved(self):
        speaker = Speaker.objects.create(name='Ada')

        speaker.name = 'Renamed'
        speaker.save(update_fields=['name'])
        self.assertEqual(Speaker.objects.get(pk=speaker.pk).image_blurhash, '')

        speaker.image = upload()
        speaker.save(update_fields=['image'])
        self.assertEqual(len(Speaker.objects.get(pk=speaker.pk).image_blurhash), 28)

    def test_deferred_image_field_is_not_loaded_by_save(self):
        speaker = Speaker.objects.create(name='Ada', image=upload())
        partial = Speaker.objects.defer('image').get(pk=speaker.pk)

        with self.assertNumQueries(1):  # the UPDATE only
            partial.name = 'Renamed'
            partial.save()


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class ApiTests(TestCase):
    def test_hashes_are_part_of_the_public_responses(self):
        event = make_event()
        speaker = Speaker.objects.create(name='Ada', image=upload())
        make_seminar(event, speaker=speaker)

        body = self.client.get(f'/api/seminar/{event.pk}/').json()

        self.assertEqual(body[0]['speaker']['image_blurhash'], speaker.image_blurhash)
        self.assertIn('poster_blurhash', body[0]['sub_event'])
        self.assertIn('thumbnail_blurhash', body[0]['sub_event'])


@override_settings(STORAGES=IN_MEMORY_STORAGE)
class BackfillCommandTests(TestCase):
    def run_command(self, *args):
        out, err = StringIO(), StringIO()
        call_command('backfill_blurhash', *args, stdout=out, stderr=err)
        return out.getvalue()

    def legacy_speaker(self, name='Legacy', data=None):
        """A row that predates the feature: image stored, no hash."""
        speaker = make_speaker(name)
        stored = Speaker._meta.get_field('image').storage.save('speakers/old.png', ContentFile(data or image_bytes()))
        Speaker.objects.filter(pk=speaker.pk).update(image=stored)
        return speaker

    def test_fills_missing_hashes_and_leaves_rows_without_images(self):
        legacy = self.legacy_speaker()
        bare = make_speaker('No photo')

        output = self.run_command()

        self.assertEqual(len(Speaker.objects.get(pk=legacy.pk).image_blurhash), 28)
        self.assertEqual(Speaker.objects.get(pk=bare.pk).image_blurhash, '')
        self.assertIn('computed 1', output)

    def test_second_run_has_nothing_to_do(self):
        self.legacy_speaker()
        self.run_command()

        self.assertIn('computed 0', self.run_command())

    def test_dry_run_changes_nothing(self):
        legacy = self.legacy_speaker()

        output = self.run_command('--dry-run')

        self.assertEqual(Speaker.objects.get(pk=legacy.pk).image_blurhash, '')
        self.assertIn('would compute 1', output)

    def test_force_recomputes_existing_hashes(self):
        legacy = self.legacy_speaker()
        Speaker.objects.filter(pk=legacy.pk).update(image_blurhash='stale')

        self.run_command()
        self.assertEqual(Speaker.objects.get(pk=legacy.pk).image_blurhash, 'stale')

        self.run_command('--force')
        self.assertEqual(len(Speaker.objects.get(pk=legacy.pk).image_blurhash), 28)

    def test_can_target_one_model(self):
        legacy = self.legacy_speaker()

        self.run_command('core.workshop')
        self.assertEqual(Speaker.objects.get(pk=legacy.pk).image_blurhash, '')

        self.run_command('core.Speaker')
        self.assertEqual(len(Speaker.objects.get(pk=legacy.pk).image_blurhash), 28)

    def test_unknown_model_is_rejected(self):
        with self.assertRaisesMessage(CommandError, 'Unknown model'):
            self.run_command('core.Nope')

    def test_an_unreadable_image_fails_the_run_but_not_the_others(self):
        good = self.legacy_speaker('Good')
        bad = self.legacy_speaker('Bad', data=b'not an image')

        with self.assertLogs('common.blurhash', level='WARNING'), self.assertRaisesMessage(CommandError, '1 image'):
            self.run_command()

        self.assertEqual(len(Speaker.objects.get(pk=good.pk).image_blurhash), 28)
        self.assertEqual(Speaker.objects.get(pk=bad.pk).image_blurhash, '')

    def test_a_replaced_image_does_not_get_the_old_hash(self):
        legacy = self.legacy_speaker()
        real_compute = blurhash.encode_file

        def replace_then_encode(handle):
            Speaker.objects.filter(pk=legacy.pk).update(image='speakers/replaced.png')
            return real_compute(handle)

        class InlineExecutor:
            """Runs the work in the test's thread: a pool thread would use its own connection, outside the test's
            transaction."""

            def __init__(self, max_workers):
                pass

            def __enter__(self):
                return self

            def __exit__(self, *exc):
                return False

            def map(self, function, items):
                return map(function, items)

        with (
            mock.patch('common.models.encode_file', replace_then_encode),
            mock.patch('common.management.commands.backfill_blurhash.ThreadPoolExecutor', InlineExecutor),
        ):
            output = self.run_command()

        self.assertEqual(Speaker.objects.get(pk=legacy.pk).image_blurhash, '')
        self.assertIn('changed meanwhile 1', output)
