const socketio = io();
socketio.on('message', (message) => {
    console.log(message);
});
document.querySelector('#msg').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.message.value
    socketio.emit('sendMsg', msg);
});
