#!/usr/bin/env node

// wkliang:20170428: test on various socks proxy agents.

var url = require('url');
var atob = require('atob');
var exec = require('child_process').exec;
var socks = require('./lib/socks');

process.on('uncaughtException', function(err) {
	console.error('!!!uncaughtException!!!', err);
	process.exit();
});

var files = [];
var tasks = [];

for (var i = 2; i < process.argv.length; ++i) {
	// HTTP endpoint for the proxy to connect to
	var fileno = process.argv[i];
	var endpoint = "http://getrelax.club/embed/" + fileno + ".mp4";

	// console.log("Attempting to GET %j", endpoint);

	files.push(fileno);
	tasks.push(socks.requestUrl(url.parse(endpoint))
		.then((data) => new Promise((resolve, reject) => {
			var file_id = data.match(/var video_file = '([^=]*=)'/)[1];
                	var url = "https://openload.co/embed/"+atob(file_id);
			exec("firefox --node-remote --safe-mode --private-window "+url,
				function(error, stdout, stderr) {
					if (error) reject(error);
					else resolve(url);
				})
		}))
	);
}

Promise.all(tasks).then(function(values) {
	for (var i = 0; i < files.length; ++i) {
		var data = values[i];
		var fileno = files[i];
                console.log(fileno +" => " + data);
	}
})
.catch(reason => console.error("catch error:", reason))
.then(() => process.exit())	// always run this finally

