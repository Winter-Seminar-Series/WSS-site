from django import forms

class ParticipantForm(forms.Form):
    name_family = forms.CharField(label='name_family', max_length=100)
    email = forms.EmailField(label='email')
    phone_number = forms.CharField(max_length=15, label='phone_number')
    job = forms.CharField(max_length=100, label='job')
    university = forms.CharField(max_length=100, label='university')
    introduction_method = forms.CharField(label='introduction_method')
    gender = forms.CharField(label='gender')
    grade = forms.CharField(label='grade')
    is_student = forms.BooleanField(label='is_student')
    city = forms.CharField(label='city')
    country = forms.CharField(label='country')
    interests = forms.CharField(label='interests')
