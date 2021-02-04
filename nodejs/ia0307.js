#!/usr/bin/env node

var http = require('http');
var fs = require('fs');

function serveContent(req, res) {
	fs.readFile("./public/titles.json", function(err, data) {
		if (err) {
			console.error(err);
			res.end('Server Error');
		}
		else {
			var titles = JSON.parse(data.toString());
			fs.readFile("./public/template.html", function(err, data) {
				if (err) {
					console.error(err);
					res.end('Server Error');
				}
				else {
					var tmpl = data.toString();
					var html = tmpl.replace('%', titles.join('</li><li>'));
					res.writeHead(200, {'Content-Type' : 'text/html'});
					res.end(html);
				}
			});
		}
	});
}

const readFilePromise = function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path.toString().trim(), (err, data) => {
			if (err) reject(err);
			else {
				console.log("data:", data.toString().substring(0, 256));
				resolve(data.toString());
			}
		});
	});
};

function servePromisePage(req, res) {
	var titles = [];
	readFilePromise("./public/titles.json")
	.then(resolve => { titles = JSON.parse(resolve) })
	.then(() => readFilePromise("./public/template.html"))
	.then(resolve => {
		var tmpl = resolve;
		var html = tmpl.replace('%', titles.join('</li><li>'));
		res.writeHead(200, {'Content-Type' : 'text/html'});
		res.end(html);
	})
	.catch(reason => {
		console.error(reason);
		res.writeHead(500, {'Content-Type' : 'text/plain'});
		res.end("" + reason.toString());
	});
}

http.createServer(function(req, res) {
	if (req.url == "/")
		servePromisePage(req, res);
	else
		res.end('Server Error');
}).listen(8080, "127.0.0.1");
