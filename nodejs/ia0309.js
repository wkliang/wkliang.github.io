#!/usr/bin/env node

var fs = require('fs');
var net = require('net');

var server = net.createServer(
	function(socket) {
		console.log(new Date() + " : " + socket);
		// socket.once('data', (data) => console.log(data, data.toString()));
		socket.once('data', (data) => {
/*
	http://stackoverflow.com/questions/17136536/is-enoent-from-fs-createreadstream-uncatchable

	fs.createReadStream is asynchronous with the event emitter style and
	does not throw exceptions (which only make sense for synchronous code).
	Instead it will emit an error event.
*/
			var is = fs.createReadStream(data.toString().replace(/\s+/g, ''));
			is.on('error', (error) => console.error("Caught", error));
			is.on('readable', () => is.pipe(socket));
		});
		socket.on('data', function(data) {
			socket.write(data);
		});
	});
server.listen(8888);
