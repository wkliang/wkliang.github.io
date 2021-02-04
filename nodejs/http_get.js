#!/usr/bin/env node

'use strict'

// https://github.com/TooTallNate/node-agent-base
// https://github.com/TooTallNate/node-socks-proxy-agent

/*
var url = require('url');

var endpoint = process.argv[2] || "https://encrypted.google.com/";
var opts = url.parse(endpoint);
console.log(opts);

// var agent = require('events').EventEmitter; // require('agent-base');
// opts.agent = new agent();

http.get(opts, function(res) {
	console.log("response:", res.headers);
	// res.pipe(process.stdout);
});
*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// A-> $http function is implemented in order to follow the standard Adapter pattern
function $http(url) {
	// A small example of object
	var core = {
		'ajax': function(method, url, args) {
			return new Promise(function(resolve, reject) {
				console.log(0, method, url, args);

				if (args && method === 'GET') {
					url += '?';
					var argcount = 0;
					for (var key in args) {
						if (args.hasOwnProperty(key)) {
							if (argcount++) {
								url += '&';
							}
							url += encodeURIComponent(key)
								+ '=' + encodeURIComponent(args[key]);
						}
					}
				}
				var opts = require('url').parse(url);
				opts.method = method;

				var http = (opts.protocol === "https:") ?
					require('https') : require('http');
				console.log(0, 'opts:', opts);
				http.request(opts, function(res) {
					console.log(0, 'res.statusCode:', res.statusCode);
					console.log(0, 'res.headers:', res.headers);
					// res.pipe(process.stdout);
					if (res.statusCode != 200)
						reject(res.statusCode);
					else {
						var body = "";
						res.setEncoding('utf8');
						res.on('data', chunk => body += chunk);
						res.on('end', () => resolve(body));
						// resolve("lightspeed: 299792458");
					}
				}).end();
			});
		}
	};

	// Adapter pattern
	return {
		'get':    args => core.ajax('GET',    url, args),
		'post':   args => core.ajax('POST',   url, args),
		'put':    args => core.ajax('PUT',    url, args),
		'delete': args => core.ajax('DELETE', url, args)
	};
}
// End A

// B-> Here you define its functions and its payload
var mdnAPI = 'https://developer.mozilla.org/en-US/search.json';
		// "https://encrypted.google.com/";
var payload = {
	'topic': "js",
	'q':     "Promise"
};
var callback = {
	'success': data => console.log(1, 'success', JSON.parse(data)),
	'error':   data => console.log(2, 'error',   data)  // , JSON.parse(data))
};
// End B

// Executes the method call
$http(mdnAPI).get(payload)
	.then(callback.success)
	.catch(callback.error);

// Executes the method call but an alternative way (1) to handle Promise Reject case
//	.then(callback.success, callback.error);

// Executes the method call but an alternative way (2) to handle Promise Reject case
//	.then(callback.success)
//	.then(undefined, callback.error);

const fx = a => b => c => d => a + b + c + d
const fy = function(a) {
	return function(b) {
		return function(c) {
			return function(d) {
				return a + b + c + d;
			}
		}
	}
}
console.log("f(1)(2)(3)(4):", fx(1)(2)(3)(4));
