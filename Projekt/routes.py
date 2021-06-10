from __init__ import *

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/chat')
def chat():
    username = request.args.get('username')
    age = request.args.get('age')
    sex = request.args.get('sex')
    #socketio.emit('new-user', {username: username, age: age, sex: sex});
    return render_template('chat.html')