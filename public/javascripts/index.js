document.getElementById("sendBtn").addEventListener("click", function () {
    sendMessage();
});

function appuyerSurEntree(event) {
    if (event.keyCode === 13) {
        sendMessage();
    }
}

document.addEventListener("keydown", appuyerSurEntree);

function sendMessage() {
    if (message == "")
        return;
    var message = document.getElementById("message").value;
    // clear input
    document.getElementById("message").value = "";

    fetch("/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            socket.emit('chat message');
        });
}

let messagesList = [];

function updateMessage() {
    fetch("/getMessages", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            messagesList = data;

            var messages = document.getElementById("messages");
            messages.innerHTML = "";
            for (var i = 0; i < messagesList.length; i++) {
                var message = data[i];
                messages.innerHTML += message + "<br>"
            }
        });
}


var socket = io();
// io on chat message call updateMessage
socket.on('chat message', () => {
    updateMessage();
});


updateMessage();