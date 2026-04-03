"""
Django production settings for Gestor Guerreros de Maporal VC.
"""

import os
from .base import *  # noqa: F401, F403

# =============================================================================
# SECURITY
# =============================================================================

SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')

DEBUG = False

ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '').split(',')


# =============================================================================
# DATABASE (PostgreSQL for production)
# =============================================================================

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB', 'guerreros_vc'),
        'USER': os.environ.get('POSTGRES_USER', 'guerreros_admin'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD', ''),
        'HOST': os.environ.get('POSTGRES_HOST', 'db'),
        'PORT': os.environ.get('POSTGRES_PORT', '5432'),
    }
}


# =============================================================================
# CORS
# =============================================================================

CORS_ALLOWED_ORIGINS = os.environ.get(
    'CORS_ALLOWED_ORIGINS', 'http://localhost'
).split(',')

CORS_ALLOW_CREDENTIALS = True


# =============================================================================
# STATIC FILES
# =============================================================================

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # Carpeta final para producción

# Aquí indicamos dónde buscar estáticos adicionales
STATICFILES_DIRS = [
    BASE_DIR.parent / 'frontend' / 'build' / 'static',  # Ruta al build del frontend
]


# =============================================================================
# SECURITY HEADERS
# =============================================================================

SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
X_FRAME_OPTIONS = 'DENY'
