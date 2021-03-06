from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
from django.contrib.auth.models import User
from WSS.models import UserProfile, Participant, WSS


def create_user(participant):
    return User.objects.create_user(
        username=participant.national_id,
        email=participant.email,
        password=participant.national_id,
        first_name=participant.name_english,
        last_name=participant.family_english,
        date_joined=participant.payment_timestamp
    )

def create_user_profile(participant, user):
    return UserProfile.objects.create(
        phone_number=participant.phone_number,
        age=participant.age,
        job=participant.job,
        university=participant.university,
        introduction_method=participant.introduction_method,
        gender=participant.gender,
        city=participant.city,
        country=participant.country,
        field_of_interest=participant.field_of_interest,
        grade=participant.grade,
        is_student=participant.is_student,
        user=user,
    )

def set_participant_new_fields(participant, user_profile, payment_amount):
    new_participant = Participant.objects.get(id=participant.id)
    new_participant.user_profile = user_profile
    new_participant.payment_amount = payment_amount
    new_participant.payment_ref_id = str(participant.payment_id)
    new_participant.save()

def add_user_profiles(apps, schema_editor):
    CurrentParticipant = apps.get_model('WSS', 'Participant')
    
    CurrentParticipant.objects.filter(payment_status='NO').delete()

    for national_id in CurrentParticipant.objects.values_list('national_id', flat=True).distinct():
        participants = CurrentParticipant.objects.filter(national_id=national_id).order_by('-current_wss__year')
        last_participant = participants.first()

        user = create_user(last_participant)
        user_profile = create_user_profile(last_participant, user)

        for participant in participants:
            wss = WSS.objects.get(year=participant.current_wss.year)
            already_participant = Participant.objects.filter(current_wss=wss, user_profile=user_profile).first()
            if already_participant is None:
                payment_amount = participants.filter(current_wss=participant.current_wss).aggregate(payment_amount=models.Sum('paid_amount'))['payment_amount']
                set_participant_new_fields(participant, user_profile, payment_amount)
            else:
                Participant.objects.get(id=participant.id).delete()


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('events', '0005_event_tag'),
        ('WSS', '0005_add_participant_user_and_wss_fee'),
    ]

    operations = [
        migrations.AlterField(
            model_name='participant',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
        migrations.CreateModel(
            name='UserProfile',
            fields=[
                ('id', models.BigAutoField(primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=13, verbose_name='Phone Number')),
                ('age', models.PositiveSmallIntegerField(null=True)),
                ('job', models.CharField(max_length=250)),
                ('university', models.CharField(max_length=250)),
                ('introduction_method', models.CharField(choices=[(None, 'Please Select'), ('telegram', 'Telegram'), ('instagram', 'Instagram'), ('facebook', 'Facebook'), ('twitter', 'Twitter'), ('poster', 'Poster'), ('friends', 'Friends'), ('other', 'Other')], default=None, max_length=250, null=True, verbose_name='How were you introduced to WSS?')),
                ('gender', models.CharField(choices=[('female', 'Female'), ('male', 'Male')], default=None, max_length=50, null=True)),
                ('city', models.CharField(max_length=150)),
                ('country', models.CharField(max_length=150)),
                ('field_of_interest', models.CharField(blank=True, max_length=1500)),
                ('grade', models.CharField(choices=[(None, 'Please Select'), ('msOrPhd', 'MS or PHD'), ('bsOrOther', 'BS or Other')], max_length=30, null=True)),
                ('is_student', models.BooleanField(default=False, verbose_name='I am a Student')),
                ('user', models.OneToOneField(default=None, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL)),
                ('favorite_tags', models.ManyToManyField(blank=True, null=True, to='events.WssTag', verbose_name='Favorite tags')),
            ],
        ),
        migrations.AddField(
            model_name='participant',
            name='user_profile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='participants', to='WSS.userprofile'),
        ),
        migrations.AddField(
            model_name='participant',
            name='payment_amount',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='participant',
            name='payment_ref_id',
            field=models.CharField(default='NOT_PAYED', max_length=250),
        ),
        migrations.RenameField(
            model_name='participant',
            old_name='sign_timestamp',
            new_name='payment_timestamp',
        ),
        migrations.AlterUniqueTogether(
            name='participant',
            unique_together={('current_wss', 'user_profile')},
        ),
        migrations.RunPython(add_user_profiles),
        migrations.RemoveField(
            model_name='participant',
            name='payment_status',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='age',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='city',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='country',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='email',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='family',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='family_english',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='field_of_interest',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='grade',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='introduction_method',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='is_student',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='job',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='name',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='name_english',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='national_id',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='paid_amount',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='paid_workshops',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='payment_id',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='phone_number',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='question',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='question_other',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='university',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='user',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='workshops',
        ),
        migrations.RemoveField(
            model_name='participant',
            name='participate_in_wss',
        ),
    ]
