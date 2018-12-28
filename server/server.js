const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected.")

    socket.on('createMessage', (message) => {
        console.log('createMessage', message)
    })

    socket.emit('newMessage', {
        from: 'server',
        text: 'welcome to chat room'
    })

    socket.broadcast.emit('newMessage', {
        from: 'admin',
        text: 'new user joined'
    })

    socket.on('disconnect', () => {
        console.log("Disconnected from client")
    })
})

server.listen(port, ()=> console.log("server is up"))