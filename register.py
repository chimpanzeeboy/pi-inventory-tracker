
import numpy as np
import pandas as pd
import pickle
import sys, os
import embedded

def main():
    #Read the old list of names
    names = pd.read_csv('names.csv')
    #Append the name of the new person
    name = sys.argv[1]

    if name not in names['Name'].tolist():
        names = names.append(pd.Series({'Name':name}),ignore_index=True)
        names.to_csv('names.csv',index=False)
        os.mkdir(str(name))
    else:
        print("Already Registered!")
        return
    
    #Get embedding from selfies
    embedded_selfies = embedded.selfie()
    print(len(embedded_selfies))
    encoded = np.sum(embedded_selfies,axis=0)/len(embedded_selfies)
    print(encoded.shape)

    with open(os.path.join(name,"encoded"),'wb') as f:
        pickle.dump(encoded,f)

    
if __name__ == '__main__':
    main()
    