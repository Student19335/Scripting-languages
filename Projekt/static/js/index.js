let socket = io();

let messagesList = document.getElementById('chat-messages');
let message      = document.getElementById('input-text');
let messageBtn   = document.getElementById('input-btn');
let randomBtn    = document.getElementById('rand-btn');
message.focus();
messageBtn.disabled = true;
message.disabled = true;

messageBtn.addEventListener('click', () => {
    if(message.value !== '') {
        socket.emit('message', user, message.value, user.nickname);
        message.value = "";
        message.focus();
    }
});

randomBtn.addEventListener('click', (e) => {
    removeChildren(messagesList);
    if(stranger !== undefined) {
        console.log(stranger);
        socket.emit('left room', stranger);
    }
    socket.emit('join room', user);
});

document.addEventListener('keyup', (e) => {
    if(e.code === 'Enter') {
        if(message.value !== '') {
            socket.emit('message', user, message.value, user.nickname);
            message.value = "";
            message.focus();
        }
    }
    
    if(e.code === 'Escape') {
        removeChildren(messagesList);
        socket.emit('join room', user);
    }
    
});

socket.on('message', (data) => {
    let msgNickname = document.createElement('p');
    msgNickname.classList.add('msg-nickname');
    if(data["user"].nickname === user.nickname) {
        msgNickname.innerHTML = 'You'
        msgNickname.style = 'color: rgb(36, 39, 238)';
    } 
    else {
        msgNickname.innerHTML = data["user"].nickname;
        document.getElementById('audio').play();
    }
    let msg = document.createElement('p');
    msg.classList.add('msg-text');
    msg.innerHTML = data["msg"];
    msg.setAttribute('author', data["user"].nickname)

    if(messagesList.lastChild.getAttribute('author') !== data['user'].nickname) {
        messagesList.appendChild(msgNickname);
    }

    messagesList.appendChild(msg);
    messagesList.scrollTop = messagesList.scrollHeight - messagesList.clientHeight;
});

function getUrlVars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
        vars[key] = value;
    });
    let newURL = new URL(window.location.href.split('?')[0]);
    //window.history.replaceState({id: 100}, window.location.href, newURL);

    return vars;
}

let user, stranger;
socket.on('connect', () => {
    console.log('Connected');

    let nickname = getUrlVars()["nickname"];
    let age = getUrlVars()["age"];
    let sex = getUrlVars()["sex"];

    user = 
    {
        id: socket.id,
        nickname: nickname,
        age: age,
        sex: sex,
        room: 'empty'
    };

    socket.emit('new client', user)
    socket.on('disconnect', () => {
        console.log('Disconnected...');
    });
});

function removeChildren(parent) {
    while(parent.lastChild) {
        parent.removeChild(parent.lastChild);
    }
}

socket.on('join room', (found_users) => {
    messageBtn.disabled = false;
    message.disabled = false;
    removeChildren(messagesList);
    if(found_users[0].id === socket.id) {
        user.room = found_users[0].room;
        stranger = found_users[1];
    }
    else if(found_users[1].id === socket.id) {
        user.room = found_users[1].room;
        stranger = found_users[0];
    }
    else console.log('Problem with found users')

    let strangerNameElement = document.getElementById('stranger-name');
    let strangerAgeElement = document.getElementById('stranger-age');
    let strangerSexElement = document.getElementById('stranger-sex');

    strangerNameElement.innerHTML = stranger.nickname;
    strangerAgeElement.innerHTML = stranger.age + ' years old';
    if(stranger.sex === 'male')
        strangerSexElement.innerHTML = '&#9794' + ' Male';
    else if(stranger.sex === 'female')
        strangerSexElement.innerHTML = '&#9792;' + ' Female';

    let msg = document.createElement('p');
    msg.classList.add('msg-alert');
    msg.innerHTML = 'Say hello to ' + stranger.nickname;
    messagesList.appendChild(msg);
    messagesList.scrollTop = messagesList.scrollHeight - messagesList.clientHeight;
});

socket.on('wait for room', (data) => {
    let msg = document.createElement('p');
    msg.classList.add('msg-alert');
    msg.innerHTML = 'Looking for a room...';
    messagesList.appendChild(msg);
    messagesList.scrollTop = messagesList.scrollHeight - messagesList.clientHeight;
});

socket.on('left room', (data) => {
    if(messagesList.lastChild.innerHTML !== stranger.nickname + ' has left the room') {
        let msg = document.createElement('p');
        msg.classList.add('msg-alert');
        msg.style = 'color: rgb(255, 86, 86)';
        msg.innerHTML = stranger.nickname + ' has left the room';
        messagesList.appendChild(msg);
        messageBtn.disabled = true;
        message.disabled = true;
        messagesList.scrollTop = messagesList.scrollHeight - messagesList.clientHeight;
    }
});

socket.on('update online', (data) => {
    let online = document.querySelector('.online-number');
    online.innerHTML = data.length;
});

function reminder() {
    socket.emit('reminder');
}

setInterval(reminder, 3000);



