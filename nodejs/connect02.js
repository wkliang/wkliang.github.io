#!/usr/bin/env node

// wkliang:20170430
// 	6.6.3 Using multiple error-handling middleware components

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

var api = connect()
	.use(function users(req, res, next) {
		var match = req.url.match(/^\/user\/(.+)/);
		if (!match)
			return next();
		var user = match[1];
		if (!user.match(/(tobi|loki|jane)/)) {
			var err = new Error("User not found");
			err.notFound = true;
			return next(err);
		}
		res.setHeader('Content-Type', 'application/json');
		res.end(JSON.stringify({name : user}));
	})
	.use(function pets(req, res, next) {
		if (req.url.match(/^\/pet\/(.+)/)) {
			foo();	// no such function defined, causing error 
		} else {
			next();
		}
	})
	.use(function errorHandler(err, req, res, next) {
		console.error(err.stack);
		res.setHeader('Content-Type', 'application/json');
		res.statuseCode = 500;
		res.end(JSON.stringify({ error: err }));
	});

connect()
	.use(logger)
	.use('/api', api)
	.use('/admin', restrict)
	.use('/admin', function(req,res,next) {
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		res.end("URL: " + req.url + " is coming after /admin");
	})
	.use(function finalBorder(req,res,next) {
		console.error("Finally ... ", req.url);
		next(new Error("final border" + req.url));
	})
	.use(function errorPage(err,req,res,next) {
		res.statusCode = 404;
		res.setHeader('Content-Type', 'text/plain; charset=utf-8');
		Object.keys(req.rawHeaders).forEach((k,i) => {
			res.write(k + "\t" + req.rawHeaders[k] + ".\r\n");
		});
		res.end(typeof(req.rawHeaders) + "\r\n---> " + err);
	})
	.listen(3000);
