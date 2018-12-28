var socket = io();

socket.on('connect', () => {
    console.log("Connected to server");
})

socket.on('disconnect', () => {
    console.log("Disconnected from server")
})

socket.on('newMessage', (message) => {
    var li = jQuery("<li></li>");
    li.text(`${message.from} : ${message.text}`)
    jQuery("#chatlist").append(li);
    console.log('newMessage', message)
})

// document.getElementById("sendBtn").addEventListener('click', function(e){
//     e.preventDefault()
//     socket.emit("createMessage", {
//         from: "User",
//         text: document.getElementById("message").value
//     }, function(msg){
//         document.getElementById("message").value = '';
//         console.log("Got It, "+ msg)        
//     })
// })

jQuery("#my-form").on("submit", function(e){
    e.preventDefault();    
    socket.emit("createMessage", {
        from: "User",
        text: jQuery("#message").val()
    }, function(msg){
        jQuery("#message").val("")
        console.log("Got It! "+ msg);
    })
})

var locationBtn = jQuery("#send-location");

locationBtn.on("click", function(){
    if(!navigator.geolocation){
        alert("Location not supported by your browser");
    }
    locationBtn.attr('disabled', 'disabled').text("Sending location...");
    navigator.geolocation.getCurrentPosition(function(position){
        locationBtn.removeAttr('disabled').text("Send location");
        socket.emit("createLocation", {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
    }, function(){
        locationBtn.removeAttr('disabled').text("Send location");
        alert("Unable to fetch location.")
    })
    
})

socket.on("newLocationMessage", function(location){
    var li = jQuery("<li></li>");
    var a = jQuery('<a target="_blank">My Current Location</a>');

    li.text(`${location.from} : `);
    a.attr('href', location.url);
    li.append(a);
    jQuery("#chatlist").append(li)
})