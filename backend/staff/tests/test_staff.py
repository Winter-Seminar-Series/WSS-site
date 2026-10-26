from django.core.exceptions import ValidationError

from common.testing import APITest, make_event
from staff.models import Staff, StaffTeam, StaffTeamMember


class StaffLinksTests(APITest):
    def setUp(self):
        super().setUp()
        self.event = make_event()
        self.team = StaffTeam.objects.create(name='Technical', event=self.event)

    def member(self, **fields):
        staff = Staff.objects.create(name='Ada', **fields)
        StaffTeamMember.objects.create(staff=staff, staff_team=self.team)
        return staff

    def listed(self):
        response = self.client.get(f'/api/staff/{self.event.pk}/')
        self.assertEqual(response.status_code, 200)
        return response.json()[0]['members'][0]['staff']

    def test_links_are_optional_and_default_to_empty(self):
        self.member()
        staff = self.listed()
        for field in ('website', 'linkedin', 'github', 'email'):
            self.assertEqual(staff[field], '')

    def test_links_are_served_publicly(self):
        self.member(
            website='https://ada.example.com',
            linkedin='https://www.linkedin.com/in/ada',
            github='https://github.com/ada',
            email='ada@example.com',
        )
        staff = self.listed()
        self.assertEqual(staff['github'], 'https://github.com/ada')
        self.assertEqual(staff['email'], 'ada@example.com')

    def test_staff_list_query_count_is_constant(self):
        for _ in range(4):
            self.member(github='https://github.com/ada')
        with self.assertNumQueries(3):
            self.client.get(f'/api/staff/{self.event.pk}/')

    def test_scripting_schemes_are_rejected(self):
        staff = Staff(name='Eve', website='javascript:alert(1)')
        with self.assertRaises(ValidationError) as ctx:
            staff.full_clean()
        self.assertIn('website', ctx.exception.message_dict)
