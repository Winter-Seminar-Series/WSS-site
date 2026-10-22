"""
Settings of the WSS API.

Everything that differs between deployments comes from the environment (documented in ../.env.backend.example).
Required values use `os.environ[...]` and fail at import; optional ones fall back to the production default.
"""

import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / '.env')


def env_bool(name: str, default: bool = False) -> bool:
    return os.getenv(name, str(default)).strip().lower() in {'1', 'true', 'yes', 'on'}


def env_list(name: str, default: list[str]) -> list[str]:
    value = os.getenv(name)
    if value is None:
        return default
    return [item.strip() for item in value.split(',') if item.strip()]


# --- Core ----------------------------------------------------------------------------------------------------------

SECRET_KEY = os.environ['SECRET_KEY']
DEBUG = env_bool('DJANGO_DEBUG')

# `backend` is the compose service name the frontend and nginx call; `127.0.0.1` is the container health check.
ALLOWED_HOSTS = env_list('ALLOWED_HOSTS', ['api.wss-sharif.com', 'backend', 'localhost', '127.0.0.1'])

# The browser never calls the API itself (the frontend proxies it), so CORS only has to allow the site.
CORS_ALLOWED_ORIGINS = env_list('CORS_ALLOWED_ORIGINS', ['https://wss-sharif.com'])
CSRF_TRUSTED_ORIGINS = env_list('CSRF_TRUSTED_ORIGINS', ['https://api.wss-sharif.com', 'https://wss-sharif.com'])

# The public site, for links in emails and redirects after a free checkout.
FRONTEND_ORIGIN = os.getenv('FRONTEND_ORIGIN', 'https://wss-sharif.com').rstrip('/')

# TLS ends at Cloudflare/nginx, which set X-Forwarded-Proto.
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
CSRF_COOKIE_SECURE = not DEBUG
SESSION_COOKIE_SECURE = not DEBUG
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'drf_standardized_errors',
    'common',
    'core',
    'participant',
    'sponsor',
    'staff',
    'payment',
    'skyroom',
    'spotplayer',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'WSS.urls'
WSGI_APPLICATION = 'WSS.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# --- Data ----------------------------------------------------------------------------------------------------------

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': os.environ['DB_HOST'],
        'PORT': os.environ['DB_PORT'],
        'NAME': os.environ['DB_NAME'],
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASS'],
        # Reuse connections across requests of a gunicorn worker instead of reconnecting every time.
        'CONN_MAX_AGE': int(os.getenv('DB_CONN_MAX_AGE', '60')),
        'CONN_HEALTH_CHECKS': True,
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Rate-limit counters (common/throttling.py), shared by every gunicorn worker. Redis holds nothing that cannot be
# lost: it runs without persistence, and the throttles let requests through while it is unreachable.
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': os.getenv('REDIS_URL', 'redis://redis:6379/0'),
        'KEY_PREFIX': 'wss',
        'OPTIONS': {'socket_connect_timeout': 1, 'socket_timeout': 1},
    }
}

STORAGES = {
    'default': {
        'BACKEND': 'storages.backends.s3.S3Storage',
        'OPTIONS': {
            'access_key': os.environ['AWS_ACCESS_KEY'],
            'secret_key': os.environ['AWS_SECRET_KEY'],
            'bucket_name': os.environ['AWS_STORAGE_BUCKET_NAME'],
            'endpoint_url': 'https://s3.ir-thr-at1.arvanstorage.ir',
            # The bucket is public-read; local setups without real keys must serve unsigned URLs.
            'querystring_auth': env_bool('AWS_QUERYSTRING_AUTH', True),
        },
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage',
    },
}

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# --- Authentication ------------------------------------------------------------------------------------------------

AUTHENTICATION_BACKENDS = [
    # Participants sign in with their email; the admin keeps signing in with a username.
    'participant.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Lifetime of a password-reset link. The token is Django's HMAC token: it also dies once the password changes.
PASSWORD_RESET_TIMEOUT = int(os.getenv('PASSWORD_RESET_TIMEOUT', str(60 * 60)))

# The frontend's proxy.ts refreshes the access token a minute before it expires; keep the two in step.
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=5),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('rest_framework_simplejwt.authentication.JWTAuthentication',),
    # Private by default: public endpoints opt in with AllowAny.
    'DEFAULT_PERMISSION_CLASSES': ('rest_framework.permissions.IsAuthenticated',),
    'DEFAULT_RENDERER_CLASSES': (
        ('rest_framework.renderers.JSONRenderer', 'rest_framework.renderers.BrowsableAPIRenderer')
        if DEBUG
        else ('rest_framework.renderers.JSONRenderer',)
    ),
    'EXCEPTION_HANDLER': 'drf_standardized_errors.handler.exception_handler',
    # Clients are told apart by the last X-Forwarded-For hop: nginx appends the visitor's address (Cloudflare's
    # CF-Connecting-IP, see nginx.conf) and the frontend forwards that header unchanged. One trusted proxy hop.
    'NUM_PROXIES': int(os.getenv('NUM_PROXIES', '1')),
    # Only the endpoints worth attacking are limited (common/throttling.py); public content is not, because the
    # frontend's ISR fetches all come from one address.
    'DEFAULT_THROTTLE_RATES': {
        'sign_in': '60/min',
        'sign_in_email': '10/min',
        'sign_up': '60/hour',
        'password_reset': '20/hour',
        'password_reset_email': '3/hour',
        'password_reset_confirm': '30/hour',
        'password_change': '10/hour',
        'payment': '30/min',
    },
}

# --- Integrations --------------------------------------------------------------------------------------------------

# Seconds before a call to the payment service, Skyroom or SpotPlayer is abandoned.
INTEGRATION_TIMEOUT = float(os.getenv('INTEGRATION_TIMEOUT', '15'))

PAYMENT_SERVICE_URL = os.getenv('PAYMENT_SERVICE_URL', 'http://payment:8080').rstrip('/')
PAYMENT_CALLBACK_URL = os.getenv('PAYMENT_CALLBACK_URL', f'{FRONTEND_ORIGIN}/callback').rstrip('/')

SKYROOM_API_KEY = os.getenv('SKYROOM_API_KEY', '')
SPOTPLAYER_API_KEY = os.getenv('SPOTPLAYER_API_KEY', '')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv('EMAIL_HOST')
EMAIL_PORT = int(os.getenv('EMAIL_PORT', '465'))
EMAIL_HOST_USER = os.getenv('EMAIL_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_PASS')
EMAIL_USE_TLS = False
EMAIL_USE_SSL = True
EMAIL_TIMEOUT = 15

DEFAULT_FROM_EMAIL = os.getenv('EMAIL_FROM_ADDRESS', 'info@wss-sharif.com')
SERVER_EMAIL = f"{os.getenv('EMAIL_FROM_NAME', 'WSS')} <{DEFAULT_FROM_EMAIL}>"

# --- Logging -------------------------------------------------------------------------------------------------------

# One line per record on stdout, collected by Docker. Never log credentials, tokens or personal data.
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'line': {'format': '%(asctime)s %(levelname)s %(name)s: %(message)s'},
    },
    'handlers': {
        'console': {'class': 'logging.StreamHandler', 'formatter': 'line'},
    },
    'root': {'handlers': ['console'], 'level': os.getenv('LOG_LEVEL', 'INFO')},
    'loggers': {
        'django.request': {'level': 'WARNING'},
        # Scanners probing the origin with other Host headers: refused with a 400, not worth a traceback each.
        'django.security.DisallowedHost': {'handlers': [], 'propagate': False},
    },
}
