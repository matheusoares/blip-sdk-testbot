const BlipSdk = require('blip-sdk')
const WebSocketTransport = require('lime-transport-websocket')
const Lime = require('lime-js')
require('dotenv/config')

// Create a client instance passing the identifier and accessKey of your chatbot
let client = new BlipSdk.ClientBuilder()
    .withIdentifier(process.env.IDENTIFIER)
    .withAccessKey(process.env.ACCESS_KEY)
    .withTransportFactory(() => new WebSocketTransport())
    .build();

// Connect with server asynchronously
// Connection will occurr via websocket on 8081 port.
client.connect() // This method return a 'promise'.
    .then(function (session) {
        console.log('Ta funfando')
    })
    .catch(function (err) { console.log(err) });

client.addMessageReceiver('text/plain', async function (message) {
    // var msg = {
    //     type: "text/plain",
    //     content: `${message.content}`,
    //     to: message.from
    // };
    //console.log(typeof message.content != 'object' ? message : '')
    //typeof message.content != 'object' ? client.sendMessage(msg) : ''

    const test = await client.sendCommand({
        id: Lime.Guid(),
        to: 'postmaster@ai.msging.net',
        method: Lime.CommandMethod.SET,
        uri: '/analysis',
        type: 'application/vnd.iris.ai.analysis-request+json',
        resource: {
            text: typeof message.content != 'object' ? message.content : ''
        }
    }).catch(function (err) { console.log(err) });
    console.log(test.resource.intentions)
});