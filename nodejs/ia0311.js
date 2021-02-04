#!/usr/bin/env node

var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.setMaxListeners(2);

channel.clients = {};
channel.subscriptions = {};

channel.on('join', (id, client) => {
	// console.log('join: ', id, client);
	channel.clients[id] = client;
	channel.subscriptions[id] = (senderId, message) => {
		console.log('broadcast: ', senderId, " => ", id);
		if (id != senderId) {
			channel.clients[id].write(senderId + " => " + message);
		}
	};
	// wkliang:20170131 multiple copies for 'broadcast' event listener
	channel.on('broadcast', channel.subscriptions[id]);

	var welcome = "Welcome!\n" +
		"Guests online: " + channel.listeners('broadcast').length;
	client.write(welcome + "\n");
	channel.emit('broadcast', id, id + " has joined\n");
});

channel.on('leave', (id) => {
	channel.removeListener('broadcast', channel.subscriptions[id]);
	channel.emit('broadcast', id, id + " has left the chat.\n");
});

channel.on('shutdown', () => {
	channel.emit('broadcast', '', "Chat has shutdown.\n");
	channel.removeAllListeners('broadcast');
});

channel.on('error', (err) => {
	if (err) {
		console.error(err.stack);
	} else {
		console.error("Unspecifed error!!!");
	}
});

var server = net.createServer((client) => {
	var id = client.remoteAddress + ":" + client.remotePort;

	console.log('socket: ', id);
	channel.emit('join', id, client);

	client.on('close', () => {
		console.log('close: ', id);
		channel.emit('leave', id);
	});
	client.on('connected', () => {
		console.log('connect: ', id);
	});
	client.on('data', (data) => {
		var message = data.toString();
		var command = message.replace(/\s+/g, '');
		if (command == "shutdown")
			channel.emit('shutdown');
		else if (command == 'throw')
			channel.emit('error');
		else if (command == 'error')
			channel.emit('error', new Error('Something is wrong'));
		else
			channel.emit('broadcast', id, message);
	});
});
server.listen(8888);

process.on('uncaughtException', (err) => {
	console.log("uncaughtException captured");
	console.error(err.stack);
	process.exit(1);
});
