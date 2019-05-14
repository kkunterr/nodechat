const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const chat = express();
const server = http.createServer(chat);
const io = socketio(server);
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');
chat.use(express.static(publicDirectory));
let count = 0;
io.on('connection', (socket) => {
    console.log('Uus klient..');
    socket.emit('countUpdated', count);
});
server.listen(port, () => {
    console.log(`Server jookseb port ${port} peal`);
});





