import django.db.models.deletion
from django.db import migrations, models

import core.models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_speaker_links'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                (
                    'logo',
                    models.ImageField(
                        blank=True, null=True, upload_to=core.models.UniqueUploadPath('organizations')
                    ),
                ),
                ('website', models.URLField(blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='speaker',
            name='current_organization',
            field=models.ForeignKey(
                blank=True,
                help_text='Where the speaker is now. Its logo badges their photo on the site.',
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name='current_speakers',
                to='core.organization',
            ),
        ),
        migrations.CreateModel(
            name='CareerStep',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order', models.PositiveSmallIntegerField(default=0)),
                (
                    'organization',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name='career_steps',
                        to='core.organization',
                    ),
                ),
                (
                    'speaker',
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, related_name='career', to='core.speaker'
                    ),
                ),
            ],
            options={
                'ordering': ('order', 'id'),
            },
        ),
        migrations.AddConstraint(
            model_name='careerstep',
            constraint=models.UniqueConstraint(
                fields=('speaker', 'organization'), name='core_careerstep_unique_organization'
            ),
        ),
    ]
