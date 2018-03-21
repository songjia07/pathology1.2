import os
from app.models import DetectionResult
from app import db
from sqlalchemy.orm import sessionmaker


dbnames = ['svs_db',  'kfb_db']

for dbname in dbnames:
    engine = db.get_engine(bind=dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()

    detections = db_session.query(DetectionResult).all()
    for dt in detections:
        db_session.delete(dt)
    db_session.commit()
    db_session.close()