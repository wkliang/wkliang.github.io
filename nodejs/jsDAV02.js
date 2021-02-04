#!/usr/bin/env node

// https://github.com/mikedeboer/jsDAV/wiki/Getting-Started
// https://www.npmjs.com/package/webdav


var createClient = require('webdav');

var client = createClient(
	"http://127.0.0.1:8000/",
	"", "");

client
.getDirectoryContents("/nonemptydir")
.then(function(contents) {
	console.log(contents);
	console.log(JSON.stringify(contents, undefined, 4));
})
.catch(function(err) {
	console.error(err);
});


client
.getFileContents("/htdigest")
.then(function(contents) {
	console.log(contents.toString());
})
.catch(function(err) {
	console.error(err);
})
