from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend

User = get_user_model()


class EmailBackend(ModelBackend):
    """
    Signs participants in by email, case-insensitively. Some legacy accounts share an address in different cases,
    so every match is tried and the one whose password matches wins.
    """

    def authenticate(self, request, email=None, password=None, **kwargs):
        if not email or password is None:
            return None
        candidates = User.objects.filter(email__iexact=email.strip()).order_by('id')
        if not candidates:
            # Hash anyway, so an unknown address takes as long as a wrong password (no account enumeration by timing).
            User().set_password(password)
            return None
        for user in candidates:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user
        return None
