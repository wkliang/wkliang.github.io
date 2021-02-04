
var assert = require('assert');

var CountStream = require('./countstream');
var countStream = new CountStream('div');

var fs = require('fs');
var passed = 0;

countStream.on('total', function(count) {
	// if dont match will throw error
	assert.equal(count, 1);
	passed++;
});

fs.createReadStream(__filename).pipe(countStream);

process.on('exit', function() {
	// Just before the program is about to exit,
	// displace how many assertions have been run.
	console.log('Assertion passed:', passed);
});
