import paho.mqtt.client as mqtt #import the client1
broker_address="test.mosquitto.org" 
#broker_address="iot.eclipse.org" #use external broker
client = mqtt.Client("P1",transport="websockets") #create new instance
client.connect(broker_address,port=8080) #connect to broker
client.publish("home/ISE/Mechatronics/apple","HELLO")#publish