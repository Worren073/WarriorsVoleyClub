"""
Django development settings for Gestor Guerreros de Maporal VC.
"""

from .base import *  # noqa: F401, F403

# =============================================================================
# SECURITY
# =============================================================================

SECRET_KEY = 'django-insecure-dev-key-guerreros-vc-change-in-production'

DEBUG = True

ALLOWED_HOSTS = ['localhost', '127.0.0.1', '0.0.0.0']


# =============================================================================
# DATABASE (SQLite for development)
# =============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# =============================================================================
# CORS (Allow React dev server)
# =============================================================================

CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
]

CORS_ALLOW_CREDENTIALS = True


# =============================================================================
# DEVELOPMENT TOOLS
# =============================================================================

INSTALLED_APPS += [  # noqa: F405
    'django_extensions',
]
