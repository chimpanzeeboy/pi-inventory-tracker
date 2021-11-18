import paho.mqtt.client as mqtt #import the client1
import time
broker="test.mosquitto.org"
port= 8080
def on_subscribe(client, userdata, mid, granted_qos):   #create function for callback
   print("subscribed with qos",granted_qos, "\n")
   pass
def on_publish(client,userdata,mid):   #create function for callback
   print("data published mid=",mid, "\n")
   pass
def on_message(client, userdata, message):
    print("RECEIVED")
    print("message received  "  ,str(message.payload.decode("utf-8")))
def on_disconnect(client, userdata, rc):
    print("client disconnected ok") 
broker_address="test.mosquitto.org" 
#broker_address="iot.eclipse.org" #use external broker
client = mqtt.Client("P1",transport="websockets") #create new instance
client.on_message = on_message
client.on_subscribe = on_subscribe
client.on_publish = on_publish
client.connect(broker,port) #connect to broker
client.loop_start()
client.subscribe("ISE/mecha/user")
time.sleep(3)
client.publish("ISE/mecha/user","COCK")#publish
time.sleep(4)

