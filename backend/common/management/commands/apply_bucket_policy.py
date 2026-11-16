import json

from django.core.files.storage import storages
from django.core.management.base import BaseCommand, CommandError

from common.storage import PUBLIC_PREFIXES, MediaStorage

ALL_USERS = 'http://acs.amazonaws.com/groups/global/AllUsers'
# Folders of private uploads (certificates, poster-session submissions). Loose files elsewhere, such as old
# marketing images, are left as they are.
PRIVATE_PREFIXES = ('participation/', 'poster-images/', 'certificates/')


class Command(BaseCommand):
    """Makes the media bucket match `common.storage.PUBLIC_PREFIXES`. Idempotent; run it after changing that list.

    1. Bucket policy: anyone may GET objects under the public prefixes (whatever their own ACL says).
    2. Bucket ACL: private, so nobody can list the bucket anonymously.
    3. Object ACLs: any object under PRIVATE_PREFIXES that is still public-read becomes private. The keys it
       changed are printed, so the step can be undone with `put_object_acl(ACL='public-read')`.
    """

    help = 'Apply the public-media bucket policy, block anonymous listing, make private uploads private.'

    def add_arguments(self, parser):
        parser.add_argument('--dry-run', action='store_true', help='Show what would change, change nothing.')

    def handle(self, *args, dry_run, **options):
        storage = storages['default']
        if not isinstance(storage, MediaStorage):
            raise CommandError('The default storage is not common.storage.MediaStorage.')
        client = storage.connection.meta.client
        bucket = storage.bucket_name

        policy = {
            'Version': '2012-10-17',
            'Statement': [{
                'Sid': 'PublicMedia',
                'Effect': 'Allow',
                'Principal': {'AWS': ['*']},
                'Action': ['s3:GetObject'],
                'Resource': [f'arn:aws:s3:::{bucket}/{prefix}*' for prefix in PUBLIC_PREFIXES],
            }],
        }
        self.stdout.write(json.dumps(policy, indent=2))
        if not dry_run:
            client.put_bucket_policy(Bucket=bucket, Policy=json.dumps(policy))
            client.put_bucket_acl(Bucket=bucket, ACL='private')

        changed = 0
        pages = (
            page
            for prefix in PRIVATE_PREFIXES
            for page in client.get_paginator('list_objects_v2').paginate(Bucket=bucket, Prefix=prefix)
        )
        for page in pages:
            for obj in page.get('Contents', []):
                key = obj['Key']
                grants = client.get_object_acl(Bucket=bucket, Key=key)['Grants']
                if any(grant['Grantee'].get('URI') == ALL_USERS for grant in grants):
                    self.stdout.write(f'private: {key}')
                    if not dry_run:
                        client.put_object_acl(Bucket=bucket, Key=key, ACL='private')
                    changed += 1
        self.stdout.write(self.style.SUCCESS(
            f'{"Would make" if dry_run else "Made"} {changed} public object(s) private.'
        ))
