from django.test import SimpleTestCase

from common.storage import MediaStorage


class MediaStorageUrlTests(SimpleTestCase):
    """Presigning is computed locally: nothing here reaches S3."""

    storage = MediaStorage(
        access_key='key', secret_key='secret', bucket_name='wss', endpoint_url='https://s3.example.test'
    )

    def test_public_media_gets_a_plain_url(self):
        for name in ('speakers/a.png', 'posters/a.jpg', 'organizations/a.svg', 'staff/a.png'):
            self.assertEqual(self.storage.url(name), f'https://s3.example.test/wss/{name}')

    def test_private_files_get_a_signed_url(self):
        for name in ('participation/a.png', 'poster-images/a.pdf', 'certificates/10th/A B.png', 'cv/a.pdf'):
            url = self.storage.url(name)
            self.assertIn('Signature=', url, name)
            self.assertIn('Expires=', url, name)

    def test_a_lookalike_folder_is_not_public(self):
        self.assertIn('Signature=', self.storage.url('speakers-private/a.png'))
