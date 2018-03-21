import socket
import threading
import Queue
import sys
import os

from app import db
from sqlalchemy.orm import sessionmaker
from app.models import User, PathImage, DetectionResult

#ai api
from detection_task import doDetection

lock = threading.Lock()
data_queue = Queue.Queue()
data_dict = {}
socket_client_id = 0
socket_client = {}


def add_queue(image_id, user):

    lock.acquire()

    if data_dict.has_key(image_id) :
        print('add repeated data: %s' % image_id)
        data_dict[image_id].append(user)
    else :
        data_dict[image_id] = []
        data_dict[image_id].append(user)
        data_queue.put(image_id)
        print('add queue: ', image_id)

    lock.release()

def pop_queue():
    image_id = data_queue.get()
    #users = data_dict.pop(image_id)
    print('pop queue: ', image_id)
    return image_id

def process_queue():
    print('process queue running.')
    while True:
        image_id = pop_queue()
        detection_type = 'classical' # TODO 
        db_name = 'svs_db' # TODO 

        engine = db.get_engine(bind=db_name)
        DBSession = sessionmaker(bind=engine)
        db_session = DBSession()
        existResult = db_session.query(DetectionResult).filter_by(pathimage_imageid=image_id, detectionType=detection_type).all()
        if len(existResult) == 0:
            print('check detection result empty, begin to do detection image id: %s.' % image_id)
            image = db_session.query(PathImage).filter_by(imageid=image_id).first()
            result = doDetection.delay(image.filepath, image_id, detection_type, db_name)
            result.get()  
        else :
            print('check detection result success, return right now.')
              

        lock.acquire()
        users = data_dict.pop(image_id)
        lock.release()

        users_str = ''
        for i in range(len(users)):
            if i == len(users)-1:
                users_str += users[i]
            else:
                users_str += users[i] + ','    
        print('user: %s evaluate data: %s done.' % (users_str,image_id))

        if socket_client.has_key('1'):
            socket_client['1'].send(users_str + '|' + image_id)

def console_echo():
    str = ''
    while True:
        str = raw_input()
        print(str)
        if str == 'close':
            print('close sys')
            os.kill()

def client_running(sock, addr, socket_client_id):
    print('Accept new connection from %s:%s...' % addr)
    while True:
        data = sock.recv(1024)
        if data == 'exit' or not data:
            break

        datas = data.split('|');
        user = datas[0]
        image_id = datas[1]
        print('user: %s begin evaluate data: %s' % (user,image_id))
        add_queue(image_id, user)
        
    sock.close()
    print 'Connection from %s:%s closed.' % addr 

def server_running():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.bind(('172.18.31.162', 8005))
    s.listen(5)
    print ('waiting for connect...')
    while True:
        sock, addr = s.accept()
        global socket_client_id
        socket_client_id += 1
        socket_client[str(socket_client_id)] = sock
        print(socket_client)
        t = threading.Thread(target=client_running, args=(sock, addr, socket_client_id))
        t.start()
    

if __name__ == '__main__':
    ths = []
    for i in range(0,4):
        th = threading.Thread(target=process_queue)
        th.start()
        ths.append(th)
    th_echo = threading.Thread(target=console_echo)
    th_echo.start()

    server_running()
