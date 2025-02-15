from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_remove_workshop_event'),
    ]

    operations = [
        migrations.CreateModel(
            name='PosterSessionImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='poster-images/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='auth.User')),
            ],
        ),
    ]
