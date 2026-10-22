import re

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.core import mail
from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken
from rest_framework_simplejwt.tokens import RefreshToken

from common.testing import PASSWORD, APITest, make_participant, throttle_rates
from participant.models import Participant

User = get_user_model()
NEW_PASSWORD = 'another-long-passphrase'


class SignUpTests(APITest):
    def sign_up(self, email: str, password: str = PASSWORD):
        return self.client.post('/api/sign-up/', {'user': {'email': email, 'password': password}}, format='json')

    def test_creates_a_participant_with_a_normalised_email(self):
        response = self.sign_up('  Ada@Example.COM ')

        self.assertEqual(response.status_code, 201)
        participant = Participant.objects.get(user__email='ada@example.com')
        self.assertEqual(response.json(), {'user': {'id': participant.user_id, 'email': 'ada@example.com'}})
        self.assertTrue(participant.info.is_open_to_work)

    def test_an_email_is_taken_whatever_its_case(self):
        make_participant('ada@example.com')
        response = self.sign_up('ADA@example.com')
        self.assertEqual(response.status_code, 400)
        self.assertIn('email_taken', self.error_codes(response))

    def test_weak_passwords_are_rejected(self):
        response = self.sign_up('ada@example.com', '12345678')
        self.assertEqual(response.status_code, 400)
        self.assertFalse(User.objects.filter(email='ada@example.com').exists())


class SignInTests(APITest):
    def sign_in(self, email: str, password: str = PASSWORD):
        return self.client.post('/api/sign-in/', {'email': email, 'password': password}, format='json')

    def test_email_is_case_insensitive(self):
        make_participant('ada@example.com')
        response = self.sign_in('ADA@Example.com')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(set(response.json()), {'access', 'refresh'})

    def test_wrong_password_is_a_401(self):
        make_participant('ada@example.com')
        self.assertEqual(self.sign_in('ada@example.com', 'wrong-password').status_code, 401)

    def test_legacy_accounts_sharing_an_email_sign_in_with_their_own_password(self):
        make_participant('Ada@example.com', password='first-account-pass')
        second = make_participant('ada@example.com', password='second-account-pass')
        response = self.sign_in('ada@example.com', 'second-account-pass')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(str(RefreshToken(response.json()['refresh'])['user_id']), str(second.user_id))

    def test_attempts_against_one_account_are_capped_across_addresses(self):
        make_participant('ada@example.com')
        with throttle_rates(sign_in='100/min', sign_in_email='2/min'):
            for address in ('1.1.1.1', '2.2.2.2'):
                self.client.post(
                    '/api/sign-in/', {'email': 'ada@example.com', 'password': 'x'}, REMOTE_ADDR=address
                )
            response = self.client.post(
                '/api/sign-in/', {'email': 'ada@example.com', 'password': PASSWORD}, REMOTE_ADDR='3.3.3.3'
            )
        self.assertEqual(response.status_code, 429)

    def test_clients_are_told_apart_by_the_last_forwarded_address(self):
        with throttle_rates(sign_in='1/min', sign_in_email='100/min'):
            first = self.sign_in_from('spoofed, 10.0.0.1')
            second_client = self.sign_in_from('spoofed, 10.0.0.2')
            first_again = self.sign_in_from('other-spoof, 10.0.0.1')
        self.assertEqual(first.status_code, 401)
        self.assertEqual(second_client.status_code, 401)
        self.assertEqual(first_again.status_code, 429)

    def sign_in_from(self, forwarded_for: str):
        return self.client.post(
            '/api/sign-in/', {'email': 'nobody@example.com', 'password': 'x'}, HTTP_X_FORWARDED_FOR=forwarded_for
        )


class PasswordResetTests(APITest):
    def setUp(self):
        super().setUp()
        self.participant = make_participant('ada@example.com')

    def request_reset(self, email: str):
        return self.client.post('/api/password-reset/', {'email': email}, format='json')

    def confirm(self, token: str, email: str = 'ada@example.com', password: str = NEW_PASSWORD):
        return self.client.put(
            '/api/password-reset/', {'email': email, 'token': token, 'password': password}, format='json'
        )

    def token_from_email(self) -> str:
        return re.search(r'/reset-password/(\S+)', mail.outbox[-1].body).group(1)

    def test_the_answer_does_not_reveal_whether_an_account_exists(self):
        known = self.request_reset('ADA@example.com')
        unknown = self.request_reset('nobody@example.com')
        self.assertEqual(known.status_code, 200)
        self.assertEqual(known.json(), unknown.json())
        self.assertEqual(len(mail.outbox), 1)
        self.assertEqual(mail.outbox[0].to, ['ada@example.com'])

    def test_the_emailed_link_resets_the_password_once_and_signs_out_other_sessions(self):
        session = RefreshToken.for_user(self.participant.user)
        self.request_reset('ada@example.com')
        token = self.token_from_email()

        self.assertEqual(self.confirm(token).status_code, 200)
        self.participant.user.refresh_from_db()
        self.assertTrue(self.participant.user.check_password(NEW_PASSWORD))
        self.assertTrue(BlacklistedToken.objects.filter(token__jti=session['jti']).exists())

        reused = self.confirm(token, password='yet-another-passphrase')
        self.assertEqual(reused.status_code, 400)
        self.assertIn('invalid_token', self.error_codes(reused))

    def test_a_token_only_works_with_its_account_email(self):
        make_participant('eve@example.com')
        token = default_token_generator.make_token(self.participant.user)
        self.assertEqual(self.confirm(token, email='eve@example.com').status_code, 400)

    def test_forged_tokens_are_rejected(self):
        self.assertEqual(self.confirm('1234567890').status_code, 400)

    def test_the_new_password_must_be_strong(self):
        token = default_token_generator.make_token(self.participant.user)
        response = self.confirm(token, password='password')
        self.assertEqual(response.status_code, 400)
        self.participant.user.refresh_from_db()
        self.assertTrue(self.participant.user.check_password(PASSWORD))

    def test_requests_for_one_address_are_capped(self):
        with throttle_rates(password_reset='100/hour', password_reset_email='2/hour'):
            responses = [self.request_reset('ada@example.com').status_code for _ in range(3)]
        self.assertEqual(responses, [200, 200, 429])
        self.assertEqual(len(mail.outbox), 2)


class PasswordChangeTests(APITest):
    def setUp(self):
        super().setUp()
        self.participant = make_participant()
        self.authenticate(self.participant)

    def change(self, old: str, new: str):
        return self.client.put('/api/password-change/', {'old_password': old, 'new_password': new}, format='json')

    def test_requires_the_current_password(self):
        self.assertEqual(self.change('wrong', NEW_PASSWORD).status_code, 400)

    def test_changes_the_password(self):
        self.assertEqual(self.change(PASSWORD, NEW_PASSWORD).status_code, 200)
        self.participant.user.refresh_from_db()
        self.assertTrue(self.participant.user.check_password(NEW_PASSWORD))

    def test_missing_fields_are_a_400_not_a_crash(self):
        self.assertEqual(self.client.put('/api/password-change/', {}, format='json').status_code, 400)
