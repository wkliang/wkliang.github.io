#!/usr/bin/env node

// Professional Node.js: Building Javascript-Based Scalable Software (2013)
// Chapter 13: Making HTTP requests
// 	Using a Third-Party Request Module to Simplify HTTP Requests
//
// Listing 13-1: Request introspector HTTP server.
// Listing 13-2: Making a simple request.
// Listing 13-5: Sending some custom headers.
// Listing 13-6: Sending a form-encoded request body.
//
// wget -d http://127.0.0.1:8080/redirect -O -

var request = require('request');
var inspect = require('util').inspect;

[
{	url: "http://127.0.0.1:8080/print/body",
	method: 'POST',
	form: {	// or json
		a: 1,
		b: 2
	},
	headers: {
		'X-My-Header': "value"
	}
},
{	url: "http://127.0.0.1:8080/abc/def/xyz",
	method: 'POST',
	headers: {
		'X-My-Header': "value"
	}
},
{	url: "http://127.0.0.1:8080/redirect",
	method: 'GET',
	headers: {
		'X-My-Header': "foo bar"
	}
}
//	"http://www.example.com"
].map(function (opt) {
	request(opt,
		function(err, res, body) {
			if (err) throw err;
			console.log(inspect({
				err: err,
				res: {
					statusCode: res.statusCode,
					headers: res.headers
				},
				body: body ? JSON.parse(body) : body.toString()
			}));
		}
	);
});
