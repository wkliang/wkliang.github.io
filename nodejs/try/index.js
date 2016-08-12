
var server = require('./mod_server');
var router = require('./mod_router');
var handle = require('./mod_handle');

var io = require('socket.io')(server.start(router.route, handle));
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

