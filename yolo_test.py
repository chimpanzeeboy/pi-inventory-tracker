import numpy as np
import time
import cv2
import os
import pandas as pd

#Set minimum confidence
CONFIDENCE = 0.5
NMS_THRESHOLD =0.3

labelsPath = os.path.join('yolov4-tiny','obj.names')
LABELS = open(labelsPath).read().strip().split("\n")

#Set series for counting objects (get only same object with at least 5 frames)
last_count = pd.Series(np.zeros(len(LABELS)))
last_count.index = LABELS
now_count = pd.Series(np.zeros(len(LABELS)))
now_count.index = LABELS
true_count = pd.Series(np.zeros(len(LABELS)))
true_count.index = LABELS
first = True
CONSECUTIVE_FRAME = 5
count = 0


#Initialize a list of colors to represent each class
np.random.seed(42)
COLORS = np.random.randint(0, 255, size=(len(LABELS),3), dtype='uint8')

#Derive the paths to the YOLO weights and model config
weightsPath = os.path.join('yolov4-tiny','custom-yolov4-tiny-detector_best.weights')
configPath = os.path.join('yolov4-tiny','custom-yolov4-tiny-detector.cfg')

#Initialize the DarkNet
net = cv2.dnn.readNetFromDarknet(configPath,weightsPath)
ln = net.getLayerNames()
ln = [ln[i - 1] for i in net.getUnconnectedOutLayers()]
print(ln)

#Read from webcam
vid = cv2.VideoCapture(0)


while True:

    ret, image = vid.read()

    if not ret:
        break
    
    (H, W) = image.shape[:2]

    #Preprocess image
    blob = cv2.dnn.blobFromImage(image, 1/255.0, (416,416), swapRB=True, crop=False)
    net.setInput(blob)
    start = time.time()
    layerOutputs = net.forward(ln)
    end = time.time()

    #Show timing information on YOLO
    print("YOLO took {:.6f} seconds".format(end-start))

    boxes = []
    confidences = []
    classIDs = []

    for output in layerOutputs:
        for detection in output:
            scores = detection[5:]
            classID = np.argmax(scores)
            confidence = scores[classID]

            if confidence > CONFIDENCE:

                box = detection[0:4] * np.array([W, H, W, H])
                (centerX, centerY, width, height) = box.astype('int')

                x = int(centerX-(width/2))
                y = int(centerY - (height/2))

                boxes.append([x, y, int(width), int(height)])
                confidences.append(float(confidence))
                classIDs.append(classID)

    idxs = cv2.dnn.NMSBoxes(boxes, confidences, CONFIDENCE, NMS_THRESHOLD)
    now_count = pd.Series(np.zeros(len(LABELS)))
    now_count.index = LABELS
    if len(idxs) > 0:
        for i in idxs.flatten():

            (x,y) = (boxes[i][0], boxes[i][1])
            (w,h) = (boxes[i][2], boxes[i][3])

            color = [int(c) for c in COLORS[classIDs[i]]]
            cv2.rectangle(image, (x, y), (x+w, y+h), color, 2)
            text = "{}: {:.4f}".format(LABELS[classIDs[i]], confidences[i])
            cv2.putText(image, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,0.5, color, 2)
            now_count.loc[LABELS[classIDs[i]]] += 1
    #Check for same object in consecutive FRAMES
    if not first:
        if now_count.equals(last_count):
            count += 1
        else:
            count = 0
        if count >= CONSECUTIVE_FRAME:
            true_count = now_count.copy()
    else:
        first = False

    last_count = now_count.copy()  
    print(true_count[true_count>0])




    
    cv2.imshow('Image',image)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
vid.release()

cv2.destroyAllWindows()
    