const token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws';
const botUrl = "velvetbotv2.ddns.net"
const DORGE47 = 440753792;
const NATEDOGG1232 = 298857178;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;
admins = [DORGE47, NATEDOGG1232, PBTESTINGGROUP]

// The various strings pennybot can respond to.
const identifiers = [
    "penny",
    "pb",
    "pennybot",
    "penny bot",
    "@P3nny_v2_bot"
];

//Will hold our server so we can close it.
var server = null;

function sendRequest(func, data, callback) {
    var options = {
        hostname: 'api.telegram.org',
        path: '/bot' + token + '/' + func,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    var https = require('https');
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
function sendMessage(id, msg) {
    var message = {
        chat_id: id,
        text: msg,
    };
    sendRequest("sendMessage", message, function(text) {
        console.log(text);
    });
}

function sendMonospaceMessage(id, msg, replyId) {
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
function sendReply(id, msg, replyId) {
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
function forwardMessage(id, fromId, msgId) {
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
function sendPhoto(id, fileId, replyId) {
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
function sendCaptionedPhoto(id, fileId, replyId, captionText) {
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
function sendLink(id, text, link, replyId, disableShowPreview) {
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

//Sends animation with id (fileId) to (id) as a reply to (replyId) with caption (captionText)
function sendAnimation(id, fileId, replyId, captionText) {
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

function misspellings(msg) {
    //Various misspellings of Pyrrha.
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","pyra","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.message.text.toLowerCase().includes(pyrrha[i])) {
            sendReply(msg.message.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg.message.message_id);//Sends 'P' + the string from pyrrha minus the first letter
        }
    }
}

function forPenny(msg) {
    for (let i = 0; i < identifiers.length; i++) {
        if (msg.message.text.toLowerCase().includes(identifiers[i])) {
            if (msg.message.text.toLowerCase().indexOf(identifiers[i]) == 0) {
                return true;
            }
        }
    }
    return false;
}

function stopResponding() {
    server.close(function() {
        sendMessage(shutdownChatId, "!snoitatulaS", shutdownReplyId);
        sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is OFF");
        console.log("Server has shut down");
    });
}

var https = require('https');
var fs = require('fs');

var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/chain.pem')
};

function testFunction(data) {
    console.log(data);
}

var urlParser = require('url');

function serverResponse(req, res) {
    let url = urlParser.parse(req.url);
    if (url.pathname == "/" + token) {
        var data = "";
        req.on('data', function(chunk) {
            data += chunk;
        });
        req.on('end', function() {
            data = JSON.parse(data);
            console.log(data);
            processReply(data);
            res.writeHead(200);
            res.end(data + "\n");
        });
    } else {
        res.writeHead(403);
        res.end(
`
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Get out plz</title>
    </head>
    <body>
        <h1>This isn't for you!</h1>
        <p>Why are you here? Get out.</p>
    </body>
</html>
`);
    }
}

function Command() {
    //Will require that an admin send this command
    this.requires_admin = false;
    // All messages will reply
    //0 = message
    //1 = photo
    //2 = captioned photo
    //3 = random photo from list
    //4 = random photo from list with caption
    //5 = animation
    //6 = zelda
    //7 = forward
    //256 = Reserved for the help command
    //257 = Reserved for the shutdown command
    this.command_type = 0;
    //This is what the bot will test against
    this.command_names = ["test"];
    //- When it is a message, it'll contain the string we want to send
    //- When it is a photo, it'll contain the fileId
    //- When it is a photo that needs a caption, it'll be an object with the
    //  photo's caption (command_data.caption) and the fileID (command_data.fileId)
    //- When it's a random photo from a list, it'll point to a file that will
    //  contain all the file IDs separated by a newline
    //- When it's a random photo from a list with captions, it'll point to a file
    //  just like when it's a normal random photo, but it'll have a caption which
    //  is separated by a pipe (|)
    //- When it's an animation, it'll have an object with a caption and a fileID.
    //- When it's a link, it'll have an object with the text, the link,
    //  and whether it should disable the preview (disablePreview)
    //- When it's a forward, it'll have an object with the text to reply with (replyText)
    //  and the chatID to forward to (chadId)
    this.command_data = "I'm working!";
    this.command_description = "Tests pennybot";
}

function processReply(message) {
    if (!message.message.hasOwnProperty('text') && message.message.hasOwnProperty('caption')) {
        message.message.text = message.message.caption;
    }
    if (!message.message.hasOwnProperty('text')) {
        return;
    }
    //Check for various misspellings of Pyrrha
    misspellings(message)
    //Make sure the message was actually for PennyBot
    if (!forPenny(message)) {
        return;
    }

    //Check to see if any of the messages match a command
    let messageProcessed = false
    for (let i = 0; i < commands.length; i++) {
        for (let j = 0; j < commands[i].command_names.length; j++) {
            if (message.message.text.toLowerCase().includes(commands[i].command_names[j])) {
                processCommand(commands[i], message);
                messageProcessed = true
            }
        }
    }
    if (!messageProcessed) {
        sendReply(message.message.chat.id, "I'm sorry, I didn't understand that!", message.message.message_id);
    }
}

function isAdmin(message) {
    for (let i = 0; i < admins.length; i++) {
        if (message.message.from.id == admins[i]) {
            return true;
        }
    }
    return false;
}

function processCommand(command, message) {
    console.log('command is being processed')
    if (command.requires_admin) {
        if (!isAdmin(message)) {
            sendMonospaceMessage(message.message.chat.id, "Username is not in the sudoers file. This incident will be reported", message.message.message_id);
            sendMessage(PBTESTINGCHANNEL, `User ${message.message.from.username} attempted to access an unauthorized command`)
        }
    }
    switch (command.command_type) {
        //Simple message
        case 0:
            sendReply(message.message.chat.id, command.command_data, message.message.message_id);
            break;
        //Photo
        case 1:
            sendPhoto(message.message.chat.id, command.command_data, message.message.message_id);
            break;
        //Captioned photo
        case 2:
            sendCaptionedPhoto(message.message.chat.id, command.command_data.fileId,
                message.message.message_id, command.command_data.caption);
            break;
        //Random photo from list
        case 3:
            //Check to see if we already have that file cached
            if (typeof fileCache[command.command_data] == "undefined") {
                //We don't so we load it into the cache
                parseSimplePhotoList(command.command_data);
            }
            //Send the photo
            var randomPhotoId = fileCache[command.command_data][Math.floor(Math.random() * fileCache[command.command_data].length)];
            sendPhoto(message.message.chat.id, randomPhotoId, message.message.message_id);
            break;
        //Random photo from list with caption
        case 4:
            //Check to see if we already have that file cached
            if (typeof fileCache[command.command_data] == "undefined") {
                //We don't so we load it into the cache
                parseCaptionedPhotoList(command.command_data);
            }
            var randomArrayElement = fileCache[command.command_data][Math.floor(Math.random() * fileCache[command.command_data].length)];
            //Send the photo
            console.log(randomArrayElement.fileId + ", " + randomArrayElement.fileId.length)
            console.log(randomArrayElement.caption + ", " + randomArrayElement.caption.length)
            sendCaptionedPhoto(message.message.chat.id,
                randomArrayElement.fileId, message.message.message_id,
                randomArrayElement.caption);
            break;
        //Animation
        case 5:
            sendAnimation(message.message.chat.id, command.command_data.fileId,
                message.message.message_id, command.command_data.caption);
            break;
        //Link
        case 6:
            sendLink(message.message.chat.id, command.command_data.text,
                command.command_data.link, message.message.message_id,
                command.command_data.disablePreview);
            break;
        //Forward
        case 7:
            console.log(command.command_data.chatId);
            forwardMessage(command.command_data.chatId, message.message.chat.id, message.message.message_id);
            sendReply(message.message.chat.id, command.command_data.replyText, message.message.message_id);
            break;


        //---
        //Hardcoded commands
        //---
        //Help
        case 256:
            console.log('message received')
            doHelp(message);
            break;
        case 257:
            shutdown(message);
            break;
        case 258://used to add fileIds to lists of photos
            console.log('got to switch')
            addPhotoToSimpleList(message);
            break;
        case 259://Adds a photo to a captioned photo list
            addPhotoToCaptionedList(message);
        default:
            console.error("Somehow there's a command of unknown type");
            break;
    }
}

function addPhotoToSimpleList(message) {
    console.log('command received')
    let parsedMessage = message.message.text.split("\n");
    console.log(parsedMessage);
    if (typeof parsedMessage[1] == "undefined") {
        sendReply(message.message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add photo
filename.txt`,message.message.message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.message.photo[message.message.photo.length - 1].file_id;
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        console.log('file DNE')
        sendReply(message.message.chat.id, "The file " + fileName + " does not exist!",message.message.message_id);
        return;
    }
    try {
        console.log('trying to append')
        fs.appendFileSync(fileName, "\n" + fileId);
    } catch (e) {
        sendReply(message.message.chat.id, "Could not add file. Error sent to developers");
        sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    console.log('doing cache stuff')
    parseSimplePhotoList(fileName);
    sendReply(message.message.chat.id, "Successfully added the image to " + fileName);
    console.log("it won't get to this point")
}

function addPhotoToCaptionedList(message) {
    let parsedMessage = message.text.split("\n");
    if (typeof parsedMessage[1] == "undefined" || typeof parsedMessage[2] == "undefined") {
        sendReply(message.message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add captioned photo
filename.txt
caption`, message.message.message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.message.photo[message.message.photo.length - 1].file_id;
    let caption = parsedMessage[2];
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        sendReply(message.message.chat.id, "The file " + fileName + " does not exist!",message.message.message_id);
        return;
    }
    try {
        fs.appendFileSync(fileName, "\n" + fileId + "|" + caption);
    } catch (e) {
        sendReply(message.message.chat.id, "Could not add file. Error sent to developers");
        sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    parseCaptionedPhotoList(fileName);
    sendReply(message.message.chat.id, "Successfully added the image to " + fileName);
}

function doHelp(message) {
    //Build the message
    //Message will look like this:
    //PennyBotV2 Help:
    //test: Tests pennybot
    //do nothing to cook: Does nothing to the cook
    //do nothing to the cook: Does nothing to the cook
    //command: description
    let messageText = "PennyBotV2 Help:\n";
    for (let i = 0; i<commands.length; i++) {
        for (let j = 0; j<commands[i].command_names.length; j++) {
            messageText += commands[i].command_names[j];
            messageText += ": " + commands[i].command_description + "\n\n";
        }
    }
    console.log(messageText)
    sendReply(message.message.chat.id, messageText, message.message.message_id);
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from Dorge47
function shutdown(msg) {
    shutdownChatId = msg.message.chat.id
    shutdownReplyId = msg.message.message_id
    stopResponding();
}

function parseSimplePhotoList(fileName) {
    //Steps:
    //Load the file
    //Split by new line
    //Put that into the array
    //Profit
    let file = fs.readFileSync(fileName);
    file += "";
    let ids = file.split('\n');
    fileCache[fileName] = ids;
}
function parseCaptionedPhotoList(fileName) {
    //Steps:
    //Load the file
    //Split by new line
    //Split each line into an ID and caption (using |)
    //Put that into the array
    //Profit
    let file = fs.readFileSync(fileName);
    file += "";
    let ids = file.split('\n');
    for (let i = 0; i < ids.length; i++) {
        ids[i] = ids[i].split('|');
        var photo = {
            fileId: ids[i][0],
            caption: ids[i][1],
        };
        ids[i] = photo;
    }
    fileCache[fileName] = ids;
}

//Array containing all of our commands.
var commands = JSON.parse(fs.readFileSync('commands.json'));

//Get all the photo file IDs for all the commands we need
var fileCache = {};

server = https.createServer(options, serverResponse).listen(443);
sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is ON");

function setWebhook() {
    var message = {
        url: botUrl + "/" + token,
    }
    sendRequest("setWebhook", message, function(data) {
        console.log("Set webhook which responded with " + data);
    });
}

/*, {
    "command_type": ,
    "command_names": [
        ""
    ],
    "command_data": "",
    "command_description": ""
}*/
