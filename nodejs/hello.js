#!/usr/bin/env node

// http://www.ruanyifeng.com/blog/2015/05/command-line-with-node.html
// Node.js 命令行程序开发教程

for (var i = 0; i < process.argv.length; ++i) {
	console.log(i + ": " + process.argv[i]);
}

var exec = require('child_process').exec;
var child = exec('ls -lt .',
	 function(err, stdout, stderr) {
		if (err)
			throw err;
		console.log(stdout);
	});

console.log('__filename: ' + __filename);
console.log('__dirname: %s', __dirname);

var http = require('http');
var options = {
	hostname: '127.0.0.1',
	port: 8000,
	path: '/',
	method: 'GET'
};

console.log(options);
var req = http.request(options,
	function(res) {
		"strict";
		console.log('STATUS: ' + res.statusCode);
		var rhs = JSON.stringify(res.headers);
		for (var rhl in res.headers) {
			console.log("H(" + rhl + "): " + res.headers[rhl]);
		}
		res.setEncoding('utf8');
		res.on('data', function(chunk) {
			console.log('BODY: ' + chunk);
		});
	});

req.end();
