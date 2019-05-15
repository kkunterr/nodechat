const socketio = io();
const $messageForm = document.querySelector('#msg');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationSend = document.querySelector('#location');
const $messages = document.querySelector('#messages');
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

const { kasutajanimi, jututuba } = Qs.parse(location.search, { ignoreQueryPrefix: true });
socketio.on('locationMessage', (location) => {
    const html = Mustache.render(locationTemplate, {
        location: location.url,
        createdAt: moment(location.createdAt).format('HH:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});
socketio.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.text,
        createdAt: moment(message.createdAt).format('HH:mm')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});
$messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    $messageFormButton.setAttribute('disabled', 'disabled');
    const msg = e.target.elements.message.value
    socketio.emit('sendMsg', msg, (callback) => {
        $messageFormButton.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
    });
});
$locationSend.addEventListener('click', () => {
    if(!navigator.geolocation) {
        return alert('Sinu browser ei toeta asukoha jagamist. Kasuta uuemat veebilehitsejat');
    }
    $locationSend.setAttribute('disabled', 'disabled');
    navigator.geolocation.getCurrentPosition((position) => {
        socketio.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationSend.removeAttribute('disabled');
        });
    });
});
socketio.emit('join', { kasutajanimi, jututuba }, (error) => {
    if(error) {
        alert(error)
        location.href = '/'
    }
});


