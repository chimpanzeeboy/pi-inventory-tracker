import numpy as np
import embedded
import pandas as pd
import os
import pickle
def compare_face(embedded_id,embedded_selfies,threshold=0.85):
    if len(embedded_id) == 0 or len(embedded_selfies) == 0:
        euclidean_distance2 = np.empty((0))
    matches = 0 
    for embedded_img in embedded_selfies: #(1,128)
        euclidean_distance2 = np.linalg.norm(embedded_img-embedded_id)
        # euclidean_distance1 = np.sqrt(np.mean((embedded_img[0]-embedded_id[0])**2))
        print(euclidean_distance2)
        if euclidean_distance2 <= threshold:
            matches +=1
    return matches > len(embedded_selfies)/2

def main():
    embedded_face = embedded.selfie_nokey()
    original_face = []
    names = pd.read_csv('names.csv')
    for name in names['Name'].tolist():
        print(name)
        with open(os.path.join(name,'encoded'),'rb') as f:
            original_face = pickle.load(f)
        print(compare_face(original_face,embedded_face))
    print(original_face)
    pass
if __name__ == '__main__':
    main()
