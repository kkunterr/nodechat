const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const express = require('express');
const chat = express();
const server = http.createServer(chat);
const io = socketio(server);
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users');
const { generateMessages, generateLocationMessage } = require('./utils/messages');
const port = process.env.PORT || 3000;
const publicDirectory = path.join(__dirname, '../public');
chat.use(express.static(publicDirectory));
io.on('connection', (socket) => {
    socket.on('join', (options, callback) => {
        const { error, user } = addUser({ id: socket.id, ...options });
        if(error) {
           return callback(error);
        }
        socket.join(user.jututuba);

        socket.emit('message', generateMessages('Tere tulemast Jututuppa!'));
        socket.broadcast.to(user.jututuba).emit('message', generateMessages(`Teade: ${user.kasutajanimi} liitus jututoaga`));

        callback()
    });
    socket.on('sendMsg', (msg, callback) => {
        const user = getUser(socket.id)

        io.to(user.jututuba).emit('message', generateMessages(msg))
        callback();
    });
    socket.on('sendLocation', (position, callback) => {
        const user = getUser(socket.id)
        io.to(user.jututuba).emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${position.latitude},${position.longitude}`));
        callback();
    });
    socket.on('disconnect', () => {
      const user = removeUser(socket.id)

        if(user) {
            io.to(user.jututuba).emit('message', generateMessages(`Teade: ${user.kasutajanimi} lahkus jututoast`))
        }

    });
});
server.listen(port, () => {
    console.log(`Server jookseb port ${port} peal`);
});





