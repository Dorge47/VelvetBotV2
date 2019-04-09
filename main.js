const token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws';
const botUrl = "velvetbotv2.ddns.net"
const DORGE47 = 440753792;
const NATEDOGG1232 = 298857178;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;
var admins = [DORGE47, NATEDOGG1232, PBTESTINGGROUP]

// The various strings pennybot can respond to.
const identifiers = [
    "penny",
    "pb",
    "pennybot",
    "penny bot",
    "@P3nny_v2_bot"
];

// ----
// Initialization of all modules
// ----
//Get the server as a module
var server = require('server.js');
server.startServer(processReply, token, botUrl);
sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is ON");
//Pull all the bot API stuff into this namespace so we don't
//have to prefix all the calls to that API with bot.whatever()
require('botapi.js')();
//Set the botApi's token
setToken(token);
//Get our flesystem module
var fs = require('fs');


function misspellings(msg) {
    //Various misspellings of Pyrrha.
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","pyra","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.text.toLowerCase().includes(pyrrha[i])) {
            sendReply(msg.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg_id);//Sends 'P' + the string from pyrrha minus the first letter
        }
    }
}

function forPenny(msg) {
    for (let i = 0; i < identifiers.length; i++) {
        if (msg.text.toLowerCase().includes(identifiers[i])) {
            if (msg.text.toLowerCase().indexOf(identifiers[i]) == 0) {
                return true;
            }
        }
    }
    return false;
}

function processReply(message) {
    if (!message.hasOwnProperty('text') && message.hasOwnProperty('caption')) {
        message.text = message.caption;
    }
    if (!message.hasOwnProperty('text')) {
        return;
    }
    //Check for various misspellings of Pyrrha
    misspellings(message)
    //Make sure the message was actually for PennyBot
    if (!forPenny(message)) {
        return;
    }

    //Check to see if any of the messages match a command
    let messageProcessed = false;
    for (let i = 0; i < commands.length; i++) {
        for (let j = 0; j < commands[i].command_names.length; j++) {
            if (message.text.toLowerCase().includes(commands[i].command_names[j])) {
                processCommand(commands[i], message);
                messageProcessed = true;
            }
        }
    }
    if (!messageProcessed) {
        sendReply(message.chat.id, "I'm sorry, I didn't understand that!", message_id);
    }
}

function isAdmin(message) {
    for (let i = 0; i < admins.length; i++) {
        if (message.from.id == admins[i]) {
            return true;
        }
    }
    return false;
}

function processCommand(command, message) {
    console.log('command is being processed')
    if (command.requires_admin) {
        if (!isAdmin(message)) {
            sendMonospaceMessage(message.chat.id, "Username is not in the sudoers file. This incident will be reported", message_id);
            sendMessage(PBTESTINGCHANNEL, `User ${message.from.username} attempted to access an unauthorized command`)
        }
    }
    switch (command.command_type) {
        //Simple message
        case 0:
            sendReply(message.chat.id, command.command_data, message_id);
            break;
        //Photo
        case 1:
            sendPhoto(message.chat.id, command.command_data, message_id);
            break;
        //Captioned photo
        case 2:
            sendCaptionedPhoto(message.chat.id, command.command_data.fileId,
                message_id, command.command_data.caption);
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
            sendPhoto(message.chat.id, randomPhotoId, message_id);
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
            sendCaptionedPhoto(message.chat.id,
                randomArrayElement.fileId, message_id,
                randomArrayElement.caption);
            break;
        //Animation
        case 5:
            sendAnimation(message.chat.id, command.command_data.fileId,
                message_id, command.command_data.caption);
            break;
        //Link
        case 6:
            sendLink(message.chat.id, command.command_data.text,
                command.command_data.link, message_id,
                command.command_data.disablePreview);
            break;
        //Forward
        case 7:
            console.log(command.command_data.chatId);
            forwardMessage(command.command_data.chatId, message.chat.id, message_id);
            sendReply(message.chat.id, command.command_data.replyText, message_id);
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
            break;
        default:
            console.error("Somehow there's a command of unknown type");
            break;
    }
}

function addPhotoToSimpleList(message) {
    //Command is formatted as such (with newlines):
    //pb add captioned photo
    //filename.txt
    //caption
    let parsedMessage = message.text.split("\n");
    if (typeof parsedMessage[1] == "undefined") {
        sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add photo
filename.txt`,message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.photo[message.photo.length - 1].file_id;
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        sendReply(message.chat.id, "The file " + fileName + " does not exist!",message_id);
        return;
    }
    try {
        fs.appendFileSync(fileName, "\n" + fileId);
    } catch (e) {
        sendReply(message.chat.id, "Could not add file. Error sent to developers");
        sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    parseSimplePhotoList(fileName);
    sendReply(message.chat.id, "Successfully added the image to " + fileName);
}

function addPhotoToCaptionedList(message) {
    //Command is formatted as such (with newlines):
    //pb add captioned photo
    //filename.txt
    //caption
    let parsedMessage = message.text.split("\n");
    //Check to make sure it actually has both lines of text
    if (typeof parsedMessage[1] == "undefined" || typeof parsedMessage[2] == "undefined") {
        sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add captioned photo
filename.txt
caption`, message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.photo[message.photo.length - 1].file_id;
    let caption = parsedMessage[2];
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        sendReply(message.chat.id, "The file " + fileName + " does not exist!",message_id);
        return;
    }
    try {
        fs.appendFileSync(fileName, "\n" + fileId + "|" + caption);
    } catch (e) {
        sendReply(message.chat.id, "Could not add file. Error sent to developers");
        sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    parseCaptionedPhotoList(fileName);
    sendReply(message.chat.id, "Successfully added the image to " + fileName);
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
    sendReply(message.chat.id, messageText, message_id);
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from Dorge47
function shutdown(msg) {
    shutdownChatId = msg.chat.id
    shutdownReplyId = msg_id
    server.killServer(function() {
        sendMessage(shutdownChatId, "!snoitatulaS", shutdownReplyId);
        sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is OFF");
        console.log("Server has shut down");
    });
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




/*, {
    "command_type": ,
    "command_names": [
        ""
    ],
    "command_data": "",
    "command_description": ""
}*/
