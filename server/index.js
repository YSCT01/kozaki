const express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

var PORT = process.env.PORT || 7000;
var date = new Date();

var days = date.toString();
var time = date.toTimeString();

var messages = [{

    id: 1,
    text: 'Chat Privado Socket.io',
    nickname: 'Bot',
    date: days,
    time: time

}];

io.on('connection', function(socket) {
    console.log("IP " + socket.handshake.address + " connected");
    socket.emit('messages', messages);
    socket.on("addMessage", function(data) {
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
});


server.listen(PORT, function() {
    console.log("Server running in port: " + PORT);
});