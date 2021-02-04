
var Writable = require('stream').Writable;
var util = require('util');

module.exports = CountStream;

util.inherits(CountStream, Writable);

function CountStream(matchText, options) {
	Writable.call(this, options);
	this.count = 0;
	// matches globally and ignores case.
	this.matcher = new RegExp(matchText, 'ig');
}

CountStream.prototype._write = function(chunk, encoding, cb) {
	var matches = chunk.toString().match(this.matcher);
	// console.log(chunk.toString());
	if (matches) {
		this.count += matches.length;
		// console.log(matches);
	}
	cb();
};

CountStream.prototype.end = function() {
	this.emit('total', this.count);
}
