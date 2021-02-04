#!/usr/bin/env node

let logger = (function setup(format) {
	var regexp = /\$(\w+)/g;
	return function logger(req, res, next) {
		var str = format.replace(regexp, function(match, property) {
			return req[property];
		});
		console.log(str);
		next();
	}
})("$method: ---> $url");

// test on logger
logger({method: "head", url: "http://www.example.org"}, null,
	function() {
		console.log("logger -> next() for nothing");
	});

let restrict = (function setup(check) {
	return function restrict(req, res, next) {
		let err4xx = {'Content-Type': 'text/plain',
			'WWW-Authenticate': 'Basic realm="/admin"'};
		let authorization = req.headers.authorization;
		if (!authorization) {
			res.writeHead(401, err4xx);
			res.end('Unauthorized');
			return;
		}
		let parts = authorization.split(' ');
		let scheme = parts[0];
		let auth = new Buffer(parts[1], 'base64').toString().split(':');
		console.log("scheme: %s, user: %s, pass: %s.", scheme, auth[0], auth[1]);
		check(auth[0], auth[1], function(err) {
			if (err) {
				res.writeHead(401, err4xx);
				res.end('Fail on checking...');
				return;
			}
			next(); // OK to go
		});
}
})(function check(user, pass, next) {
	if (user === "hello" && pass === "world")
		next(false);
	else
		next(true);
});

// test on restrict
restrict({'headers': {'authorization' : 'xxx 0123456789abcdef'}},
	{
		'writeHead': function(code, headers) {
			console.log("%d %s", code, JSON.stringify(headers));
		},
		'end': function(msg) {
			console.log('end: ', msg);
		}
	 },
	function() {
		console.log("restrict -> next() for nothing");
	});

var connect = require('connect');
connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', function(req,res,next) {
		res.setHeader('Content-Type', 'text/plain');
		res.end("URL: " + req.url + " is coming after /admin");
	})
	.use(function(req,res,next) {
		res.setHeader('Content-Type', 'text/plain');
		res.end('hello, world');
	})
	.listen(3000);
