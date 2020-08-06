var socket = io.connect('localhost:7000', { 'forceNew': true });


var date = new Date();
/*
var day = date.toLocaleDateString();
var time = date.toLocaleTimeString();
*/
var day = date.toString();
var time = date.toTimeString();

var user = prompt("Enter your name");

socket.on('messages', function(data) {
    //console.log(data);
    render(data);
});

function render(data) {
    var html = data.map(function(object, index) {
        return (`
            <div class="message">
            <strong>${object.nickname} : </strong> 
            <p>${object.text} <br> <br> ${object.date}  </p>
            </div>
        `);
    }).join("   ");

    var div_msg = document.getElementById("content");
    div_msg.innerHTML = html;
    div_msg.scrollTop = div_msg.scrollHeight;
}

function addMessage(event) {
    var message = {
        //nickname: document.getElementById("username").value,
        nickname: this.user,
        text: document.getElementById("msj").value,
        date: this.day,
        time: this.time
    }
    socket.emit("addMessage", message);
    event.reset();
    return false;
}