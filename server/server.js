const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log("New user connected.")

    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message)
        io.emit('newMessage', generateMessage(message.from, message.text))
        callback('this is from the server')
    })

    socket.emit('newMessage', generateMessage('Admin','welcome to chat room'))

    socket.broadcast.emit('newMessage', generateMessage('admin','New user joined'))
    
    socket.on("createLocation", (cords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin',cords.lat,cords.lng))
    })

    socket.on('disconnect', () => {
        console.log("Disconnected from client")
    })
})

server.listen(port, ()=> console.log("server is up"))