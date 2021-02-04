#!/usr/bin/env node

// Listing 3.13 Extending the event emitter's functionality

var events = require('events'),
	util = require('util'),
	fs = require('fs');

util.inherits(Watcher, events.EventEmitter);

function Watcher(watchDir, processedDir) {
//	this.watchDir= watchDir;
//	this.processedDir = processedDir;

	// wkliang:20170131 using closure instead of object variables

	this.watchDir = () => watchDir;
	this.watchFile = file => watchDir + "/" + file;
	this.processedFile = file => processedDir + "/" + file.toLowerCase();
}

Watcher.prototype.watch = function() {
	fs.readdir(this.watchDir(), (err, files) => {
		if (err) throw err;
		for (var index in files) {
			this.emit('process', files[index]);
		}
	});
};

Watcher.prototype.start = function() {
	console.log("this: ", this);
	console.log("watchDir: ", this.watchDir);
	console.log("watchFile: ", this.watchFile);
	this.watch();	// process old files
	fs.watchFile(this.watchDir(), () => {
		this.watch();
	});
};

var watcher = new Watcher("./watch", "./done");

watcher.on('process', file => {
	console.log("rename", watcher.watchFile(file), watcher.processedFile(file));
	fs.rename(watcher.watchFile(file), watcher.processedFile(file),
		err => {
			if (err) throw err;
		});
		
});

watcher.start();
