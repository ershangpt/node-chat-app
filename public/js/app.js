var socket = io();

socket.on('connect', () => {
    console.log("Connected to server");
})

socket.on('disconnect', () => {
    console.log("Disconnected from server")
})

socket.on('newMessage', (message) => {
    console.log('newMessage', message)
})

socket.emit("createMessage", {
    'from': 'shashank',
    'text': 'hello buddy'
}, function(msg){
    console.log("Got it " + msg)
})