#!flask/bin/python
import imp
from migrate.versioning import api
from app import db
from config import SQLALCHEMY_DATABASE_URI
from config import SQLALCHEMY_BINDS
from config import SQLALCHEMY_MIGRATE_REPO
from config import SQLALCHEMY_BINDS_MIGRATE_REPO


migration = SQLALCHEMY_MIGRATE_REPO + '/versions/%03d_migration.py' % (api.db_version(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO) + 1)
tmp_module = imp.new_module('old_model')
old_model = api.create_model(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
exec old_model in tmp_module.__dict__
script = api.make_update_script_for_model(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO, tmp_module.meta, db.metadata)
open(migration, "wt").write(script)
api.upgrade(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO)
print 'New migration saved as ' + migration
print 'Current database version: ' + str(api.db_version(SQLALCHEMY_DATABASE_URI, SQLALCHEMY_MIGRATE_REPO))

for name, uri in SQLALCHEMY_BINDS.items():
    migration = SQLALCHEMY_BINDS_MIGRATE_REPO[name] + '/versions/%03d_migration.py' % (
            api.db_version(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name]) + 1)
    tmp_module = imp.new_module('old_model')
    old_model = api.create_model(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name])
    exec old_model in tmp_module.__dict__
    script = api.make_update_script_for_model(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name], tmp_module.meta,
                                              db.metadata)
    open(migration, "wt").write(script)
    api.upgrade(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name])
    print 'New migration saved as ' + migration
    print 'Current database version: ' + str(api.db_version(uri, SQLALCHEMY_BINDS_MIGRATE_REPO[name]))

