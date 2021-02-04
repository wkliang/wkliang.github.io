#!/usr/bin/env node

// Listing 3.17 Serial flow control implemented in a simple application

var fs = require('fs');
var request = require('request');
var htmlparser = require('htmlparser');

var tasks = [
	function() {	// checkForRSSFile()
		var configFilename = "./rss_feeds.txt";
		fs.exists(configFilename, (exists) => {
			if (!exists)
				return next(new Error("Missing RSS file: " + configFilename));
			next(null, configFilename);
		});
	},
	function(configFilename) {	// readRSSFile()
		fs.readFile(configFilename, (err, feedList) => {
			if (err)
				return next(err);
			feedList = feedList
				.toString()
				.replace(/^\s+|\s+$/g, '')
				.split("\n");
			var random = Math.floor(Math.random() * feedList.length);
			next(null, feedList[random]);
		});
	},
	function(feedUrl) {	// downloadRSSFeed()
		console.log(feedUrl);
		request({uri: feedUrl}, (err, res, body) => {
			if (err)
				return next(err);
			if (res.statusCode != 200)
				return next(new Error("Abnormal response: " + res.statusCode));
			next(null, body);
		});
	},
	function(rss) {	// parseRSSFeed()
		var handler = new htmlparser.RssHandler();
		var parser = new htmlparser.Parser(handler);

		parser.parseComplete(rss);

		if (!handler.dom.items.length)
			return next(new Error('No RSS items found'));

		console.log(handler.dom);

		var item = handler.dom.items.shift();

		console.log(item.title);
		console.log(item.link);
	}
];

function next(err, result) {
	if (err)
		throw err;
	var currentTask = tasks.shift();
	if (currentTask) {
		currentTask(result);
	}
}

next();

