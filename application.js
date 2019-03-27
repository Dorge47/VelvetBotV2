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
    var request = sendRequest("getUpdates", null, function() {
        messages = JSON.parse(request.responseText);
    });
}

function clearMessage(updateId) {
    var message = {
        offset: updateId + 1,
    }
    var request = sendRequest("getUpdates", message, function() {
         console.log(request.responseText);
    });
}

function sendRequest(func, data, callback) {
	var url = 'https://api.telegram.org/bot' + token + "/" + func;
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = callback;
    console.log(data);
    console.log(JSON.stringify(data));
    request.send(JSON.stringify(data));
    return request;
}

function sendMessage(id, msg) {
    var message = {
        chat_id: id,
        text: msg,
    }
    var request = sendRequest("sendMessage", message, function() {
        console.log(request.responseText);
    });
}

//getMessages() //run immediately to avoid running into problems with undefined messages
//getMessages();
//sendMessage(440753792, "Hello world");

function sendResponses() {//don't add the bot to groups or she'll respond to every message
    for (i = 0; i < messageArray.length; i++) {
        if (messageArray[i].message.text.toLowerCase().includes('pb, test')) {
            sendMessage(messageArray[i].message.from.id,'I\'m working!');
            clearMessage(messageArray[i].update_id);
        }
        else if (false) {
            //add additional responses here and change condition
        }
        else {
            sendMessage(messageArray[i].message.from.id,'I\'m sorry, I didn\'t understand that!');
            clearMessage(messageArray[i]);
        }
    }
}

function doStuff() {
    getMessages()
    setTimeout(function() {
        messageArray = messages.result
        sendResponses()
    },1000)
}

function startResponding() {
    interVar = setInterval(doStuff,2000)
}

function stopResponding() {
    clearInterval(interVar)
}

/*function respondToMessages() {
    for (i = 0; i < messages.length; i++)
}*/
