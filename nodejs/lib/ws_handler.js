
var util = require('util');
var events = require('events');

// https://github.com/faye/websocket-driver-node
// http://blog.fens.me/nodejs-websocket/
//
// https://github.com/joewalnes/web-vmstats
// for reconnecting-websocket.js
//
var webSocket = require('websocket-driver');

var channel = new events.EventEmitter();
channel.setMaxListeners(2);

var subscriptions = {};

var clients = {};
var clients_number = 0;
var clients_timer = setInterval(() => {
	let now = (new Date).getTime();
	for (let c in clients) {
		let elapse = (now - clients[c].activity.getTime()) / 1000;
		if (elapse > 600)
			console.log('stale', c, elapse, clients[c].driver.emit('close', 'stale'));
		else if (elapse > 60)
			console.log("ping", c, elapse, clients[c].driver.ping());
		else
			console.log('fresh', c, elapse);
	}
}, 30000);

clients_broadcast = function(msg) {
	for (let c in clients) {
		clients[c].driver.messages.write(msg);
	};
};

util.inherits(EventHandler, events.EventEmitter);
util._extend(EventHandler.prototype, {
	join : function(socket) {
		console.log("ws_events socket:", socket.remoteAddress + ":" + socket.remotePort);
	},
	broadcast: function(evt, msg) {
		clients_broadcast(evt+"=>"+msg);
	},
	send: function(evt, msg) {
		this.driver.messages.write(evt+"->"+msg);
	}
});

function EventHandler(request, socket, driver) {
/*	if (!(this instanceof EventHandler)) {
		return new EventHandler(socket);
	}
*/
	this.id = socket.remoteAddress + ":" + socket.remotePort;
	this.request = request;
	this.socket = socket;
	this.driver = driver;
	this.activity = new Date();
	var thiz = this;

	console.log("ws_events socket:", this.id);

	driver.messages.on('data', function(message) {
		thiz.activity = new Date();
		thiz.emit('message', message);
		// driver.messages.write(message);
	});
	driver.on('close', function(event) {
		console.log('close', new Date - thiz.activity, event);
		thiz.emit('close', event);
		driver.close();
		delete clients[thiz.id];
		clients_number--;
	});
	driver.start();
	clients[this.id] = this;
	clients_number++;
	process.nextTick(() => {
		console.log('message', 'clients: ' + clients_number);
		this.emit('message', 'clients: ' + clients_number);
	});
}

module.exports = function(cb) {
	return function(request, socket, body) {
		if (!webSocket.isWebSocket(request)) {
			console.error("not websocket");
			return;
		}
		var driver = webSocket.http(request);
		driver.io.write(body);
		socket.pipe(driver.io).pipe(socket);

		cb(new EventHandler(request, socket, driver));
	}
};
