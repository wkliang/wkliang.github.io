#!/usr/bin/env node

// https://www.npmjs.com/package/socks

var socks = require("socks-client");

var proxy = {
	ipaddress: "127.0.0.1",
	port: 9150,
	type: 5,
	command: "connect"
};

var options = {
	proxy:  proxy,
	target: {
		host: "3g2upl4pq6kufc4m.onion",
		port: 80
	}
};

var socksAgent = new socks.Agent({proxy: proxy},
	true,	// true for HTTPS, false for HTTP
	false	// reject Unauthorized option passed
);

// wkliang:20161023 early exit
// process.nextTick(() => process.exit(0));

new Promise(function(resolve,reject) {

	socks.createConnection(options, function(err, socket, info) {
		if (err) reject(err);
		else {
			// BIND request has completed
			// info object contains the remote ip and newly opened tcp port to connect to
			// console.log("info: " + info);

			socket.write("HEAD / HTTP/1.0\r\n\r\n");

			socket.on('data', function(data) {
				console.log("data.length:", data.length);
				console.log("data:", data.toString());
			});
			socket.on('end', function() {
				console.log("end:", new Date());
				resolve(info);
			});

			// Remember to resume the socket stream
			socket.resume();
		}
	});
})
.then(function(info) {
	console.log("info:", info);
})
.then(function(unused) {
	require('https').request({
		// hostname: "github.com",
		// hostname: "google.com",
		// hostname: "3g2upl4pq6kufc4m.onion",
		hostname: "check.torproject.org",
		port: "443",
		path: "/",
		method: "GET",
		agent: socksAgent
	}, function (res) {
		console.log("RES.headers", res.headers);
		// socksAgent.encryptedSocket.end();
		let data = "";
		res.on('error', function(err) {
			console.err("ERROR", err);
		});
		res.on('data', function(chunk) {
			// console.log('BODY: ' + chunk);
			data += chunk;
		});
		res.on('end', function() {
			// console.log("data.length:", data.length);
			// console.log(data.match(/class\=\"(\w+)\"/g));
			// console.log(data.match(/class\=\"content\"(.+)class\=\"security\"/g));
			// console.log(data.replace(/[\r\n]/g, '').match(/\<h1.*(Congratulations|Sorry).+\<strong\>(.*)\<\/strong\>/g));
			let text = data.replace(/[\r\n]/g, '');
			let result = /\<h1.*(Congratulations|Sorry).+\<strong\>(.*)\<\/strong\>/g.exec(text);
			console.log(result[1], result[2]);
			
		});

	}).end();
})
.catch(reason => console.error("ERROR:", reason));
