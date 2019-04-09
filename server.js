var server = null;
var responseCallback = null;
var token = "";
var url = "";

var fs = require('fs');

exports.killServer = function(callback) {
    server.close(callback);
}

exports.startServer = function(callback, botToken, botUrl) {
    responseCallback = callback;
    token = botToken;
    url = botUrl;
    server = https.createServer(options, serverResponse).listen(443);
}

function testFunction(data) {
    console.log(data);
}

var https = require('https');
var options = {
    key: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/velvetbotv2.ddns.net/chain.pem')
};
//Remove the fs module since we are no longer using it
fs = null;

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
            //Send over the message
            responseCallback(data.message);
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
