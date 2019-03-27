var token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws';

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
    };
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
    };
    var request = sendRequest("sendMessage", message, function() {
        console.log(request.responseText);
    });
}

function sendReply(id, msg, replyId) {
    var message = {
        chat_id: id,
        text: msg,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendMessage", message, function() {
        console.log(request.responseText);
    });
}

function forwardMessage(id, fromId, msgId) {
    var message = {
        chat_id: id,
        from_chat_id: msg,
        message_id: msgId,
    };
    var request = sendRequest("forwardMessage", message, function() {
        console.log(request.responseText);
    });
}

//getMessages() //run immediately to avoid running into problems with undefined messages
//getMessages();
//sendMessage(440753792, "Hello world");

function sendResponses() {
    var identifiers = [
        'penny',
        'pb',
        'pennybot',
        'penny bot',
        '@P3nny_v2_bot'
    ]
    for (i = 0; i < messageArray.length; i++) {
        var forPenny = false;
        for (a = 0; a < identifiers.length; a++) {
            if (messageArray[i].message.text.toLowerCase().includes(identifiers[a])) {
                forPenny = true;
                break;
            }
        }
        if (!forPenny) {
            clearMessage(messageArray[i].update_id);
            continue;
        }
        if (messageArray[i].message.text.toLowerCase().includes('test')) {
            sendReply(messageArray[i].message.chat.id,'I\'m working!',messageArray[i].message.message_id);
            clearMessage(messageArray[i].update_id);
        }
        // else if (messageArray[i].message.text.toLowerCase().includes('suggestion')) {
        //     forwardMessage(-1001276603177,messageArray[i].message.chat.id,messageArray[i].message.message_id)
        //
        // }
        else if (messageArray[i].message.text.toLowerCase().includes('spaniel broad tricycle') || messageArray[i].message.text.toLowerCase().includes('spaniel, broad, tricycle')) {
            if (messageArray[i].message.from.id == 440753792) {
                sendMessage(messageArray[i].message.chat.id,'!snoitatulaS');
                clearMessage(messageArray[i].update_id);
                stopResponding();
                break;
            }
            else {
                sendReply(messageArray[i].message.chat.id,'That\'s not for you!',messageArray[i].message.message_id);
                clearMessage(messageArray[i].update_id);
            }
        }
        else if (false) {
            //add additional responses here and change condition
        }
        else {
            sendReply(messageArray[i].message.chat.id,'I\'m sorry, I didn\'t understand that!',messageArray[i].message.message_id);
            clearMessage(messageArray[i].update_id);
        }
    }
}

function doStuff() {
    getMessages();
    setTimeout(function() {
        messageArray = messages.result;
        sendResponses();
    },1000)
}

function startResponding() {
    interVar = setInterval(doStuff,2000);
}

function stopResponding() {
    clearInterval(interVar);
}

//Dorge47: 440753792
//NateDogg1232: 298857178
