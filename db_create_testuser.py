import os
from app.models import User
from app import db


usersinfo = [{'userbasename': 'testsvs_doctor', 'password': 'testsvs',
              'dbname': 'svs_db', 'roleid': ROLE_DOCTOR},
             {'userbasename': 'testsvs_annotate', 'password': 'testsvs',
              'dbname': 'svs_db', 'roleid': ROLE_ANNOTATE},
             {'userbasename': 'testsvs_reviewer', 'password': 'testsvs',
              'dbname': 'svs_db', 'roleid': ROLE_REVIEWER},
             {'userbasename': 'testsvs_admin', 'password': 'testsvs',
              'dbname': 'svs_db', 'roleid': ROLE_ADMIN},
             ]
usernum = 4
for userinfo in usersinfo:
    for i in range(usernum):
        username = userinfo['userbasename'] + str(i)
        existuser = User.query.filter_by(username=username).first()
        if existuser is None:
            user = User()
            user.username = username
            user.password = userinfo['password']
            user.dbname = userinfo['dbname']
            user.roleid = userinfo['roleid']
            db.session.add(user)
            db.session.commit()
        else:
            existuser.username = username
            existuser.password = userinfo.password
            existuser.dbname = userinfo.dbname
            existuser.roleid = userinfo.roleid
            db.session.merge(existuser)
            db.session.commit()

