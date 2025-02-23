from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0012_add_poster_session_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='postersessionimage',
            name='image',
            field=models.FileField(upload_to='poster-images/'),
        ),
    ]
