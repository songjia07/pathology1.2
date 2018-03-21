#!flask/bin/python
from migrate.versioning import api
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_BINDS
from config import SQLALCHEMY_MIGRATE_REPO
from config import SQLALCHEMY_BINDS_MIGRATE_REPO
from app import db
import os.path


db.create_all()
if not os.path.exists(SQLALCHEMY_MIGRATE_REPO):
    api.create(SQLALCHEMY_MIGRATE_REPO, 'database repository')
    api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
else:
    api.version_control(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO, api.version(SQLALCHEMY_MIGRATE_REPO))

for name, uri in SQLALCHEMY_BINDS.items():
    if not os.path.exists(SQLALCHEMY_BINDS_MIGRATE_REPO[name]):
        api.create(SQLALCHEMY_BINDS_MIGRATE_REPO[name], 'database repository')
        api.version_control(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name])
    else:
        api.version_control(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name], api.version(SQLALCHEMY_BINDS_MIGRATE_REPO[name]))
