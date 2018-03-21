from sqlalchemy import *
from migrate import *


from migrate.changeset import schema
pre_meta = MetaData()
post_meta = MetaData()
annotation = Table('annotation', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('title', String(length=80)),
    Column('content', String(length=260)),
    Column('shapeType', String(length=50)),
    Column('color', String(length=50)),
    Column('partOfGroup', String(length=50)),
    Column('tumorTypes', String(length=360)),
    Column('tumorTypesDes', String(length=500)),
    Column('pathimage_imageid', String(length=100), nullable=False),
    Column('createdBy', String(length=80)),
    Column('createdTime', DateTime),
    Column('lastModifiedBy', String(length=80)),
    Column('lastModifiedTime', DateTime),
)

detection_result = Table('detection_result', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('pathimage_imageid', String(length=100), nullable=False),
    Column('detectionType', String(length=50)),
    Column('algoVersion', String(length=50)),
    Column('filepath', String(length=120)),
)

path_image = Table('path_image', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('imageid', String(length=100)),
    Column('filepath', String(length=120)),
    Column('filename', String(length=80)),
    Column('thumbnail', String(length=120)),
    Column('filesize', String(length=20)),
    Column('pixelsize', String(length=40)),
    Column('scanningMagnification', Integer),
    Column('resolutionRatio', String(length=40)),
    Column('patientId', Integer),
)

patient_record = Table('patient_record', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('patientname', String(length=80)),
    Column('age', Integer),
    Column('sex', String(length=20)),
    Column('position', String(length=50)),
    Column('description', String(length=120)),
    Column('dateOfInspection', Date),
    Column('inspectionInstitution', String(length=120)),
)

point = Table('point', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('annotation_id', Integer, nullable=False),
    Column('index', Integer, nullable=False),
    Column('x', Float),
    Column('y', Float),
)

user = Table('user', post_meta,
    Column('id', Integer, primary_key=True, nullable=False),
    Column('username', String(length=80)),
    Column('password', String(length=50)),
    Column('email', String(length=120)),
    Column('roleid', Integer, default=ColumnDefault(0)),
    Column('dbname', String(length=50)),
)


def upgrade(migrate_engine):
    # Upgrade operations go here. Don't create your own engine; bind
    # migrate_engine to your metadata
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['annotation'].create()
    post_meta.tables['detection_result'].create()
    post_meta.tables['path_image'].create()
    post_meta.tables['patient_record'].create()
    post_meta.tables['point'].create()
    post_meta.tables['user'].create()


def downgrade(migrate_engine):
    # Operations to reverse the above upgrade go here.
    pre_meta.bind = migrate_engine
    post_meta.bind = migrate_engine
    post_meta.tables['annotation'].drop()
    post_meta.tables['detection_result'].drop()
    post_meta.tables['path_image'].drop()
    post_meta.tables['patient_record'].drop()
    post_meta.tables['point'].drop()
    post_meta.tables['user'].drop()
