#!/usr/bin/env node

// wkliang:20170428: test on various socks proxy agents.

var url = require('url');

// HTTP endpoint for the proxy to connect to
var targets = [
	"https://check.torproject.org/",
	"http://3g2upl4pq6kufc4m.onion/",
	"https://github.com/",
	"https://nodejs.org/api/",
	"https://www.jkforum.net/forum.php",
	"http://www.ek21.com/" ];
var endpoint = process.argv[2] || targets[0];
console.log("Attempting to GET %j", endpoint);

// https://github.com/JoshGlazebrook/socks
// https://github.com/TooTallNate/node-socks-proxy-agent
// https://gist.github.com/TooTallNate/5952254
function socksProxyAgent() {
	// SOCKS proxy to connect to
	var proxy = process.env.socks_proxy || "socks://127.0.0.1:9150";
	console.log("Using proxy server %j", proxy);

	// create an instance of the "SocksProxyAgent" class with the proxy server information
	var SocksProxyAgent = require('socks-proxy-agent');
	return new SocksProxyAgent(proxy);
}

// https://www.npmjs.com/package/socks
function socksClientAgent() {
	var socks = require("socks-client");
	return new socks.Agent({proxy: {
		ipaddress: "127.0.0.1",
		port: 9150,
		type: 5,
		command: "connect"
	}});
}

// https://github.com/mscdex/socksv5
//	Protocol "https:" not supported. Expected "http:" ??
function socksv5HttpAgent() {
	var socks = require('socksv5');
	return new socks.HttpAgent({
		proxyHost: '127.0.0.1',
		proxyPort: 9150,
		auths: [socks.auth.None()]
	});
}

if (false) { // to inspect an agent
function dumpObj(obj) {
	// Object.keys(obj)
	['createConnection', 'getName', 'addRequest', 'createSocket', 'removeSocket', 'destroy']
	.forEach((key, i) => {
		if (typeof obj[key] === 'function')
			console.log(key, " --> method(){}");
		else
			console.log(key, " --> value:", obj[key]);
	});
	// for (var i = 0; i < keys.length; ++i) { }
}

var http = require('http');
var events = require('events');
[new http.Agent(), socksProxyAgent(), socksClientAgent(), socksv5HttpAgent()]
.forEach((agent, i) => {
	// console.log("instanceof http.Agent:", agent instanceof http.Agent);
	// console.log("instanceof events.Emitter:", agent instanceof events.EventEmitter);
	console.log("agent.constructor.name:", agent.constructor.name);
	// dumpObj(agent.prototype);
	// dumpObj(agent.__proto__);
	// dumpObj(agent.constructor.prototype);
	dumpObj(agent);
});
process.exit();
}

function getUrl(endpoint, agent) {
	var opts = url.parse(endpoint);
	opts.agent = agent;
	var client;
	if (opts.protocol == "https:") {
		client = require('https')
		opts.port = (opts.port) ? opts.port : 443;
		opts.agent.secure = true; // for "socks-client"
	} else {
		client = require('http');
		opts.port = (opts.port) ? opts.port : 80;
	}
	console.dir(opts);

	return new Promise((resolve, reject) => {
		client.get(opts, function(res) {
			// console.dir(res);
			// res.pipe(process.stdout);
			console.log("Response:", res.headers);
			let data = "";
			res.on('data', (chunk) => data += chunk);
			res.on('end', () => resolve(data));
		})
		.on('error', function(err) {
			// console.error("!!!ERROR!!!", err);
			reject(err);
		})
		.end();
	});
}

getUrl(endpoint, socksProxyAgent())
// getUrl(endpoint, socksClientAgent())
// getUrl(endpoint, socksv5HttpAgent())
.then(function(data) {
	let text = data.replace(/[\r\n]/g, '');
	let result = /\<h1.*(Congratulations|Sorry).+\<strong\>(.*)\<\/strong\>/g.exec(text);
	if (result && result.length)
		console.log("Result:", result[1], result[2]);
	else
		console.log("Result:", data);
})
.catch(reason => console.error("catch error:", reason));

process.on('uncaughtException', function(err) {
	console.error('!!!uncaughtException!!!', err);
	process.exit();
});
