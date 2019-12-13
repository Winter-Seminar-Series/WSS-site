from django import forms

from WSS import models
from events.models import Workshop


def get_workshops():
    workshops = []
    for i in Workshop.objects.all():
        workshops.append((i.title, i.title + " price(Rial): " + str(i.price)))
    return workshops


class ParticipantForm(forms.ModelForm):
    INTEREST_FIELDS = [
        ("Practical Machine Learning", "Practical Machine Learning"),
        ("Theoretical Machine learning", "Theoretical Machine learning"),
        ("Optimization", "Optimization"),
        ("Information Theory", "Information Theory"),
        ("Security", "Security"),
        ("Bioinformatics", "Bioinformatics"),
        ("Distributed Systems", "Distributed Systems"),
        ("Computer Vision", "Computer Vision"),
        ("Computer Graphics", "Computer Graphics"),
        ("Computational Social Science", "Computational Social Science"),
        ("Quantum Computing", "Quantum Computing"),
        ("Cloud Computing", "Cloud Computing"),
        ("Cryptography", "Cryptography"),
        ("Software Engineering", "Software Engineering"),
        ("Big Data", "Big Data"),
        ("Computer Architecture", "Computer Architecture"),
        ("Database Theory", "Database Theory"),
        ("Theoretical Computer Science", "Theoretical Computer Science"),
    ]
    interests = forms.MultipleChoiceField(widget=forms.CheckboxSelectMultiple, choices=INTEREST_FIELDS,
                                          label='interests')

    class Meta:
        model = models.Participant
        fields = ['name', 'family', 'name_english', 'family_english', 'phone_number', 'national_id', 'email', 'age',
                  'job', 'university',
                  'introduction_method',
                  'gender', 'city', 'country', 'grade', 'is_student', 'participate_in_wss', 'interests', 'workshops']

    def __init__(self, *args, **kwargs):
        super(ParticipantForm, self).__init__(*args, **kwargs)
        self.fields["workshops"].widget = forms.CheckboxSelectMultiple()
        self.fields["workshops"].queryset = Workshop.objects.all()
