const socketio = io();
socketio.on('countUpdated', (count) => {
    console.log('Vestlejate arv on uuendatud', count);
});
document.querySelector('#counterUpdated').addEventListener('click', () => {
    console.log('Vajutatud')
});
