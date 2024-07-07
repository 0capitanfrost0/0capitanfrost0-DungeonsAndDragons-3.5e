from pathlib import Path
import os
import dj_database_url
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get('SECRET_KEY',default='your secret key')
DEBUG = 'RENDER' not in os.environ

ALLOWED_HOSTS = ["*"]

RENDER_EXTERNAL_HOSTNAME=os.environ.get('RENDER_EXTERNAL_HOSTNAME')
if RENDER_EXTERNAL_HOSTNAME: ALLOWED_HOSTS.append(RENDER_EXTERNAL_HOSTNAME)

# Application definition
BASE_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]

LOCAL_APPS = [
    'Apps.CalculatorApp',
    'Apps.Characters',

]


THIRDS_APPS = [
    'corsheaders', # Comunica puertos BackEnd + FrontEnd
    'rest_framework',
    'import_export', 
   
]

INSTALLED_APPS = BASE_APPS+THIRDS_APPS+LOCAL_APPS

# Define the default error image path
DEFAULT_ERROR_IMAGE = 'Resources/Images/Error/error_img.jpg'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # Whitenoise
    'whitenoise.middleware.WhiteNoiseMiddleware',
    # Fin Whitenoise
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Cors
    'corsheaders.middleware.CorsMiddleware',
    # Fin-Cors
]

ROOT_URLCONF = 'CoreApp.urls'

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

WSGI_APPLICATION = 'CoreApp.wsgi.application'

DATABASES = {
    'default': dj_database_url.config(
        default='sqlite:///db.sqlite3',
        conn_max_age=600
    )

}


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

LANGUAGE_CODE = 'es-es'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'



if not DEBUG:
    STATIC_ROOT=os.path.join(BASE_DIR,'staticfiles')
    STATICFILES_STORAGE= 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOWS_CREDENTIALS = True

REST_FRAMEWORK = {'DEFAULT_SCHEMA_CLASS':'rest_framework.schemas.coreapi.AutoSchema',}

X_FRAME_OPTIONS = "SAMEORIGIN" #Para el custom admin

