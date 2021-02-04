#!/usr/bin/env node

var server = require('./lib/mod_server');
var router = require('./lib/mod_router');
var handle = require('./lib/mod_handle');

var io = require('socket.io').listen(server.start(router.route, handle));
io.on('connection', function(socket) {
	console.log('a client connected');
	var timer = setInterval(function() {
		socket.emit('message', {'msg': new Date()});
		clearInterval(timer);
	}, 1000);
	io.emit('message', {'msg': "A new client connected"});
	socket.on('chat message', function(msg) {
		// console.log('message: ' + msg);
		// socket.emit('message', {'msg': "free from updating clock"});
		io.emit('chat message', {'msg' : msg});
	});
});

