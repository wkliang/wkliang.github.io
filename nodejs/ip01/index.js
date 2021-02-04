
var CountStream = require('./countstream');
var countStream = new CountStream('div');

var http = require('http');

http.get('http://www.amazon.com', function(res) {
	res.pipe(countStream);
});

countStream.on('total', function(count) {
	console.log('Total matches:', count);
});
