var socket = io();

function scrollToBottom(){
    var messages = jQuery("#chatlist");
    var newMessage = messages.children("li:last-child")  

    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight()

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight)
    }
}

socket.on('connect', () => {
    console.log("Connected to server");
    var params = jQuery.deparam(window.location.params);

    socket.emit('join', params, function(err){
        if(err){
            alert(err)
            window.location.href = '/';
        }else{

        }
    })
})

socket.on('disconnect', () => {
    console.log("Disconnected from server")
})

socket.on('newMessage', (message) => {
    var formattedTime = moment(message.createdAt).format("h:mm a");
    var template = jQuery("#message-template").html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery("#chatlist").append(html)
    scrollToBottom();
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
        text: jQuery("#message").val()
    }, function(msg){
        jQuery("#message").val("");        
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
    var formattedTime = moment(location.createdAt).format("h:mm a");
    var template = jQuery("#location-message-template").html();
    var html = Mustache.render(template, {
        url: location.url,
        from: location.from,
        createdAt: formattedTime
    });
    jQuery("#chatlist").append(html)
    scrollToBottom()
})

socket.on('updateUserList', (users) => {
    var ol = jQuery('<ol></ol>');
    users.forEach((user) => {
        var li = jQuery("<li></li>").html(user)
        ol.append(li);
    })
    jQuery("#users").html(ol);
})