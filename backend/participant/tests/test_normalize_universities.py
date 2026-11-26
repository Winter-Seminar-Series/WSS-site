import importlib

from django.apps import apps
from django.test import TestCase

from participant.models import ParticipantInfo

migration = importlib.import_module('participant.migrations.0008_normalize_universities')


class NormalizeUniversitiesTests(TestCase):
    def normalize(self, *values):
        infos = [ParticipantInfo.objects.create(university=value) for value in values]
        migration.normalize_universities(apps, None)
        return [ParticipantInfo.objects.get(pk=info.pk).university for info in infos]

    def test_spellings_become_the_select_option(self):
        self.assertEqual(
            self.normalize('Sharif', 'sharif university  of technology', 'دانشگاه صنعتی شريف', 'Sharif Univercity'),
            ['Sharif University of Technology'] * 4,
        )

    def test_aliases_and_notes_in_parentheses(self):
        self.assertEqual(
            self.normalize('IUST', 'Iran University of Science and Technology (IUST)', 'Tehran', 'Amir Kabir'),
            [
                'Iran University of Science and Technology',
                'Iran University of Science and Technology',
                'University of Tehran',
                'Amirkabir University of Technology',
            ],
        )

    def test_similar_names_stay_apart(self):
        self.assertEqual(
            self.normalize('Shiraz University of Technology', 'shiraz', 'Isfahan university of technology', 'isfahan'),
            [
                'Shiraz University of Technology',
                'Shiraz University',
                'Isfahan University of Technology',
                'University of Isfahan',
            ],
        )

    def test_azad_branches_keep_what_was_typed(self):
        branches = ['Azad karaj', 'Islamic Azad University Science and Research Branch', 'IAU(Tehran-shomal)']

        self.assertEqual(self.normalize('Azad university', *branches), ['Islamic Azad University', *branches])

    def test_anything_else_stays_as_typed(self):
        values = ['Shahed University', 'Shahid Beheshti University of Medical Sciences', 'TU Berlin', 'Azar', 'Other']

        self.assertEqual(self.normalize(*values, ''), [*values, ''])

    def test_no_two_options_share_a_spelling(self):
        migration._names_by_key()
