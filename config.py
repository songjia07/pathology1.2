CSRF_ENABLED = True
SECRET_KEY = 'you-will-never-guess'
ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])

import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import os
basedir = os.path.abspath(os.path.dirname(__file__))

dbbasedir = basedir + '/db'
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(dbbasedir, 'user.db')
SQLALCHEMY_BINDS = {
    'kfb_db':        'sqlite:///' + os.path.join(dbbasedir, 'kfb.db'),
    'svs_db':        'sqlite:///' + os.path.join(dbbasedir, 'svs.db')
}
SQLALCHEMY_MIGRATE_REPO = os.path.join(dbbasedir, 'db_repository_user')
SQLALCHEMY_BINDS_MIGRATE_REPO = {
    'kfb_db':        os.path.join(dbbasedir, 'db_repository_kfb'),
    'svs_db':        os.path.join(dbbasedir, 'db_repository_svs')
}


SQLALCHEMY_TRACK_MODIFICATIONS = True

DEEPZOOM_SLIDE = None
DEEPZOOM_FORMAT = 'jpeg'
DEEPZOOM_TILE_SIZE = 254
DEEPZOOM_OVERLAP = 1
DEEPZOOM_LIMIT_BOUNDS = True
DEEPZOOM_TILE_QUALITY = 75
SLIDE_NAME = 'slide'

IMAGES_PER_PAGE = 9


CELERY_RESULT_BACKEND = "amqp://guest:guest@localhost:5672//"
CELERY_BROKER_URL = "amqp://guest:guest@localhost:5672//"


ROLE_DOCTOR = 1
ROLE_ANNOTATE = 2
ROLE_REVIEWER = 3
ROLE_ADMIN = 4



