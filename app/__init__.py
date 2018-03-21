from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

import os
from flask_login import LoginManager
from config import basedir

lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'

from celery import Celery

celery = Celery(app.name,broker=app.config['CELERY_BROKER_URL'],backend=app.config['CELERY_RESULT_BACKEND'])
celery.conf.update(app.config)


from app import models, views