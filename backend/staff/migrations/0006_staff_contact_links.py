from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('staff', '0005_blurhash'),
    ]

    operations = [
        migrations.AddField(
            model_name='staff',
            name='website',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='staff',
            name='linkedin',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='staff',
            name='github',
            field=models.URLField(blank=True),
        ),
        migrations.AddField(
            model_name='staff',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
