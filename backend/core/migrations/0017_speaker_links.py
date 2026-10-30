from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0016_blurhash'),
    ]

    operations = [
        migrations.AddField(
            model_name='speaker',
            name='linkedin',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='speaker',
            name='google_scholar',
            field=models.URLField(blank=True),
        ),
    ]
