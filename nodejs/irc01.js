#!/usr/bin/env node

// wkliang:20170501: test on various IRC lib + app
// https://github.com/martynsmith/node-irc

var irc = require('irc');
var client = new irc.Client('chat.freenode.net', 'TamagochiX', {
	debug: true,
	channels: ['#wikipedia-zh'],
});

client.addListener('error', function(message) {
	console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

client.addListener('message', function(from, to, message) {
	console.log(from + ' => ' + to + ": " + message);
});

client.addListener('pm', function(from, message) {
	console.log(from + ' => ME: ' + message);
});

client.say('#ion.tw', "Call from node-irc....");
