#!/usr/bin/env node

// wkliang:20170428: test on various socks proxy agents.

var url = require('url');
var util = require('util');

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

process.on('uncaughtException', function(err) {
	console.error('!!!uncaughtException!!!', err);
	process.exit();
});

// https://github.com/JoshGlazebrook/socks
// https://github.com/TooTallNate/node-socks-proxy-agent
// https://gist.github.com/TooTallNate/5952254
function socksProxyAgent(opts) {
	// SOCKS proxy to connect to
	var proxy = process.env.socks_proxy || "socks://127.0.0.1:9150";

	// create an instance of the "SocksProxyAgent" class with the proxy server information
	var SocksProxyAgent = require('socks-proxy-agent');
 	var agent = new SocksProxyAgent(proxy);
	opts.agent = agent;

	console.log("socks-proxy-agent", proxy);
}

// https://www.npmjs.com/package/socks
function socksClientAgent(opts) {
	var socks = require("socks-client");
	opts.agent = new socks.Agent({proxy: {
		ipaddress: "127.0.0.1",
		port: 9150,
		type: 5,
		command: "connect"
	}});
	if (opts.protocol === "https:")
		opts.agent.secure = true; // for "socks-client"
	console.log("socks-client", opts.agent.secure);
}

// https://github.com/mscdex/socksv5
//	Protocol "https:" not supported. Expected "http:" ??
function socksv5HttpAgent(opts) {
	var socks = require('socksv5');
	var proxy = {
		proxyHost: '127.0.0.1',
		proxyPort: 9150,
		auths: [socks.auth.None()]
	};
	opts.agent = (opts.protocol === "https:") ?
		new socks.HttpsAgent(proxy) :
		new socks.HttpAgent(proxy);
	console.log('socksv5', opts.agent instanceof socks.HttpsAgent);
}

if (false) { // to inspect an agent
var http = require('http');
var events = require('events');
function dumpObj(obj) {
// ['createConnection', 'getName', 'addRequest', 'createSocket', 'removeSocket', 'destroy']
	Object.keys(obj)
	.forEach((key, i) => {
		if (typeof obj[key] === 'function')
			console.log(key, " --> method(){}");
		else
			console.log(key, " --> value:", obj[key]);
	});
	// for (var i = 0; i < keys.length; ++i) { }
}

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

function requestUrl() {
	var opts = {};
	for (let i = 0; i < arguments.length; ++i) {
		if (typeof arguments[i] === 'function')
			arguments[i](opts);
		else	// treat arg as regular object
			util._extend(opts, arguments[i]);
	}
	var client;
	if (opts.protocol == "https:") {
		client = require('https')
		opts.port = (opts.port) ? opts.port : 443;
	} else {
		client = require('http');
		opts.port = (opts.port) ? opts.port : 80;
	}
	if (opts.post_data) {
		opts.body = require('querystring').stringify(opts.post_data);
		opts.headers['Content-Type'] = "application/x-www-form-urlencoded",
		opts.headers['Content-Length'] = Buffer.byteLength(opts.body);
	}
	// dumpObj(opts);
	return new Promise((resolve, reject) => {
		var req = client.request(opts, function(res) {
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
		});
		if (opts.method === 'POST') {
			req.write(opts.body);
		} 
		req.end();
	});
}

// requestUrl(url.parse(endpoint), socksProxyAgent)
// requestUrl(url.parse(endpoint), socksClientAgent)
// requestUrl(url.parse(endpoint), socksv5HttpAgent)
requestUrl(url.parse(endpoint))
.then(function(data) {
	let result = data
		// .replace(/[\r\n]/g, '')
		.match(/(Congratulations|Sorry)[\s\S]*\<strong\>(\S+)\<\/strong\>/);
	if (result && result.length)
		console.log("Result:", result[1], result[2]);
	else
		console.log("Result:", result);
})
.then(() => requestUrl({'method' : 'POST',
			// 'body' : 'roomid=age_15&nickname=Natalia&password=&gender=girl',
			'post_data' : {
				'roomid' : "age_15",
				'nickname' : "LetItBeNaked",
				'password' : "1q2w3e4r",
				'gender' : "girl"
			},
			'headers' : {
				'Host' : "ip4.ek21.com",
				'Referer' : "http://ip4.ek21.com/age_15/?ot=1",
				'Cookie' : "pk=2N95",
				// 'Content-Type' : "application/x-www-form-urlencoded",
				// 'Content-Length' : "52",
				'Connection': 'keep-alive'
			}},
	// url.parse("http://ip4.ek21.com/login?r=0.9876543210987654"),
	url.parse("http://61.230.134.190:3000/login?r=0.9876543210987654"),
	socksv5HttpAgent)
)
.then((data) => console.log("Return: ", data))
.catch(reason => console.error("catch error:", reason))
.then(() => process.exit())	// always run this finally

