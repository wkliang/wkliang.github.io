
exports.start = function(response) {
	console.log("Request handler 'start' was called.");
	var data = "start me up!\n";
	response.writeHead(200, {
		"Content-Type" : "text/html; charset=UTF-8",
		"Content-Length" : data.length
	});
	response.write(data);
	response.end();
	return;
};

var exec = require('child_process').exec;
exports.ls = function(response) {
	console.log("Request handler 'ls' was called.");
	exec("ls -lt ../../html5",
		function(err, stdout, stderr) {
			if (err) throw err;
			var data = stdout;
			// console.log(data);
			response.writeHead(200, {
				"Content-Type" : "text/plain; charset=UTF-8",
				"Content-Length" : data.length
			});
			response.write(data);
			response.end();
		});
	return;
}

var querystring = require('querystring');
exports.upload = function(response, request) {
	console.log("Request handler 'upload' was called.");
	var postData = "";
	request.setEncoding("utf8");
	request.addListener("data", function(postDataChunk) {
		console.log("Received postDataChunk '" + postDataChunk + "'.");
		postData += postDataChunk;
	});
	request.addListener("end", function() {
		var data = querystring.parse(postData).text;
		console.log("Received postData end" +
			", data.length=" + data.length + 
			", Buffer.byteLength=" + Buffer.byteLength(data, 'utf8'));
		response.writeHead(200, {
			"Content-Type" : "text/plain; charset=UTF-8",
			"Content-Length" : Buffer.byteLength(data, 'utf8')
// wkliang:20151123: how to count utf8 from utf16?
// http://stackoverflow.com/questions/19339069/how-to-encode-http-response-body-as-utf-8-in-node-js
		});
		response.write(data);
		response.end();
	});
	return;
};

function dump(msg, obj) {
	var str = msg + "=>";
	for (var x in obj) {
		str += x + ":" + obj[x] + ",";
	}
	return str;
}

// Node.js in Action 2014
// 	4.4 Accepting user input from forms
//	Listing 4.6 To-do list form and item list
function notFound(res) {
	res.writeHead(404, {'content-type': 'text/plain'});
	res.end("Not Found");
}

function badRequest(res) {
	res.writeHead(400, {'content-type': 'text/plain'});
	res.end("Bad Request");
}

function isFormData(req) {
	var type = req.headers['content-type'] || '';
	return 0 == type.indexOf('multipart/form-data');
}

var formidable = require('formidable');
exports.upload2 = function(response, request) {
	console.log("Request handler 'upload2' was called.");

	if (!isFormData(req))
		return badRequest(res);

	var form = new formidable.IncomingForm();

	form.on('progress', function(received, expected) {
		// how to relay progress back to the user's browser?
		// Socket.IO !?
		var percent = Math.floor(received / expected * 100);
		console.log(percent, received, expected);
	});

	form.parse(request, function(error, fields, files) {
		// fs.renameSync(files.upload.path, "");
		console.log(dump("fields", fields));
		console.log(dump("files", files));
		// console.log(dump("files.upload", files.upload));
		var loc = "/form02.html";
		var data = "<html><head><title>Moved</title></head><body>" +
			"the document has moved " +
			'<a href="' + loc + '">here</a>' +
			"</body></html>";
		response.writeHead(302, {
			"Content-Type" : "text/html; charset=UTF-8",
			"Content-Length" : data.length,
			"Location" : loc
		});
		response.write(data);
		response.end();
	});
};

var old_sleep = function() {
	console.log("Request handler 'sleep' was called.");
	var startTime = new Date().getTime();
	var content = "";
	while (new Date().getTime() < startTime + 10000) {
		content += "!"
	}
	return content + "\n";
};

