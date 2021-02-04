#!/usr/bin/env node

// wkliang:20170501: test on various IRC lib + app
// https://github.com/martynsmith/node-irc

// wkliang:20170517: Implementing the IRC spec in Node.js
// https://hackernoon.com/implementing-the-irc-spec-in-node-js-c630b8cd5771

var net = require('net');
var client = net.connect({
	host: 'chat.freenode.net',
	port: '6667'
});

// var replace = require('stram-replace');
var replace = require('through')(
	function write(data) {
		this.queue(data.toString().replace(/\n/g, '\r\n'));
	},
	function end() {
		this.queue(null);
	});

client.pipe(process.stdout);
process.stdin.pipe(replace).pipe(client);
