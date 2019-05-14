const socketio = io();
socketio.on('message', (message) => {
    console.log(message);
});
document.querySelector('#msg').addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.message.value
    socketio.emit('sendMsg', msg);
});
document.querySelector('#location').addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Sinu browser ei toeta asukoha jagamist. Kasuta uuemat veebilehitsejat');
    }
    navigator.geolocation.getCurrentPosition((position) => {
        socketio.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });
});


