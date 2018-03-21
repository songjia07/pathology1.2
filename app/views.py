#-*- coding: UTF-8 -*-

from flask import render_template, flash, redirect, session, url_for, request, g, abort, make_response
from flask_login import login_user, logout_user, current_user, login_required
import openslide
from openslide import ImageSlide, open_slide
from openslide.deepzoom import DeepZoomGenerator
from app import app, db, lm
from .forms import LoginForm, RegisterForm, SearchForm
from .models import User, PathImage, Annotation, Point, DetectionResult
from config import SLIDE_NAME
from config import IMAGES_PER_PAGE
from unicodedata import normalize
import re
from io import BytesIO
from common import kfb_deepzoom
from common import kfbslide
from sqlalchemy.orm import sessionmaker
import math
import datetime
import detection_task
import base64


@app.route('/main', methods=['GET', 'POST'])
@app.route('/main/<int:page>', methods=['GET', 'POST'])
@login_required
def main(page=0):
    user = current_user
    form = SearchForm()
    engine = db.get_engine(bind=user.dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()
    if form.validate_on_submit():
        page = 1
        searchtext = form.searchtext.data
        session["searchtext"] = searchtext
        images = db_session.query(PathImage).filter(PathImage.imageid.like(searchtext + '%'))
    elif page == 0:
        session["searchtext"] = ""
        page = 1
        images = db_session.query(PathImage)
    elif session["searchtext"] == "":
        images = db_session.query(PathImage)
    else:
        form.searchtext.data = session["searchtext"]
        images = db_session.query(PathImage).filter(PathImage.imageid.like(session["searchtext"] + '%'))

    db_session.close()

    imagesinorder = images.order_by(PathImage.imageid.desc()).all()
    image_num = len(imagesinorder)
    pages = {}
    if image_num > 0:
        pagesnum = int(math.ceil(image_num * 1.0 / IMAGES_PER_PAGE))
        pages = range(1, pagesnum+1)
        startindex = (page - 1) * IMAGES_PER_PAGE
        endindex = page * IMAGES_PER_PAGE
        if endindex > image_num:
            endindex = image_num
        imagesincurrentpage = imagesinorder[startindex: endindex]
    else:
        imagesincurrentpage = {}

    return render_template("main.html",
                           user=user,
                           searchresults=imagesincurrentpage,
                           pages=pages,
                           currentpage=page,
                           canlogout=True,
                           form=form
                           )


@app.route('/<filename>.image', methods=['GET', 'POST'])
def image(filename):
    user = current_user
    engine = db.get_engine(bind=user.dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()

    annotationsInfo = db_session.query(Annotation).filter_by(pathimage_imageid=filename).all()

    slug = slugify(filename)
    slidempp = 'slide_mpp'
    imagesize = 'imagesize'
    if not hasattr(app,'slides'):
        app.slides = {}
        print('app.slides is null')


    if not app.slides.has_key(slug):
        print('image not exsits ' + slug)
        image = db_session.query(PathImage).filter_by(filename=filename).first()
        slidefile = image.filepath
        config_map = {
            'DEEPZOOM_TILE_SIZE': 'tile_size',
            'DEEPZOOM_OVERLAP': 'overlap',
            'DEEPZOOM_LIMIT_BOUNDS': 'limit_bounds',
        }
        opts = dict((v, app.config[k]) for k, v in config_map.items())

        if 'kfb' in slidefile:
            slide = kfbslide.KfbSlide(slidefile)
            deepzoom = kfb_deepzoom.KfbDeepZoomGenerator(slide, **opts)
        else:
            slide = open_slide(slidefile)
            deepzoom = DeepZoomGenerator(slide, **opts)

        slideinfo = {SLIDE_NAME: deepzoom}

        try:
            mpp_x = slide.properties[openslide.PROPERTY_NAME_MPP_X]
            mpp_y = slide.properties[openslide.PROPERTY_NAME_MPP_Y]
            slideinfo[slidempp] = (float(mpp_x) + float(mpp_y)) / 2
        except (KeyError, ValueError):
            slideinfo[slidempp] = 0
        slideinfo[imagesize] = [int(deepzoom.level_dimensions[-1][0]), int(deepzoom.level_dimensions[-1][1])]
        slideinfo['active'] = True
        app.slides[slug] = slideinfo

    annotaions = getannotations(annotationsInfo, app.slides[slug][imagesize], db_session,user)
    db_session.close()
    slidename = SLIDE_NAME + slug
    slide_url = url_for('dzi', slug=slidename)
    return render_template("display.html",
                           user=user,
                           slide_url=slide_url,
                           slide_mpp=app.slides[slug][slidempp],
                           canlogout=True,
                           image_name=filename,
                           annotations=annotaions,
                           imagesize=app.slides[slug][imagesize]
                           )



@app.route('/saveannotations', methods=['POST'])
def saveannotations():
    datas = request.json
    annotations = datas['annotations']
    username = datas['username']
    user = User.query.filter_by(username=username).first()
    engine = db.get_engine(bind=user.dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()

    operation = datas['operation']
    imagesize = datas['imagesize']
    for annotationinfo in annotations:
        annotationid = int(annotationinfo['id'])
        if operation == 'add':
            annotation = Annotation()
            annotation.title = annotationinfo['title']
            annotation.content = annotationinfo['content']
            annotation.shapeType = annotationinfo['shapeType']
            annotation.color = annotationinfo['color']
            annotation.partOfGroup = annotationinfo['partOfGroup']
            annotation.tumorTypes = ';'.join(annotationinfo['tumorTypes'])
            annotation.tumorTypesDes = ';'.join(annotationinfo['tumorTypesDes'])
            annotation.pathimage_imageid = datas['imageid']
            createdTime = datetime.datetime.now()
            annotation.createdBy = annotationinfo['createdBy']
            annotation.createdTime = createdTime
            annotation.lastModifiedBy = annotationinfo['lastModifiedBy']
            annotation.lastModifiedTime = createdTime
            db_session.add(annotation)
            db_session.commit()
            annotationid = annotation.id
            addPoints(annotationinfo['coordinates'], annotationid, db_session,imagesize)
        elif operation == 'delete':
            existannotations = db_session.query(Annotation).filter_by(id=annotationid).all()
            for a in existannotations:
                db_session.delete(a)
                db_session.commit()
        elif operation == 'edit':
            existannotation = db_session.query(Annotation).filter_by(id=annotationid).first()
            if existannotation is not None:
                existannotation.lastModifiedBy = annotationinfo['lastModifiedBy']
                existannotation.lastModifiedTime = datetime.datetime.now()
                db_session.query(Point).filter_by(annotation_id=annotationid).delete(synchronize_session=False)
                db_session.commit()
                addPoints(annotationinfo['coordinates'], annotationid, db_session,imagesize)
    db_session.close()
    return operation + '|' + str(annotationid)


def addPoints(points, annoid, db_session,imagesize):
    db_session.bulk_insert_mappings(
            Point,
            [
                dict(annotation_id=annoid, index=i,
                     x=float(points[i]['x'])/100 * imagesize[0], y=float(points[i]['y'])/100 * imagesize[1])
                for i in xrange(len(points))
            ]
        )
    db_session.commit()


@app.route('/<slug>.dzi')
def dzi(slug):
    format = app.config['DEEPZOOM_FORMAT']
    try:
        slide_key = slug[len(SLIDE_NAME):]
        resp = make_response(app.slides[slide_key][SLIDE_NAME].get_dzi(format))
        resp.mimetype = 'application/xml'
        return resp
    except KeyError:
        # Unknown slug
        abort(404)


class PILBytesIO(BytesIO):
    def fileno(self):
        '''Classic PIL doesn't understand io.UnsupportedOperation.'''
        raise AttributeError('Not supported')


@app.route('/<slug>_files/<int:level>/<int:col>_<int:row>.<format>')
def tile(slug, level, col, row,format):
    format = format.lower()
    if format != 'jpeg' and format != 'png':
        # Not supported by Deep Zoom
        abort(404)
    try:
        slide_key = slug[len(SLIDE_NAME):]
        tile = app.slides[slide_key][SLIDE_NAME].get_tile(level, (col, row))
    except KeyError:
        # Unknown slug
        abort(404)
    except ValueError:
        # Invalid level or coordinates
        abort(404)
    buf = PILBytesIO()
    tile.save(buf, format, quality=app.config['DEEPZOOM_TILE_QUALITY'])
    resp = make_response(buf.getvalue())
    resp.mimetype = 'image/%s' % format
    return resp


@app.route('/<imageid>_detection/<detectionType>/<username>')
def detection_result(imageid,detectionType,username):
    user = User.query.filter_by(username=username).first()
    engine = db.get_engine(bind=user.dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()

    existResult = db_session.query(DetectionResult).filter_by(pathimage_imageid=imageid,
                                                              detectionType=detectionType).first()
    if existResult is not None and existResult.filepath is not None:
        with open(existResult.filepath,'rb') as f:
            resp = base64.b64encode(f.read())
            return resp
    return ''




def slugify(text):
    text = normalize('NFKD', text.lower()).encode('ascii', 'ignore').decode()
    return re.sub('[^a-z0-9]+', '-', text)


@lm.user_loader
def load_user(id):
    return User.query.get(int(id))


@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    if current_user is not None and current_user.is_authenticated:
        return redirect(url_for('main', username=current_user.username))
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data
        user = User.query.filter_by(username=username, password=password).first()
        if user is not None:
            session['remember_me'] = form.remember_me.data
            if form.remember_me.data:
                session["username"] = username
                session['password'] = password
            user.is_authenticated = True
            user.is_active = True
            login_user(user)
            return redirect(url_for('main'))
        else:
            flash("invalid username or password")
    return render_template('index.html',
                           title='Sign In',
                           form=form)


@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route("/register", methods=["GET", "POST"])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        existuser = User.query.filter_by(username=form.username.data).first()
        if existuser is not None:
            flash('this Username has been registered.')
            return render_template("/register.html", form=form)
        else:
            existuser = User.query.filter_by(email=form.email.data).first()
            if existuser is not None:
                flash('this Email has been registered.')
                return render_template("/register.html", form=form)
        user = User()
        user.username = form.username.data
        user.password = form.password.data
        user.email = form.email.data
        user.roleid = 1
        db.session.add(user)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template("/register.html", form=form)


def getannotations(annotationsInfo, imagesize, db_session,currentuser):
    annotations = []
    for af in annotationsInfo:
        annotation = {"id": af.id,
                          "title": af.title,
                          "content": af.content,
                          "shapeType": af.shapeType,
                          "color": af.color,
                          "partOfGroup": af.partOfGroup,
                          "tumorTypes": af.tumorTypes.split(";"),
                          "tumorTypesDes": af.tumorTypesDes.split(";"),
                          "coordinates": [],
                          "createdBy": af.createdBy,
                          "lastModifiedBy": af.lastModifiedBy,
                          "editable": True}
        points = db_session.query(Point).filter_by(annotation_id=af.id).all()
        coordinates = [ {'x': 0.0, 'y': 0.0} for n in range(len(points))]
        for pt in points:
            coordinates[pt.index]['x'] = pt.x / imagesize[0] * 100
            coordinates[pt.index]['y'] = pt.y / imagesize[1] * 100
        annotation["coordinates"] = coordinates

        annotation["editable"] = getAnnotationEditable(af.createdBy,currentuser)
        annotations.append(annotation)
    return annotations


def getAnnotationEditable(createdBy, currentUser):
    return createdBy == currentUser.username or \
           currentUser.roleid == 1


@app.route('/detection', methods=['POST'])
def detection():
    datas = request.json
    detectionType = datas['detectionType']
    imageId = datas['imageid']
    username = datas['username']

    print("detection type %s , imageID %s, username %s." % (detectionType, imageId, username))

    #send msg to websocket to deteciton 

    user = User.query.filter_by(username=username).first()
    engine = db.get_engine(bind=user.dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()

    existResult = db_session.query(DetectionResult).filter_by(pathimage_imageid=imageId, detectionType=detectionType).all()
    if len(existResult) == 0:
        detectionResult = DetectionResult()
        detectionResult.detectionType = detectionType
        detectionResult.pathimage_imageid = imageId
        db_session.add(detectionResult)
        db_session.commit()

        image = db_session.query(PathImage).filter_by(imageid=imageId).first()
        db_session.close()

        detection_task.doDetection.apply_async(args=[image.filepath,imageId,detectionType,user.dbname])
        return "detecting"
    elif existResult[0].filepath is None or existResult[0].filepath == "":
        db_session.close()
        return "detecting"
    else:
        db_session.close()
        return existResult[0].filepath


@app.route('/slide_active/<imageid>', methods=['POST', 'GET'])
def slide_active(imageid):
    app.slides[imageid]['active'] = True
    print('set slides active to true of ' + imageid)
    return 'ok'


def clearSlides():
    print('clear slides')
    if hasattr(app,'slides'):
        delList = []
        for (k,v) in app.slides.items():
            if v['active']:
                v['active'] = False
                print('set slides active to false of ' + k)
            else:
                delList.append(k)

        for key in delList:
            del[app.slides[key]]
            print('delete slides of ' + key)
