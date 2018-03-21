from app import db


class User(db.Model):
    __bind_key__ = None
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True)
    password = db.Column(db.String(50))
    email = db.Column(db.String(120), unique=True)
    roleid = db.Column(db.Integer, default=0)
    dbname = db.Column(db.String(50))

    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3


class PathImage(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    imageid = db.Column(db.String(100), unique=True)
    filepath = db.Column(db.String(120))
    filename = db.Column(db.String(80))
    thumbnail = db.Column(db.String(120))

    filesize = db.Column(db.String(20))
    pixelsize = db.Column(db.String(40))
    scanningMagnification = db.Column(db.Integer)
    resolutionRatio = db.Column(db.String(40))

    patientId = db.Column(db.Integer)

    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3


class Annotation(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(80))
    content = db.Column(db.String(260))
    shapeType = db.Column(db.String(50))
    color = db.Column(db.String(50))
    partOfGroup = db.Column(db.String(50))
    tumorTypes = db.Column(db.String(360))
    tumorTypesDes = db.Column(db.String(500))

    pathimage_imageid = db.Column(db.String(100), nullable=False)

    createdBy = db.Column(db.String(80))
    createdTime = db.Column(db.DateTime)
    lastModifiedBy = db.Column(db.String(80))
    lastModifiedTime = db.Column(db.DateTime)


    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3


class Point(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    annotation_id = db.Column(db.Integer, nullable=False)
    index = db.Column(db.Integer, nullable=False)
    x = db.Column(db.Float)
    y = db.Column(db.Float)

    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3


class PatientRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    patientname = db.Column(db.String(80))
    age = db.Column(db.Integer)
    sex = db.Column(db.String(20))

    position = db.Column(db.String(50))
    description = db.Column(db.String(120))
    dateOfInspection = db.Column(db.Date)
    inspectionInstitution = db.Column(db.String(120))

    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3


class DetectionResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    pathimage_imageid = db.Column(db.String(100), nullable=False)
    detectionType = db.Column(db.String(50))
    algoVersion = db.Column(db.String(50))
    filepath = db.Column(db.String(120))

    is_authenticated = True

    is_active = True

    is_anonymous = False

    def get_id(self):
        try:
            return unicode(self.id)  # python 2
        except NameError:
            return str(self.id)  # python 3




