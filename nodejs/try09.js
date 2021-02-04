#!/usr/bin/env node

// https://github.com/zoubin/engineering/blob/master/docs/node-stream/basics/index.md
// https://github.com/substack/stream-handbook

const Readable = require('stream').Readable;
// var rs = Readable(); // no new??
var rs = new Readable;

var c = 97 - 1;
rs._read = function() {
	if (c >= 'z'.charCodeAt(0)) return rs.push(null);
	setTimeout(function() {
		rs.push(String.fromCharCode(++c));
	}, 1000 * Math.random());
}
// rs.pipe(process.stdout);
// process.stdin.on('readable', function() {
rs.on('readable', function() {
	var buf = rs.read(1);
	console.dir(buf);
});

process.on('exit', function() {
	console.error("\nread() called " + (c - 97) + " times");
});
process.stdout.on("error", process.exit);
