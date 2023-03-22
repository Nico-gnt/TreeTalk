document.getElementById("sendBtn").addEventListener("click", function () {
    if(message == "")
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
        });
});

let messagesList = [];

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
