import os
from app.models import PathImage
from app import db
from openslide import open_slide
from common import kfbslide
from sqlalchemy.orm import sessionmaker
from PIL import Image
from config import basedir



def load_img(imgfolderpath, db_session,thumbnailmaxsize = 512):
    imgs = os.listdir(imgfolderpath)
    imgNum = len(imgs)
    for i in range(imgNum):
        slidefile = imgfolderpath+"/"+imgs[i]
        try:
            if 'kfb' in slidefile:
                slide = kfbslide.KfbSlide(slidefile)
            else:
                slide = open_slide(slidefile)
            filename = os.path.splitext(imgs[i])[0]
            imageid = filename
            im = slide.associated_images['thumbnail']

            if im.size[0] > thumbnailmaxsize or im.size[1] > thumbnailmaxsize:
                if im.size[0] > im.size[1]:
                    newWidth = thumbnailmaxsize
                    newHeight = float(thumbnailmaxsize) / im.size[0] * im.size[1]
                else:
                    newHeight = thumbnailmaxsize
                    newWidth = float(thumbnailmaxsize) / im.size[1] * im.size[0]
                im.thumbnail((newWidth, newHeight), Image.ANTIALIAS)

            if im.mode != 'RGB':
                im = im.convert('RGB')
            thumbnailfile = basedir + '/app/static/thumbnail/' + filename + "_thumbnail.jpg"
            im.save(thumbnailfile, "JPEG")
        except:
            print("failed to import " + slidefile)
        else:
            existimage = db_session.query(PathImage).filter_by(filename=filename).first()
            if existimage is None:
                existimage = db_session.query(PathImage).filter_by(filepath=slidefile).first()
                if existimage is None:
                    image = PathImage()
                    image.filepath = slidefile
                    image.imageid = imageid
                    image.filename = filename
                    db_session.add(image)
                    db_session.commit()
                    continue
            existimage.thumbnail = thumbnailfile
            existimage.imageid = imageid
            existimage.filepath = slidefile
            existimage.filename = filename
            db_session.merge(existimage)
            db_session.commit()

image_dir = '/home/shu/Desktop'
imagedir_svs = image_dir + '/svs'
engine = db.get_engine(bind='svs_db')
DBSession = sessionmaker(bind=engine)
db_session = DBSession()
load_img(imagedir_svs, db_session)
db_session.close()

imagedir_kfb = image_dir + '/kfb'
engine = db.get_engine(bind='kfb_db')
DBSession = sessionmaker(bind=engine)
db_session = DBSession()
load_img(imagedir_kfb, db_session)
db_session.close()
