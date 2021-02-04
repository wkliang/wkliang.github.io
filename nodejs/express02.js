#!/usr/bin/env node

// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction

var express = require("express");
var app = express();

app.use(function(req, res, next) {
	console.log("Request: ", req.headers);
	// console.log("Cookies: ", req.cookies);
	// console.log("url:", req.method, req.url, ", cookies:", req.cookies);
	next();
});

app.all('/secret', function(req, res, next) {
	console.log('Accessing the secret section ...');
	next(); // pass control to the next handler
});


// wkliang:20190331 - Router() must be used with express-4 above
var wiki = express.Router();
// console.log('wiki:', wiki);

wiki.get('/', function(req, res) {
	res.send('Wiki home page');
});

wiki.get('/about', function(req, res) {
	res.send('About this wiki');
});

app.use('/wiki', wiki);

var http = require("http").Server(app);
var server = http.listen(8080, function() {
	console.log("Example app listening at http://%s:%s",
		server.address().address,
		server.address().port);
});

