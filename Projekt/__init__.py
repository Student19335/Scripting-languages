from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import logging

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
    
socketio = SocketIO(app)

