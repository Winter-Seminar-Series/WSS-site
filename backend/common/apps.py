from django.apps import AppConfig


class CommonConfig(AppConfig):
    """Cross-cutting pieces shared by every app: throttling, upstream errors, health check."""

    name = 'common'
    default_auto_field = 'django.db.models.BigAutoField'
