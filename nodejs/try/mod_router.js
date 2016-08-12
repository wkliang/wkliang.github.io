
var fs = require('fs');

function not_found(pathname, response) {
	var data = pathname + " not found!\n";
	response.writeHead(404, {
		"Content-Type" : "text/plain; charset=UTF-8",
		"Content-Length" : data.length
	});
	response.write(data);
	response.end();
}

// http://stackoverflow.com/questions/680929/how-to-extract-extension-from-filename-string-in-javascript
function file_extension(filename) {
	return filename.split('.').pop();
}

var file_mime = {
	"jpg" : "image/jpg",
	"png" : "image/png",
	"js" : "application/javascript; charset=UTF-8",
	"css" : "text/css; charset=UTF-8",
	"txt" : "text/plan; charset=UTF-8",
	"html" : "text/html; charset=UTF-8"
};

exports.route = function(handle, pathname, response, request) {

	var handler = handle[pathname.substr(1,pathname.length)];	// remove leading /
	console.log("About to route a request for '" + pathname + "' ->" + typeof handler);
	if (typeof handler === 'function') {
		return handler(response, request);
	} else {
		var filename = "../../html5" + pathname;
		try {
			// var file = fs.readFileSync(filename, "utf-8");
			var file = fs.readFile(filename, function read(err, data) {
				if (err) {
					not_found(pathname, response);
					return;
				}
				response.writeHead(200, {
					"Content-Type" : file_mime[file_extension(filename)],
					"Content-Length" : data.length
				});
				response.write(data);
				response.end();
			});
			return;
		} catch (err) {
			console.log("No request handler found for " + pathname);
			not_found(pathname, response);
			return;
		}
	}
};
