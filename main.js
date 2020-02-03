//Get our flesystem module
var fs = require('fs');
const DORGE47 = 440753792;
const NATEDOGG1232 = 298857178;
const FUJI = 532735068;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;
const admins = [DORGE47, NATEDOGG1232, PBTESTINGGROUP];
//var hiatusEnd = new Date(2019,10,2);
var hiatusStart = new Date(2020, 1, 1);
var hiatusEnd = 404;

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

//Array containing all of our commands.
var commands;

//A cache which will hold any files that we may use
var fileCache = {};
var bootloaderData;



exports.token = null;
exports.name = "PennyBotV2";
exports.directory = "";


//Initalize the bot
exports.init = function(initData) {
    bootloaderData = initData;
    bootloaderData.initBotFunc(exports.directory);
    bot.setToken(exports.token);
    bot.sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is ON");
    loadCommands();
}

function misspellings(msg) {
    //Various misspellings of Pyrrha.
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","pyra","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.text.toLowerCase().includes(pyrrha[i])) {
            bot.sendReply(msg.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg.message_id);//Sends 'P' + the string from pyrrha minus the first letter
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

exports.callback = function(message) {
    //Un-comment to have the bot echo file IDs to the console. Useful when webhooks are enabled and we can't get IDs from a browser
    // if (message.hasOwnProperty('photo')) {
    //     console.log(message.photo[message.photo.length-1].file_id);
    // }
    // else if (message.hasOwnProperty('animation')) {
    //     console.log(message.animation.file_id);
    // }
    if (!message.hasOwnProperty('text') && message.hasOwnProperty('caption')) {
        message.text = message.caption;
    }
    if (!message.hasOwnProperty('text')) {
        return;
    }
    //Check for various misspellings of Pyrrha
    misspellings(message);
    //Make sure the message was actually for PennyBot
    if (!forPenny(message)) {
        return;
    }


    //Check to see if any of the messages match a command
    let messageProcessed = false;
    for (let i = 0; i < commands.length; i++) {
        for (let j = 0; j < commands[i].command_names.length; j++) {
            if (message.text.toLowerCase().substring(2).includes(commands[i].command_names[j])) {
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
            bot.sendMessage(PBTESTINGCHANNEL, `User ${message.from.username} attempted to access an unauthorized command`);
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
        //Captioned animation
        case 5:
            bot.sendCaptionedAnimation(message.chat.id, command.command_data.fileId,
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
            if (message.from.id == FUJI) {
                bot.sendReply(message.chat.id, "No", message.message_id);
                break;
            }
            bot.forwardMessage(command.command_data.chatId, message.chat.id, message.message_id);
            bot.sendReply(message.chat.id, command.command_data.replyText, message.message_id);
            break;
        //Random element from complex list
        case 8:
            if (typeof fileCache[command.command_data.localFileId] == "undefined") {
                parseComplexList(command.command_data.localFileId);
            }
            var randomComplexElement = fileCache[command.command_data.localFileId][Math.floor(Math.random() * fileCache[command.command_data.localFileId].length)];
            if (randomComplexElement.fileType == 'photo') {
                if (randomComplexElement.caption == null) {
                    bot.sendPhoto(message.chat.id, randomComplexElement.fileId, message.message_id);
                }
                else {
                    bot.sendCaptionedPhoto(message.chat.id,
                        randomComplexElement.fileId, message.message_id,
                        randomComplexElement.caption);
                }
            }
            else if (randomComplexElement.fileType == 'GIF') {
                if (randomComplexElement.caption == null) {
                    console.log(randomComplexElement);
                    bot.sendAnimation(message.chat.id, randomComplexElement.animation, message.message_id);
                }
                else {
                    bot.sendCaptionedAnimation(message.chat.id, randomComplexElement.animation, message.message_id, randomComplexElement.caption);
                }
            }
            break;
        //Hiatus
        case 9:
            var passedDays = Math.ceil((new Date() - hiatusStart) / 86400000);
            if (hiatusEnd == 404) {
                bot.sendReply(message.chat.id, "We are " + passedDays + " days into the hiatus, with an unknown number of days until RWBY returns.", message.message_id);
                break;
            }
            var deltaDays = 0;
            var delta = hiatusEnd - new Date();
            if (delta <= 0) {
                bot.sendReply(message.chat.id, "THE HIATUS IS OVER!", message.message_id);
            }
            else {
                deltaDays = Math.ceil(delta / 86400000);
                delta %= 86400000;
                if (deltaDays <= 1) {
                    bot.sendReply(message.chat.id, 'RWBY returns tomorrow. Pb hype! Oh wait...', message.message_id);
                }
                else if (deltaDays > 1) {
                    bot.sendReply(message.chat.id, 'There are currently ' + deltaDays + ' days until RWBY returns.', message.message_id);
                }
            }
            break;
        case 10:
            if (command.command_data.type == 0) { //coin flip
                if (Math.floor(Math.random()*2) == 0) {
                    bot.sendReply(message.chat.id, "It's heads.", message.message_id);
                    break;
                }
                else {
                    bot.sendReply(message.chat.id, "It's tails.", message.message_id);
                    break;
                }
            }
            else if (command.command_data.type == 1) { //die roll
                bot.sendReply(message.chat.id, "You rolled a " + Math.ceil(Math.random()*6) + ".", message.message_id);
                break;
            }
            break; //added for consistency, the program should never reach this point
        case 11:
            bot.sendMarkdown(message.chat.id, command.command_data.text, command.command_data.mode, message.message_id, command.command_data.disablePreview);
            break;
        case 12:
            let randomResponse = Math.floor(Math.random()*command.command)
            break;
        case 13: //Login for the website
            let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomLength = randomChars.length;
            let pwd = '';
            for (let i = 0; i < 6; i++) {
                pwd += randomChars.charAt(Math.floor(Math.random() * randomLength));
            }
            if (fs.existsSync(`/etc/velvet/${message.from.id}`)) {
                fs.unlinkSync(`/etc/velvet/${message.from.id}`);
            }
            fs.writeFile(`/etc/velvet/${message.from.id}`, pwd, function (err) {
                if (err) throw err;
            });
            fs.chmodSync(`/etc/velvet/${message.from.id}`, 0o777, function (err) {
                if (err) throw err;
            });
            bot.sendMessage(message.from.id, `User Id: ${message.from.id}
One-use password: ${pwd}`);
            bot.sendReply(message.chat.id, "I've send you the login information in a private message.", message.message_id);
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
            loadCommands();
            bot.sendReply(message.chat.id, command.command_data.replyText, message.message_id);
            break;
        case 261://echoes a file id from a file type specified by the second line of the message
            echoFileId(message);
            break;
		case 262://Uptime
            doUptime(message);
            break;
        default:
            console.error("Somehow there's a command of unknown type");
            break;
    }
}


function loadCommands() {
    commands = JSON.parse(fs.readFileSync("./" + exports.directory + '/commands.json'));
}

function echoFileId(message) {
    let fileId = '';
    let parsedMessage = message.text.toLowerCase().split("\n");
    if (typeof parsedMessage[1] == "undefined") {
        bot.sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb, echo file id
fileType`,message.message_id);
        return;
    }
    if (parsedMessage[1] == 'photo' || parsedMessage[1] == 'picture') {
        fileId = message.photo[message.photo.length - 1].file_id;
    }
    else if (parsedMessage[1] == 'animation' || parsedMessage[1] == 'gif') {
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
    if (!fs.existsSync("./" + exports.directory + "/" + fileName)) {
        bot.sendReply(message.chat.id, "The file " + fileName + " does not exist!",message.message_id);
        return;
    }
    try {
        fs.appendFileSync("./" + exports.directory + "/" + fileName, "\n" + fileId);
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
    if (!fs.existsSync("./" + exports.directory + "/" + fileName)) {
        bot.sendReply(message.chat.id, "The file " + fileName + " does not exist!",message.message_id);
        return;
    }
    try {
        fs.appendFileSync("./" + exports.directory + "/" + fileName, "\n" + fileId + "|" + caption);
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
    console.log(messageText);
    bot.sendReply(message.chat.id, messageText, message.message_id);
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from Dorge47
function shutdown(msg) {
    shutdownChatId = msg.chat.id;
    shutdownReplyId = msg.msg_id;
    bootloaderData.killFunc(exports.token);
}

exports.onKill = function() {
    bot.sendMessage(shutdownChatId, "!snoitatulaS", shutdownReplyId);
    bot.sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is OFF");
}

function parseSimpleIdList(fileName) {
    //Steps:
    //Load the file
    //Split by new line
    //Put that into the array
    //Profit
    let file = fs.readFileSync("./" + exports.directory + "/" + fileName);
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
    let file = fs.readFileSync("./" + exports.directory + "/" + fileName);
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
    let complexList = [];
    let file = JSON.parse(fs.readFileSync("./" + exports.directory + "/" + fileName));
    for (i = 0; i < file.length; i++) {
        if (file[i].fileType == 'photo') {
            if (file[i].caption == null) {
                var photoToPush = {
                    fileType: 'photo',
                    fileId: file[i].fileId
                };
            }
            else {
                var photoToPush = {
                    fileType: 'photo',
                    fileId: file[i].fileId,
                    caption: file[i].caption
                };
            }
            complexList[i] = photoToPush;
        }
        else if (file[i].fileType == 'GIF') {
            if (file[i].caption == null) {
                var gifToPush = {
                    fileType: 'GIF',
                    animation: file[i].fileId
                };
            }
            else {
                var gifToPush = {
                    fileType: 'GIF',
                    animation: file[i].fileId,
                    caption: file[i].caption
                };
            }
            complexList[i] = gifToPush;
        }
    }
    fileCache[fileName] = complexList;
}


function doUptime(msg) {
    var uptime = Math.floor(process.uptime());
    var hours   = Math.floor(uptime / 3600);
    var minutes = Math.floor((uptime - (hours * 3600)) / 60);
    var seconds = uptime - (hours * 3600) - (minutes * 60);
    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    bot.sendReply(msg.chat.id, "I've been working for "+hours+':'+minutes+':'+seconds, msg.msg_id);
}





/*, {
    "command_type": ,
    "command_names": [
        ""
    ],
    "command_data": "",
    "command_description": ""
}*/