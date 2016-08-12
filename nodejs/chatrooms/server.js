
var http = require('http');	// Built-in http module provides HTTP server and client functionality
var fs = require('fs');		// filesystem-related functionality
var path = require('path');	// filesystem path-related
var mime = require('mime');	// add-on mime module provides ability to derive a MIME type 
				// based on a filename extension

var cache = {};	// cache object is where the contents of cached files are stored

function send404(response) {
	response.writeHead(404, {'Content-Type': 'text/plain'});
	response.write('Error 404: resource not found.');
	response.end();
}

function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {'Content-Type': mime.lookup(path.basename(filePath))});
	response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
	} else {
		fs.exists(absPath, function(exists) {
			if (exists) {
				fs.readFile(absPath, function(err, data) {
					if (err) {
						send404(response);
					} else {
						cache[absPath] = data;
						sendFile(response, absPath, data);
					}
				});
			} else {
				send404(response);
			}
		});
	}
}

var server = http.createServer(function(request, response) {
	var filePath = false;

	if (request.url == '/') {
		filePath = 'pub/index.html';
	} else {
		filePath = 'pub' + request.url;	// translate URL path to relative file path
	}

	var absPath = './' + filePath;
	serveStatic(response, cache, absPath);
});

// starting the HTTP server
server.listen(8080, function() {
	console.log("Server listening on port 8080.");
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);

