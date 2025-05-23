//Get our flesystem module
var fs = require('fs');
const DORGE47 = 440753792;
const FUJI = 532735068;
const PBTESTINGGROUP = -1001276603177;
const PBTESTINGCHANNEL = -1001397346553;
const admins = [DORGE47, PBTESTINGGROUP];
const hiatusStart = [new Date("March 27 2021 8:00"), new Date("June 5 2021"), new Date("February 10 2023")];
const hiatusEnd = [404, new Date("June 15 2021"), new Date("August 16 2023 21:00")];
const hiatusEndText = ["THE HIATUS IS OVER!", "lol no phoenix wright", "no sleb for the wicked"];
const hiatusText = ["RWBY returns", "The direct premieres", "Holocure 0.6 launches"];

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

//A cache which will hold any files that we may use
var fileCache = {};
//Array containing all of our commands.
fileCache['commands'] = [];
// initDataObject
var bootloaderData;



exports.token = null;
exports.name = "VelvetBotV2";
exports.directory = "";


//Initalize the bot
exports.init = function(initData) {
    bootloaderData = initData;
    bootloaderData.initBotFunc(exports.directory);
    bot.setToken(exports.token);
    bot.sendMessage(PBTESTINGCHANNEL, "PennyBotV2 is ON");
    loadCommands();
    fileCache['pin'] = JSON.parse(fs.readFileSync("./" + exports.directory + '/pins.json'));
}

function misspellings(msg) {
    //Various misspellings of Pyrrha.
    var pyrrha = ["phyrra","pyrah","phyrrha","phryrra","pyhrra","pyrrah","phrrya","pyrhha","pirrah","piera","homura","pyhra","pierra","priah","phyrria","pyrra","pyrhaa","pyyra","pyrrea","pureha","pharah","pharaoh","pyhhra","phyyra","pryyha","pyyrha","phyra","prryha","pearhat","purra","prhhya"]
    for (let i = 0; i < pyrrha.length; i++) {
        if (msg.text.toLowerCase().includes(pyrrha[i])) {
            bot.sendReply(msg.chat.id,`${pyrrha[i][0].toUpperCase() + pyrrha[i].slice(1)}? Do you mean Pyrrha?`,msg.message_id);//Sends 'P' + the string from pyrrha minus the first letter
        }
    }
}

function takamoriNight(msg) {
    var currentTime = new Date()
    if ((currentTime.getHours()) < 20 && (currentTime.getHours() > 6)) {
        return;  // Ignore calls between 8 PM and 6 AM
    }
    var nightWord = ["'night", "good night"]
    for (let i = 0; i < nightWord.length; i++) {
        if (msg.text.toLowerCase().includes(nightWord[i])) {
            bot.sendVideo(msg.chat.id,"BAACAgEAAxkBAAIEJGAbD6x74eN6AS5QG9pLChI0hc-BAALJAANFHtlELFWu4zXkNq4eBA",msg.message_id);
            return;
        }
    }
}

function pekofy(msg) {
    if (msg.text.toLowerCase() != "!pekofy") {
        return;
    }
    if (!msg.hasOwnProperty("reply_to_message")) {
        bot.sendReply(msg.chat.id, 'Pardun?', msg.message_id);
        return;
    }
    else if (!msg.reply_to_message.hasOwnProperty("text")) {
        let textReplaceFailed = true;
        if (msg.reply_to_message.hasOwnProperty("photo")) {
            if (msg.reply_to_message.photo.hasOwnProperty("caption")) {
                msg.reply_to_message.text = msg.reply_to_message.photo.caption;
                textReplaceFailed = false;
            }
            else if (msg.reply_to_message.hasOwnProperty("caption")) {
                msg.reply_to_message.text = msg.reply_to_message.caption;
                textReplaceFailed = false;
            }
        }
        if (textReplaceFailed) {
            bot.sendReply(msg.chat.id, 'Incorrect message format peko', msg.message_id);
            return;
        }
    }
    let toPeko = msg.reply_to_message.text;
    let lastChar = "";
    let punctArray = [".","?","!"];
    let allPunct = [];
    for (let i = 0; i < punctArray.length; i++) {
        if (toPeko.substr(toPeko.length - 1) == punctArray[i]) {
            lastChar = punctArray[i];
        }
        if (toPeko.includes(punctArray[i])) {
            for (let j = 0; j < toPeko.length; j++) {
                if (toPeko[j] == punctArray[i]) {
                    allPunct.push(j);
                }
            }
        }
    }
    let pekofied = "";
    if (allPunct.length == 0) {
        pekofied = toPeko + " peko";
    }
    else if (allPunct.length == 1 && lastChar != "") {
        pekofied = toPeko.substr(0, toPeko.length - 1) + " peko" + lastChar;
    }
    else {
        pekofied = toPeko;
        for (let i = 0; i < allPunct.length; i++) {
            pekofied = pekofied.substr(0, allPunct[i] + 5 * i) + " peko" + pekofied.substr(allPunct[i] + 5 * i)
        }
        if (lastChar == "") {
            pekofied += " peko";
        }
    }
    bot.sendMessage(msg.chat.id, pekofied);
}

function neverKys(msg) {
    if (msg.text.toLowerCase().includes("kill myself")) {
        bot.sendVideo(msg.chat.id, "BAACAgEAAxkBAAIHTWgCV3oYZUrHGK4Xywd56EPDP-WXAALTBAACRBURRHT870ZE3jUpNgQ", msg.message_id);
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

function slashes(msg) {
    if (!msg.text.includes('/')) {
        return;
    }
    if (msg.text.includes('/shrug')) {
        bot.sendReply(msg.chat.id, '¯\\_(ツ)_/¯', msg.message_id);
    }
}

exports.callback = function(message) {
    //Un-comment to have the bot echo file IDs to the console. Useful when webhooks are enabled and we can't get IDs from a browser
    // if (message.hasOwnProperty('photo')) {
    //     console.log(message.photo[message.photo.length-1].file_id);
    // }
    // else if (message.hasOwnProperty('animation')) {
    //     console.log(message.animation.file_id);
    // }
    if (message.hasOwnProperty('edited_message')) {
        processMessage(message.edited_message);
    }
    else if (message.hasOwnProperty("message")) {
        processMessage(message.message);
    }
}

function processMessage(message) {
    if (!message.hasOwnProperty('text') && message.hasOwnProperty('caption')) {
        message.text = message.caption;
    }
    if (!message.hasOwnProperty('text')) {
        return;
    }
    //Get chat information
    processChat(message.chat.id);
    //Make sure the message was actually for PennyBot
    if (!forPenny(message)) {
        //Check for various misspellings of Pyrrha
        misspellings(message);
        // Check for slash commands
        slashes(message);
        // Check for goodnight message
        takamoriNight(message);
        // Check for pekofy
        pekofy(message);
        // Never kill yourself
        neverKys(message);
        return;
    }
    //Check to see if any of the messages match a command
    let messageProcessed = false;
    for (let i = 0; i < fileCache['commands'].length; i++) {
        for (let j = 0; j < fileCache['commands'][i].command_names.length; j++) {
            if (message.text.toLowerCase().substring(2).includes(fileCache['commands'][i].command_names[j])) {
                processCommand(fileCache['commands'][i], message);
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

function findReply(message, switchReply) {
    if (switchReply && message.hasOwnProperty("reply_to_message")) {
        return message.reply_to_message.message_id;
    }
    else {
        return message.message_id;
    }
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
            bot.sendReply(message.chat.id, command.command_data, findReply(message, command.switch_reply));
            break;
        //Photo
        case 1:
            bot.sendPhoto(message.chat.id, command.command_data, findReply(message, command.switch_reply));
            break;
        //Captioned photo
        case 2:
            bot.sendCaptionedPhoto(message.chat.id, command.command_data.fileId,
                findReply(message, command.switch_reply), command.command_data.caption);
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
                findReply(message, command.switch_reply), command.command_data.caption);
            break;
        //Zelda
        case 6:
            bot.sendLink(message.chat.id, command.command_data.text,
                command.command_data.link, findReply(message, command.switch_reply),
                command.command_data.disablePreview);
            break;
        //Forward user message
        case 7:
            if (message.from.id == FUJI) {
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
            var passedDays = Math.ceil((new Date() - hiatusStart[command.command_data.hiatus_num]) / 86400000);
            if (hiatusEnd[command.command_data.hiatus_num] == 404) {
                bot.sendReply(message.chat.id, "We are " + passedDays + " days into the hiatus, with an unknown number of days until " + hiatusText[command.command_data.hiatus_num] + ".", message.message_id);
                break;
            }
            var deltaDays = 0;
            var delta = hiatusEnd[command.command_data.hiatus_num] - new Date();
            if (delta <= 0) {
                bot.sendReply(message.chat.id, hiatusEndText[command.command_data.hiatus_num], message.message_id);
            }
            else {
                deltaDays = Math.ceil(delta / 86400000);
                delta %= 86400000;
                if (deltaDays <= 1) {
                    bot.sendReply(message.chat.id, hiatusText[command.command_data.hiatus_num] + ' tomorrow.', message.message_id);
                }
                else if (deltaDays > 1) {
                    bot.sendReply(message.chat.id, 'There are currently ' + deltaDays + ' days until ' + hiatusText[command.command_data.hiatus_num] + '.', message.message_id);
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
                var regex = /\d+[d,D]\d+/g;
                if (message.text.match(regex)) {
                    let response = "You rolled "
                    var rolls = message.text.match(regex);
                    let total = 0;
                    for (let i = 0; i < rolls.length; i++) {
                        let numDice = parseInt(rolls[i].slice(0,rolls[i].indexOf('d')));
                        let diceMax = parseInt(rolls[i].slice(rolls[i].indexOf('d')+1));
                        for (let diceCounted = 0; diceCounted < numDice; diceCounted++) {
                            let roll = Math.ceil(Math.random()*diceMax);
                            total += roll;
                            response += roll + ' ';
                        }
                        response = response.trim();
                        response += "\ntotal: " + total;
                    }
                    bot.sendReply(message.chat.id, response, message.message_id);
                }
                else if (message.text.toLowerCase().substring(2).includes('roll a die') || message.text.toLowerCase().substring(2).includes('roll a dice')) {
                    bot.sendReply(message.chat.id, "You rolled a " + Math.ceil(Math.random()*6) + ".", message.message_id);
                }
                break;
            }
            break; //added for consistency, the program should never reach this point
        case 11:
            bot.sendMarkdown(message.chat.id, command.command_data.text, command.command_data.mode, message.message_id, command.command_data.disablePreview);
            break;
        case 12:
            let randomResponse = Math.floor(Math.random()*command.command)
            break;
        // Forward message to user (different from case 7)
        case 14:
            bot.forwardMessage(message.chat.id, command.command_data.originChat, command.command_data.originId);
            break;
        // Video
        case 15:
            bot.sendVideo(message.chat.id, command.command_data, message.message_id);
            break;
        case 16:
            let placeholder = message.text.toLowerCase().indexOf("velezark") + 9;
            let mapName = message.text.toLowerCase().substr(placeholder);
            let velezarkAbsent = false;
            switch (mapName) {
                case "invisible ties":
                    velezarkAbsent = true;
                    break;
                case "the path is yours":
                    velezarkAbsent = true;
                    break;
                case "the dark pontifex":
                    velezarkAbsent = true;
                    break;
                case "noble lady of caelin":
                    velezarkAbsent = true;
                    break;
                case "together to the end":
                    bot.sendReply(message.chat.id, `Map has two Velezark levels:

Lv. 54 Together to the End
Lv. 80 Within the Heart`, message.message_id);
                    break;
                case "hero challenge":
                    bot.sendReply(message.chat.id, `Map has three Velezark levels:

Lv. 45 Rendezvous Disruption
Lv. 80 Rendezvous Disruption
Lv. 80 Shadow Elimination`, message.message_id);
                    break;
                case "grief":
                bot.sendReply(message.chat.id, `Map has three Velezark levels:

Lv. 65 Grief
Lv. 76 Recruitment Battle
Lv. 90 A Burdened Heart`, message.message_id);
                    break;
                case "land of gods":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 80 Fort Seige`, message.message_id);
                    break;
                case "cold reception":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 69 Targeted Elimination`, message.message_id);
                    break;
                case "a brush in the teeth":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 102 Fort Defense`, message.message_id);
                    break;
                case "princess minerva":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 99 Fort Seige`, message.message_id);
                    break;
                case "knorda market":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 95 Villager Rescue`, message.message_id);
                    break;
                case "scion of legend":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 107 Recruitment Battle`, message.message_id);
                    break;
                case "emmeryn":
                bot.sendReply(message.chat.id, `Map has one Velezark level:

Lv. 118 Villager Rescue`, message.message_id);
                    break;
                case "caravan dancer":
                bot.sendReply(message.chat.id, `Map has two Velezark levels:

Lv. 103 Fort Seige
Lv. 128 Ally Rescue (you ain't getting that opus)`, message.message_id);
                    break;
                default:
                    bot.sendReply(message.chat.id, `Command was not in the correct format. Please input command in the folllowing format:

pb velezark mapName`, message.message_id);
            }
            if (velezarkAbsent) {
                bot.sendReply(message.chat.id, `Map has no Velezark levels`, message.message_id);
            }
            break;
        // Hololive live
        case 17:
            
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
        case 263: //Login for the website
            let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let randomLength = randomChars.length;
            let pwd = '';
            for (let i = 0; i < 6; i++) {
                pwd += randomChars.charAt(Math.floor(Math.random() * randomLength));
            }
            if (fs.existsSync(`/etc/velvet/${message.from.id}`)) {
                fs.unlinkSync(`/etc/velvet/${message.from.id}`);
            }
            fs.writeFileSync(`/etc/velvet/${message.from.id}`, pwd, function (err) {
                if (err) throw err;
            });
            fs.chmodSync(`/etc/velvet/${message.from.id}`, 0o777, function (err) {
                if (err) throw err;
            });
            bot.sendMessage(message.from.id, `User Id: ${message.from.id}
One-use password: ${pwd}`);
            bot.sendReply(message.chat.id, "I've sent you the login information in a private message.", message.message_id);
            break;
        case 264:
            console.log(exports.directory);
            break;
        default:
            console.error("Somehow there's a command of unknown type");
            break;
    }
}

async function processChat(chatId) {  // Will do more later, for now it just fixes the formatting so that processCommand works
    var chatObject = await bot.getChat(chatId);
    processCustomResponse(JSON.parse(chatObject).result);
}

function processCustomResponse(message) {
    if (message.hasOwnProperty('pinned_message')) {
        let failed = true;
        for (let i = 0; i < fileCache['pin'].length; i++) {
            if (fileCache['pin'][i].id == message.id) {
                if (fileCache['pin'][i].message == message.pinned_message.message_id) {
                    return;
                }
                fileCache['pin'][i].message = message.pinned_message.message_id;
                failed = false;
                writePins();
                break;
            }
        }
        if (failed) {
            let plusOne = fileCache['pin'].length;
            fileCache['pin'][plusOne] = {};
            fileCache['pin'][plusOne].id = message.id;
            fileCache['pin'][plusOne].message = message.pinned_message.message_id;
            writePins();
        }
    }
    else if (message.type != 'private' && message.type != 'channel') {
        for (let i = 0; i < fileCache['pin'].length; i++) {
            if (message.id == fileCache['pin'][i].id) {
                bot.sendMessage(message.id, "UNPINNED MESSAGE REEEEEEE");
                if (message.hasOwnProperty('permissions') && message.permissions.can_pin_messages) {
                    bot.pinMessage(message.id, fileCache['pin'][i].message);
                    break;
                }
            }
        }
    }
}

function writePins() {
    fs.writeFileSync("./" + exports.directory + '/pins.json', JSON.stringify(fileCache['pin']));
}

function loadCommands() {
    fileCache['commands'] = JSON.parse(fs.readFileSync("./" + exports.directory + '/commands.json'));
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
        fileId = message.animation.fileId;  //pretty sure this is wrong, check later
    }
    else if (parsedMessage[1] == 'video' || parsedMessage[1] == 'movie') {
        fileId = message.video.file_id
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
    for (let i = 0; i<fileCache['commands'].length; i++) {
        for (let j = 0; j<fileCache['commands'][i].command_names.length; j++) {
            messageText += fileCache['commands'][i].command_names[j];
            messageText += ": " + fileCache['commands'][i].command_description + "\n\n";
        }
    }
    console.log(messageText);
    bot.sendReply(message.chat.id, messageText, message.message_id);
}

//Shuts down the bot when the message "Spaniel broad tricycle" is received from an admin
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
    for (let i = 0; i < file.length; i++) {
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
