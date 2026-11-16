from storages.backends.s3 import S3Storage

# Upload folders of public media (site images). The bucket policy (`manage.py apply_bucket_policy`) lets anyone read
# exactly these; everything else in the bucket (certificates, poster-session submissions, CVs, ...) stays private.
PUBLIC_PREFIXES = ('posters/', 'thumbnails/', 'speakers/', 'organizations/', 'staff/', 'sponsors/')


class MediaStorage(S3Storage):
    """Plain, cacheable URLs for public media; signed, expiring URLs for everything else."""

    def __init__(self, **options):
        super().__init__(**{**options, 'querystring_auth': True})
        self._public = S3Storage(**{**options, 'querystring_auth': False})

    def url(self, name, *args, **kwargs):
        if name.startswith(PUBLIC_PREFIXES):
            return self._public.url(name, *args, **kwargs)
        return super().url(name, *args, **kwargs)
