var express = require("express");
var app = express();
var bodyParser = require("body-parser");
require("dotenv").config();

const webSocketsServerPort = 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});

const subscriptionNameOrId = "device-home-pull";
// Imports the Google Cloud client library
const { PubSub } = require("@google-cloud/pubsub");
// Creates a client; cache this for further use
var pubSubClient = new PubSub();
function listenForMessages() {
  // References an existing subscription
  const subscription = pubSubClient.subscription(subscriptionNameOrId);

  // Create an event handler to handle messages
  let messageCount = 0;
  let deviceData;
  const messageHandler = (message) => {
    deviceData = message.data;
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    wsServer.on("connection", function connection(ws) {
      //var deviceData = listenForMessages();

      console.log("new client connected!!");

      ws.send(message.data);
    });

    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };
  // Listen for new messages until timeout is hit
  subscription.on("message", messageHandler);

  return deviceData;
}

listenForMessages();

wsServer.on("request", function (request) {
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);

  connection.send("test");
});

const port = 5000;

function copyConfig() {
  var envMap = {};

  envMap = require("../config/config.json");
  envMap.forEach((val) => {
    process.env[val[0]] = val[1];
  });
}

copyConfig();

app.listen(port, () => console.log(`server running on the port:${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all("*", function (req, resp, next) {
  console.info(resp.statusCode, req.url, req.params);
  next();
});

app.use("/api/device", require("./controller/DeviceControl"));

module.exports = app;
