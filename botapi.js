var token = "";
var https = require('https');
exports.setToken = function(botToken) {
    token = botToken;
};

function sendRequest(func, data, callback) {
    var options = {
        hostname: 'api.telegram.org',
        path: '/bot' + token + '/' + func,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    var req = https.request(options, (resp) => {
        let data = '';
        resp.on('data', (chunk) => data += chunk);
        resp.on('end', () => {
            //Call the callback with the data
            callback(data);
        });
    }).on('error', (err) => {
        console.log("Error sending request: " + err.message);
    });
    req.write(JSON.stringify(data));
    req.end();
}

//Sends a message to the given chat id.
exports.sendMessage = function(id, msg) {
    var message = {
        chat_id: id,
        text: msg,
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

exports.sendMonospaceMessage = function(id, msg, replyId) {
    var message = {
        chat_id: id,
        text: `\`${msg}\``,
        parse_mode: "Markdown",
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Sends a reply to the message of replyId in the chat given by id
exports.sendReply = function(id, msg, replyId) {
    var message = {
        chat_id: id,
        text: msg,
        reply_to_message_id: replyId,
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Forwards a message (msgId) from a chat (fromId) to a different chat (id)
exports.forwardMessage = function(id, fromId, msgId) {
    var message = {
        chat_id: id,
        from_chat_id: fromId,
        message_id: msgId,
    };
    var request = sendRequest("forwardMessage", message, function(text) {
        console.log(text);
    });
}

//Sends a photo with id (fileId) to (id) as a reply to (replyId)
exports.sendPhoto = function(id, fileId, replyId) {
    var message = {
        chat_id: id,
        photo: fileId.trim(),
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendPhoto", message, function(text) {
        console.log(text);
    });
}

//Sends a photo with id (fileId) to (id) as a reply to (replyId) with caption (captionText)
exports.sendCaptionedPhoto = function(id, fileId, replyId, captionText) {
    var message = {
        chat_id: id,
        photo: fileId.trim(),
        reply_to_message_id: replyId,
        caption: captionText,
    };
    var request = sendRequest("sendPhoto", message, function(text) {
        console.log(text);
    });
}

//Sends (text) linked to (link) to (id) as a reply to (replyId) with previews shown or disabled according to (disableShowPreview)
exports.sendLink = function(id, text, link, replyId, disableShowPreview) {
    var message = {
        chat_id: id,
        text: `[${text}](${link})`,
        parse_mode: "Markdown",
        disable_web_page_preview: disableShowPreview,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Sends (text) parsed according to (mode) to (id) as a reply to (replyId) with previews shown or disabled according to (disableShowPreview) in case of a link
exports.sendMarkdown = function(id, text, mode, replyId, disableShowPreview) {
    var message = {
        chat_id: id,
        text: text,
        parse_mode: mode,
        disable_web_page_preview: disableShowPreview,
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

//Sends animation with id (fileId) to (id) as a reply to (replyId)
exports.sendAnimation = function(id, fileId, replyId) {
    var message = {
        chat_id: id,
        animation: fileId.trim(),
        reply_to_message_id: replyId,
    };
    var request = sendRequest("sendAnimation", message, function(text) {
        console.log(text);
    });
}

//Sends animation with id (fileId) to (id) as a reply to (replyId) with caption (captionText)
exports.sendCaptionedAnimation = function(id, fileId, replyId, captionText) {
    var message = {
        chat_id: id,
        animation: fileId.trim(),
        reply_to_message_id: replyId,
        caption: captionText,
    };
    var request = sendRequest("sendAnimation", message, function(text) {
        console.log(text);
    });
}

//Pins message with id (pinId) to chat with id (id)
exports.pinMessage = function(id, pinId) {
    var data = {
        chat_id: id,
        message_id: pinId,
    }
    var request = sendRequest("pinChatMessage", data, function(text) {
        console.log(text);
    });
}

//Requests information about chat with id (id)
exports.getChat = function(id) {
    var data = {
        chat_id: id;
    };
    var request = sendRequest("getChat", data, function(text) {
        //console.log(text); (Don't log anything since this is literally called every time the bot receives a message and would double the size of our logs)
    });
}

//Sets the webhook to a certain URL.
//Will automatically append the token to the path
exports.setWebhook = function(botUrl) {
    var message = {
        url: botUrl + "/" + token,
    }
    sendRequest("setWebhook", message, function(data) {
        console.log("Set webhook which responded with " + data);
    });
}