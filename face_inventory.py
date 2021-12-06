import numpy as np
import time
import cv2
import os
import pandas as pd
import embedded
import pickle
import paho.mqtt.client as paho



#Variable for face_recognition
REGISTER_LISTS = pd.read_csv('names.csv')['Name'].tolist()
starttime = 0
occupied = False
selfie_frames = []
embedded_selfies = []
NUM_SELFIES = 5
SELFIE_DURATION = 2.0
person_in = ""
capturing = False
exiting = False

#Checking for object count before and after the inventory is occupied

#Load face encoded features from the list of registered names
face_features = {}
for name in REGISTER_LISTS:
    print("Loading {}'s features".format(name))
    print(name)
    with open(os.path.join(name,"encoded"),'rb') as f:
        face_features[name] = pickle.load(f)

#Read from another webcam for face recognition
face_vid = cv2.VideoCapture(0)


while True:

    face_ret, face_image = face_vid.read()
    if not  face_ret:
        break

    #Show timing information on YOLO
    # print("YOLO took {:.6f} seconds".format(end-start))

    #If capturing is True, capture 5 selfies within 2 seconds, then fed it in compare_face
    if capturing:
        now = time.time()
        delta = now-starttime
        if delta>=SELFIE_DURATION/NUM_SELFIES:
            print('Capturing')
            selfie_frames.append(face_image)
            startime = time.time()
        if len(selfie_frames) == NUM_SELFIES:
            capturing=False
            embedded_selfies = [embedded.get_embedding(selfie_frame) for selfie_frame in selfie_frames]
            result = embedded.compare_face(face_features,embedded_selfies)
            if result == "":
                print("Unrecognized face")
            else:
                #-----Insert magnetic lock code here!------#
                print("Welcome! {}".format(result))
                #------------------------------------------#
                occupied = True
                person_in = result
            capturing = False

    #Clean up if the person exits
    if exiting:
        
        # print(after_count.loc['clock'])
        # print(before_count.loc['clock'])
        person_in = ""
        exiting = False
        occupied = False
        time.sleep(0.5)
    
        

    cv2.imshow('Face',face_image)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
    elif cv2.waitKey(1) == ord('i') and not capturing and not occupied:
        capturing = True
        starttime=time.time()
        print('Performing face recognition...')
    elif cv2.waitKey(1) == ord('o') and occupied:
        exiting = True
        print('{} exiting...'.format(person_in))
face_vid.release()
cv2.destroyAllWindows()