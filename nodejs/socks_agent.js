#!/usr/bin/env node

// https://github.com/JoshGlazebrook/socks
// https://github.com/TooTallNate/node-socks-proxy-agent
// https://gist.github.com/TooTallNate/5952254

var url = require('url');
var SocksProxyAgent = require('socks-proxy-agent');

// SOCKS proxy to connect to
var proxy = process.env.socks_proxy || "socks://127.0.0.1:9150";
console.log("Using proxy server %j", proxy);

// create an instance of the "SocksProxyAgent" class with the proxy server information
var agent = new SocksProxyAgent(proxy);

// HTTP endpoint for the proxy to connect to
// var endpoint = process.argv[2] || "http://3g2upl4pq6kufc4m.onion/";
// var endpoint = process.argv[2] || "https://nodejs.org/api/";
// var endpoint = process.argv[2] || "https://check.torproject.org/";
// opts = url.parse("https://github.com/");
// opts = url.parse("https://www.jkforum.net/forum.php");
var endpoint = process.argv[2] || "http://www.ek21.com/";
console.log("Attempting to GET %j", endpoint);

var opts = url.parse(endpoint);
console.dir(opts);
opts.agent = agent;
var client = (opts.protocol == "https:") ? require('https') : require('http');
client.get(opts, function(res) {
	console.dir(res);
	console.log("response event!", res.headers);
	res.pipe(process.stdout);
}).on('error', function(err) {
	console.error("!!!ERROR!!!", err);
});

process.on('uncaughtException', function(err) {
	console.error('!!!uncaughtException!!!', err);
	process.exit();
});
