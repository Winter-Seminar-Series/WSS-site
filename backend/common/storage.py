import mimetypes

from storages.backends.s3 import S3Storage

# The slim image has no /etc/mime.types, which is where Python learns these; S3 would store them as octet-stream.
mimetypes.add_type('image/webp', '.webp')
mimetypes.add_type('image/jpeg', '.jfif')

# Upload folders of public media (site images). The bucket policy (`manage.py apply_bucket_policy`) lets anyone read
# exactly these; everything else in the bucket (certificates, poster-session submissions, CVs, ...) stays private.
PUBLIC_PREFIXES = ('posters/', 'thumbnails/', 'speakers/', 'organizations/', 'staff/', 'sponsors/')
# Public files never change once stored: every upload gets a new random name (core.models.UniqueUploadPath).
PUBLIC_CACHE_CONTROL = 'public, max-age=31536000, immutable'


class MediaStorage(S3Storage):
    """Plain, cacheable URLs for public media; signed, expiring URLs for everything else."""

    def __init__(self, **options):
        super().__init__(**{**options, 'querystring_auth': True})
        self._public = S3Storage(**{**options, 'querystring_auth': False})

    def url(self, name, *args, **kwargs):
        if name.startswith(PUBLIC_PREFIXES):
            return self._public.url(name, *args, **kwargs)
        return super().url(name, *args, **kwargs)

    def get_object_parameters(self, name):
        params = super().get_object_parameters(name)
        if name.startswith(PUBLIC_PREFIXES):
            params.setdefault('CacheControl', PUBLIC_CACHE_CONTROL)
        return params
