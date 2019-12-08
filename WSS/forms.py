from django import forms

from WSS import models


class ParticipantForm(forms.ModelForm):
    # name_family = forms.CharField(label='name_family', max_length=100)
    # email = forms.EmailField(label='email')
    # phone_number = forms.CharField(max_length=15, label='phone_number')
    # job = forms.CharField(max_length=100, label='job')
    # university = forms.CharField(max_length=100, label='university')
    # introduction_method = forms.CharField(label='introduction_method', )
    # gender = forms.CharField(label='gender')
    # grade = forms.CharField(label='grade')
    # is_student = forms.BooleanField(label='is_student', required=False)
    # city = forms.CharField(label='city')
    # country = forms.CharField(label='country')
    INTEREST_FIELDS = [
        ("TECH", "technologies"),
        ("DATA", "data mining")  # todo add more
    ]
    interests = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=INTEREST_FIELDS,
                                          label='interests')

    class Meta:
        model = models.Participant
        fields = ['name_family', 'phone_number', 'email', 'job', 'university', 'introduction_method',
                  'gender', 'city', 'country', 'grade', 'is_student', 'workshops']
