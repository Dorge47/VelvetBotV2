var token = '625045601:AAF4Kr-a7yJRGVUU9ssi0MI79NZDeN-RUws'

function getMessages() {
    var url = 'https://api.telegram.org/bot' + token + '/getUpdates'
    fetch(url, {
        headers: {
            'Cache-Control': 'no-store' //avoid getting messages from cache
        }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson) {
        messagesGotten = myJson;
    });
    setTimeout(function() {
        messages = messagesGotten.result
    }, 1000)
}
