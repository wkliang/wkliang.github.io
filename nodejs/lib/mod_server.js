
var http = require('http');
var url = require('url');

exports.start = function(route, handle) {
	console.log("mod_server.js start.");
	return http.createServer(function(request, response) {
		var url_parsed = url.parse(request.url);
		var pathname = url_parsed.pathname;
		var query = url_parsed.query;
/*
		for (var x in url_parsed) {
			console.log(x + ":" + url_parsed[x]);
		}
*/
		route(handle, pathname, response, request);
	}).listen(8080, function() {
		console.log("listening 8080");
	});
};

