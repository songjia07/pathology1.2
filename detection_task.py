import os
from ai.api import config_fun
#from api import prob_map_fcn as prob_map
from ai.api import prob_map_fcn_kb as prob_map
# from api import prob_map_cls as prob_map
from ai.api import heat_map_fun

import numpy as np
from ai import train_helper
from app import celery
from app.models import DetectionResult
from app import db
from sqlalchemy.orm import sessionmaker


@celery.task
def doDetection(fileName,imageId,detectionType,dbname):
    filedir_filename = os.path.split(fileName)
    result_dir = filedir_filename[0] + '_' + detectionType
    if not os.path.exists(result_dir):
        os.makedirs(result_dir)
    result_basename = result_dir + '/' + filedir_filename[1]

    cfg = config_fun.config()
    # torch.cuda.set_device(int(cfg.gpu_id))
    model = train_helper.get_model(cfg, load_param_from_folder=True)
    model.cuda()
    model.eval()

    raw_img, b_map, p_map = prob_map.generate_prob_map(cfg, model, fileName)

    np.save(result_basename + '.pmap.npy', p_map)

    htmap_img = heat_map_fun.get_heatmap_from_prob(p_map)
    heatmapfileName = result_basename +'.heatmap.jpg'
    htmap_img.save(heatmapfileName)
    htmap_img.close()

    on_success(heatmapfileName,imageId,detectionType,dbname)

#doDetection('/home/songjia/Documents/svs/5411.svs','5411','classical','svs_db')

def on_success(heatmapfileName,imageId,detectionType,dbname):
    engine = db.get_engine(bind=dbname)
    DBSession = sessionmaker(bind=engine)
    db_session = DBSession()
    
    detectionResult = DetectionResult()
    detectionResult.detectionType = detectionType
    detectionResult.pathimage_imageid = imageId
    detectionResult.filepath = heatmapfileName

    print('resp[0]' + heatmapfileName)

    db_session.add(detectionResult)
    db_session.commit()
    db_session.close()