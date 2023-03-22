document.getElementById("sendBtn").addEventListener("click", function() {
    var message = document.getElementById("message").value;
    // fetch the message to url/sendMessage
    fetch("/sendMessage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
    });
});


// get all messages
fetch("/getMessages", {
    method: "GET",
    headers: {
        "Content-Type": "application/json"
    }
})
.then(function(response) {
    return response.json();
})
.then(function(data) {
    // add to dom in div with id messages
    var messages = document.getElementById("messages");
    messages.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var message = data[i];
    messages.innerHTML += message + "<br>"
    }
});
