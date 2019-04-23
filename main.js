const token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws';
const botUrl = "velvetbotv2.ddns.net"
const DORGE47 = 440753792;
const NATEDOGG1232 = 298857178;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;
const admins = [DORGE47, NATEDOGG1232, PBTESTINGGROUP]

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

var bot = require('./botapi.js');
//Set the botApi's token
bot.setToken(token);
//Get the server as a module
var server = require('./server.js');
server.startServer(processReply, token, botUrl);
//Get our flesystem module
var fs = require('fs');

//Array containing all of our commands.
var commands = JSON.parse(fs.readFileSync('commands.json'));

//A cache which will hold any files that we may use
var fileCache = {};

//At this point the bot is all nice and started up.
bot.sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is ON");

function misspellings(msg) {
    //Various misspellings of Pyrrha.
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","pyra","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.text.toLowerCase().includes(pyrrha[i])) {
            bot.sendReply(msg.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg_id);//Sends 'P' + the string from pyrrha minus the first letter
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
        bot.sendReply(message.chat.id, "I'm sorry, I didn't understand that!", message.message_id);
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
    if (command.requires_admin) {
        if (!isAdmin(message)) {
            bot.sendMonospaceMessage(message.chat.id, "Username is not in the sudoers file. This incident will be reported", message.message_id);
            bot.sendMessage(PBTESTINGCHANNEL, `User ${message.from.username} attempted to access an unauthorized command`)
        }
    }
    switch (command.command_type) {
        //Simple message
        case 0:
            bot.sendReply(message.chat.id, command.command_data, message.message_id);
            break;
        //Photo
        case 1:
            bot.sendPhoto(message.chat.id, command.command_data, message.message_id);
            break;
        //Captioned photo
        case 2:
            bot.sendCaptionedPhoto(message.chat.id, command.command_data.fileId,
                message.message_id, command.command_data.caption);
            break;
        //Random photo from list
        case 3:
            //Check to see if we already have that file cached
            if (typeof fileCache[command.command_data] == "undefined") {
                //We don't so we load it into the cache
                parseSimpleIdList(command.command_data);
            }
            //Send the photo
            var randomPhotoId = fileCache[command.command_data][Math.floor(Math.random() * fileCache[command.command_data].length)];
            bot.sendPhoto(message.chat.id, randomPhotoId, message.message_id);
            break;
        //Random photo from list with caption
        case 4:
            //Check to see if we already have that file cached
            if (typeof fileCache[command.command_data] == "undefined") {
                //We don't so we load it into the cache
                parseCaptionedIdList(command.command_data);
            }
            var randomArrayElement = fileCache[command.command_data][Math.floor(Math.random() * fileCache[command.command_data].length)];
            //Send the photo
            bot.sendCaptionedPhoto(message.chat.id,
                randomArrayElement.fileId, message.message_id,
                randomArrayElement.caption);
            break;
        //Animation
        case 5:
            bot.sendAnimation(message.chat.id, command.command_data.fileId,
                message.message_id, command.command_data.caption);
            break;
        //Zelda
        case 6:
            bot.sendLink(message.chat.id, command.command_data.text,
                command.command_data.link, message.message_id,
                command.command_data.disablePreview);
            break;
        //Forward
        case 7:
            bot.forwardMessage(command.command_data.chatId, message.chat.id, message.message_id);
            bot.sendReply(message.chat.id, command.command_data.replyText, message.message_id);
            break;
        //Random Animation
        case 8:
            if (typeof fileCache[command.command_data.localFileId] == "undefined") {
                //We don't so we load it into the cache
                parseComplexList(command.command_data.localFileId);
            }
            //Send the photo
            var randomAnimElement = fileCache[command.command_data.localFileId][Math.floor(Math.random() * fileCache[command.command_data.localFileId].length)];
            bot.sendAnimation(message.chat.id, randomAnimElement.fileId, message.message_id, randomAnimElement.caption);
            break;


        //---
        //Hardcoded commands
        //---
        //Help
        case 256:
            doHelp(message);
            break;
        case 257:
            shutdown(message);
            break;
        case 258://used to add fileIds to lists of photos
            addPhotoToSimpleList(message);
            break;
        case 259://Adds a photo to a captioned photo list
            addPhotoToCaptionedList(message);
            break;
        case 260://Refreshes the command list so we don't have to restart the bot
            commands = JSON.parse(fs.readFileSync('commands.json'));
            bot.sendReply(message.chat.id, command.command_data.replyText, message.message_id);
            break;
        case 261://echoes a file id from a file type specified by the second line of the message
            echoFileId(message);
            break;
        default:
            console.error("Somehow there's a command of unknown type");
            break;
    }
}

function echoFileId(message) {
    let fileId = ''
    let parsedMessage = message.text.toLowerCase().split("\n");
    if (typeof parsedMessage[1] == "undefined") {
        bot.sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, echo file id
fileType`,message.message_id);
        return;
    }
    if (parsedMessage[1] == 'photo' | parsedMessage[1] == 'picture') {
        fileId = message.photo[message.photo.length - 1].file_id;
    }
    else if (parsedMessage[1] == 'animation' | parsedMessage[1] == 'gif') {
        fileId = message.animation.fileId;
    }
    bot.sendReply(message.chat.id, fileId, message.message_id);
}

function addPhotoToSimpleList(message) {
    //Command is formatted as such (with newlines):
    //pb add captioned photo
    //filename.txt
    //caption
    let parsedMessage = message.text.split("\n");
    if (typeof parsedMessage[1] == "undefined") {
        bot.sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add photo
filename.txt`,message.message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.photo[message.photo.length - 1].file_id;
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        bot.sendReply(message.chat.id, "The file " + fileName + " does not exist!",message.message_id);
        return;
    }
    try {
        fs.appendFileSync(fileName, "\n" + fileId);
    } catch (e) {
        bot.sendReply(message.chat.id, "Could not add file. Error sent to developers");
        bot.sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    parseSimpleIdList(fileName);
    bot.sendReply(message.chat.id, "Successfully added the image to " + fileName);
}

function addPhotoToCaptionedList(message) {
    //Command is formatted as such (with newlines):
    //pb add captioned photo
    //filename.txt
    //caption
    let parsedMessage = message.text.split("\n");
    //Check to make sure it actually has both lines of text
    if (typeof parsedMessage[1] == "undefined" || typeof parsedMessage[2] == "undefined") {
        bot.sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, add captioned photo
filename.txt
caption`, message.message_id);
        return;
    }
    //Parse the photo into the file's format
    let fileId = message.photo[message.photo.length - 1].file_id;
    let caption = parsedMessage[2];
    //Add it into the file
    let fileName = parsedMessage[1];
    if (!fs.existsSync(fileName)) {
        bot.sendReply(message.chat.id, "The file " + fileName + " does not exist!",message.message_id);
        return;
    }
    try {
        fs.appendFileSync(fileName, "\n" + fileId + "|" + caption);
    } catch (e) {
        bot.sendReply(message.chat.id, "Could not add file. Error sent to developers");
        bot.sendMessage(PBTESTINGCHANNEL, "Could not add file: " + e);
        return;
    }
    //Reload the cache
    parseCaptionedIdList(fileName);
    bot.sendReply(message.chat.id, "Successfully added the image to " + fileName);
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
    bot.sendReply(message.chat.id, messageText, message.message_id);
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from Dorge47
function shutdown(msg) {
    shutdownChatId = msg.chat.id
    shutdownReplyId = msg.msg_id
    server.killServer(function() {
        bot.sendMessage(shutdownChatId, "!snoitatulaS", shutdownReplyId);
        bot.sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is OFF");
        console.log("Server has shut down");
    });
}

function parseSimpleIdList(fileName) {
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

function parseCaptionedIdList(fileName) {
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

function parseComplexList(fileName) {
    let file = JSON.parse(fs.readFileSync(fileName));
    for (i = 0; i < file.length; i++) {
        if (file[i].fileType == 'photo') {

        }
    }
    fileCache[fileName] = complexList;
}




/*, {
    "command_type": ,
    "command_names": [
        ""
    ],
    "command_data": "",
    "command_description": ""
}*/
