#!/usr/bin/env node

// http://stackoverflow.com/questions/10703513/node-js-client-for-a-socket-io-server
// https://github.com/socketio/socket.io-client

// the version must be matched with server-side
// http://stackoverflow.com/questions/22445043/node-js-socket-io-client-unhandled-socket-io-url

var io = require('socket.io-client');

socket = io.connect("http://127.0.0.1:8080/", 
	{ reconnect: true });

socket.on('connect', function(sock) {
	console.log("websocket connected: " + sock);

	socket.emit("nameAttempt", "proxy");
});

socket.on('joinResult', function(result) {
	console.log(result);
});

socket.on('rooms', function(rooms) {
	console.log(rooms);
});

socket.on('message', function(message) {
	console.log("message:", message);
});

socket.on('chat message', function(message) {
	console.log("chat message:", message);
});


