const path = require('path');
const http = require('http');
const socket = require('socket.io');
const express = require('express');
const chat = express();

const server = http.createServer(chat);
const io = socket(server);
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');

chat.use(express.static(publicDirectory));

io.on('connection', () => {
    console.log('Uus klient..');
});
server.listen(port, () => {
    console.log(`Server jookseb port ${port} peal`);
});





