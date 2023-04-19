const rechercher = document.getElementById("rechercher");
const btnRechercher = document.getElementById("btnRechercher");

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

function updateMessage(withSearch) {
    rechercherValue = "";
    if (withSearch == true) {
        rechercherValue = rechercher.value;
    }

    fetch("/getMessages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rechercher: rechercherValue
        })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            messagesList = data;

            var messages = document.getElementById("messages");
            messages.innerHTML = "";
            for (var i = 0; i < messagesList.length; i++) {
                var message = messagesList[i];
                var hashtag = message.match(/#[a-zA-Z0-9]+/g);
                console.log(hashtag);
                if (hashtag != null) {
                    // hastag is a array replace all the element
                    for (var x = 0; x < hashtag.length; x++) {
                        message = message.replace(hashtag[x], `<span class="hashagColor">${hashtag[x]}</span>`);
                    }
                }
                var messageElement = document.createElement('div');

                messageElement.classList.add('sent-message');
                messages.appendChild(messageElement);
                var username = message.split(" : ")[0];
                messageElement.innerHTML = "<span class='username'>" + username + "</span>" + message.replace(username + " : ", " ");


            }
            messages.scrollTop = messages.scrollHeight;
        });
}


var socket = io();
// io on chat message call updateMessage
socket.on('chat message', () => {
    updateMessage();
});


document.getElementById("clearDB").addEventListener("click", function () {
    fetch("/clearDB", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(function (response) {
            // refresh page
            document.location.href = "/";
        })
});

if (document.getElementById("log-or-signup")) {
    document.getElementById("log-or-signup").addEventListener("click", function () {
        document.location.href = "/profil";
    });
}


btnRechercher.addEventListener("click", () => {
    updateMessage(true);
});

updateMessage();


