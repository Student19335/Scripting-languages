from __init__ import *
from routes import *
import random, time
from threading import Thread
from engineio.payload import Payload

Payload.max_decode_packets = 50

users = []
waiting_users = []
rooms = []
for i in range(0, 5):
    rooms.append(
        {
            "id": 'room' + str(i),
            "amount": 0,
            "used": False
        }
    )

@socketio.on('connect')
def connect():
    print('Client connected')

@socketio.on('disconnect')
def disconnect():
    print('Client disconnected')
    socketID = request.sid
    
    for user in users:
        if user["id"] == socketID:
            emit('left room', to=user["room"])

    index = 0
    for user in users:
        if user["id"] == socketID:
            users.pop(index)
            leave_room(user["room"], sid=socketID)
            print(user["nickname"] + ' has been removed from a list')
            break
        index += 1
    
# @socketio.on('page reload')
# def page_reload():
#     print(str(users)[1:-1]) 
#     print(request.sid)

@socketio.on('new client')
def new_client(user):
    users.append(user)

@socketio.on('message')
def message(user, msg, author):
    emit('message', {"user": user, "msg": msg, "author": author}, room=user["room"])

@socketio.on('join room')
def my_join_room(user):
    isThere = waiting_users.count(user)
    if isThere == 0:
        if user["room"] != "empty":
            current_room = None
            for room in rooms:
                if room["id"] == user["room"]:
                    current_room = room
                    break
            index = rooms.index(current_room)
            rooms[index]["used"] = False
            leave_room(user["room"])
            index = users.index(user)
            users[index]["room"] = "empty"
                    
        waiting_users.append(user)
        emit('wait for room', "nothing")

def link_clients():
    if len(waiting_users) < 2:
        return
    
    found_users = []
    for user in waiting_users:
        found_users.append(user)
        if(len(found_users) >= 2):
            break
    
    waiting_users.remove(found_users[0])
    waiting_users.remove(found_users[1])
    
    randroom = None
    hasFound = False
    index = 0
    while hasFound == False:
        for room in rooms:
            if room["used"] == False:
                randroom = room["id"]
                rooms[index]["used"] = True
                hasFound = True
                break
            index += 1

    join_room(randroom, sid=found_users[0]["id"])
    join_room(randroom, sid=found_users[1]["id"])
    
    index = 0
    found = 0
    for user in users:
        if user["id"] == found_users[0]["id"] or user["id"] == found_users[1]["id"]:
            found += 1
            if user["id"] == found_users[0]["id"]:
                found_users[0]["room"] = randroom
            if user["id"] == found_users[1]["id"]:
                found_users[1]["room"] = randroom
            user["room"] = "room0"
            users[index] = user
        index += 1

    emit('join room', found_users, to=found_users[0]["id"])
    emit('join room', found_users, to=found_users[1]["id"])

@socketio.on('left room')
def left_room(user):
    leave_room(user["room"], sid=user["id"])
    emit('left room', "", to=user["id"])
    

@socketio.on('typing')
def typing(user):
    emit('typing', user, to=user["room"]);

@socketio.on('reminder')
def reminder():
    link_clients()
    emit('update online', users)

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')


