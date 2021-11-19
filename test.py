import pandas as pd
def items_message(items):
    items_str = str(items.to_dict())[1:-1]
    items_str = items_str.split('\'')
    items_str = ''.join(items_str)
    items_str = items_str.split(',')
    items_str = ''.join(items_str)
    items_str = items_str.split()
    items_str.remove('Juice:')
    message = []
    for i in range(len(items_str)-1):
        if items_str[i] == 'Orange':
            items_str[i] = 'Orange_Juice:'
        if i%2==0:
            message.append(''.join([items_str[i],items_str[i+1]]))
    print(message)
            
    message = ' '.join(message)
    return message
print(items_message(pd.Series({'Egg':0,'Orange Juice':1,'apple':0,'beer':0,'milk':0,'nutella':0})))