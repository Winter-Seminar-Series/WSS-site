from django.apps import AppConfig


class ParticipantConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'participant'

    def ready(self):
        from participant import signals  # noqa: F401  (connects the receivers)
