var token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws'

// function getMessages() {
//     var url = 'https://api.telegram.org/bot' + token + '/getUpdates'
//     fetch(url, {
//         headers: {
//             'Cache-Control': 'no-store' //avoid getting messages from cache
//         }
//     })
//     .then(function(response) {
//         return response.json();
//     })
//     .then(function(myJson) {
//         messagesGotten = myJson;
//     }).then(function() {
//         messages = messagesGotten.result;
//     });
//     // setTimeout(function() {
//     //     messages = messagesGotten.result
//     // }, 1000)
// }

function getMessages() {
    var url = 'https://api.telegram.org/bot' + token + '/getUpdates'
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.onload = function() {
        messages = JSON.parse(request.responseText);
    }
    request.send();
}

function clearPendingMessages() {

}

function sendMessage(id, msg) {
    var message = {
        chat_id: id,
        text: msg,
    }
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage'
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function() {
        console.log(request.responseText);
    }
    console.log(message);
    console.log(JSON.stringify(message));
    request.send(JSON.stringify(message));
}

//getMessages() //run immediately to avoid running into problems with undefined messages
getMessagesv2();
sendMessage(440753792, "Hello world");

/*function respondToMessages() {
    for (i = 0; i < messages.length; i++)
}*/
