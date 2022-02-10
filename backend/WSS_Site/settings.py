'''
Django settings for WSS_Site project.

Generated by 'django-admin startproject' using Django 1.11.6.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
'''

from django.utils.log import DEFAULT_LOGGING
import os
import sentry_sdk
from sentry_sdk.integrations.django import DjangoIntegration
from datetime import timedelta

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ.get('WSS_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']
CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOWED_ORIGINS = [
    'http://localhost',
    'https://localhost',
    'http://localhost:80',
    'https://localhost:80',
]

# Application definition

WSS_APPS = [
    'WSS',
    'events',
    'people',
    'api',
]

INSTALLED_APPS = [
    'jet.dashboard',
    'jet',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_extensions',
    'polymorphic',
    'sorl.thumbnail',
    'taggit',
    'crispy_forms',
    'rest_framework',
    'knox',
    'django_rest_passwordreset',
    'dbbackup',
    'corsheaders',
    'storages'
] + WSS_APPS

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'WSS_Site.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
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

WSGI_APPLICATION = 'WSS_Site.wsgi.application'

# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'wss_database',
        'USER': 'wss_user',
        'PASSWORD': os.environ.get('WSS_DB_PASSWORD'),
        'HOST': 'database',
        'PORT': '5432',
    }
}

# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/backend-statics/'
STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

JET_SIDE_MENU_COMPACT = True
JET_SIDE_MENU_CUSTOM_APPS = [
    ('WSS', [
        'WSS',
        'Sponsor',
        'ExternalLink',
        'Participant',
        'ShortLink',
        'Reserve',
        'Grade',
        'Announcement'
    ]),
    ('people', [
        'Speaker',
        'HoldingTeam',
        'Role',
        'TechnicalExpert',
        'Staff',
    ]),
    ('events', [
        'Venue',
        'Seminar',
        'Workshop',
        'Event',
    ]),
    ('auth', [
        'User',
        'Group',
    ]),

]
JET_CHANGE_FORM_SIBLING_LINKS = False
JET_INDEX_DASHBOARD = 'WSS_Site.dashboard.IndexDashboard'


DEFAULT_LOGGING['handlers']['console']['filters'] = []
TAGGIT_CASE_INSENSITIVE = True
CRISPY_TEMPLATE_PACK = 'bootstrap4'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'debug.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
        'payment': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

# used for events times in serialization
CLIENT_TIME_DELTA = timedelta(hours=3, minutes=30)

PAYMENT_SETTING = {
    'MERCHANT': os.environ.get('PAYMENT_MERCHANT'),
    'wsdl': os.environ.get('PAYMENT_WSDL'),
    'description': 'WSS {} registration fee for user {}',
    'payment_url': os.environ.get('PAYMENT_URL')
}

SENTRY_TOKEN = os.environ.get('SENTRY_TOKEN')
sentry_sdk.init(
    dsn=f'https://{SENTRY_TOKEN}@o445959.ingest.sentry.io/5527905',
    integrations=[DjangoIntegration()],
    traces_sample_rate=0.0,

    # If you wish to associate users to errors (assuming you are using
    # django.contrib.auth) you may enable sending PII data.
    send_default_pii=True
)

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # 'rest_framework.authentication.BasicAuthentication',
        # 'rest_framework.authentication.SessionAuthentication',
        'knox.auth.TokenAuthentication',
    ],
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
        'rest_framework_csv.renderers.CSVRenderer',
    ),
}

DBBACKUP_STORAGE = 'storages.backends.dropbox.DropBoxStorage'
DBBACKUP_STORAGE_OPTIONS = {
    'oauth2_access_token': os.environ.get('DROPBOX_AUTH_TOKEN'),
}
# Number of backups to keep when running `dbbackup --clean`
DBBACKUP_CLEANUP_KEEP = 100

DEFAULT_FILE_STORAGE = 'storages.backends.dropbox.DropBoxStorage'
DROPBOX_OAUTH2_TOKEN = os.environ.get('DROPBOX_AUTH_TOKEN')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_HOST_USER = 'wss.sharif@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('WSS_EMAIL_PASSWORD')

# Keep this portion of code always at the end of this file,
# for the sake of being able to override everything by local_settings.py
local_settings_path = os.path.join(
    os.path.dirname(__file__), 'local_settings.py')
if os.path.exists(local_settings_path):
    exec(open(local_settings_path, 'rb').read())
