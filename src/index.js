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
io.on('connection', (socket) => {
    console.log('Uus klient..');
    socket.emit('message', 'Tere!');
    socket.broadcast.emit('message', 'Kasutaja liitus vestlusega!');
    socket.on('sendMsg', (msg) => {
        io.emit('message', msg);
    });
    socket.on('disconnect', () => {
        io.emit('message', 'Kasutaja lahkus vestlusest!');
    });
});
server.listen(port, () => {
    console.log(`Server jookseb port ${port} peal`);
});





