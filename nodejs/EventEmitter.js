#!/usr/bin/env node

// https://medium.com/sivann-com-tw/%E9%9D%9E%E5%90%8C%E6%AD%A5%E7%A8%8B%E5%BC%8F%E7%A2%BC%E4%B9%8B%E9%9C%A7-node-js-%E7%9A%84%E4%BA%8B%E4%BB%B6%E8%BF%B4%E5%9C%88%E8%88%87-eventemitter-809432976c1b

/*
console.log('<0> schedule with setTimeout in 1-sec');
setTimeout(function() {
	console.log('[0] setTimeout in 1-sec boom!');
}, 1000);

console.log('<1> schedule with setTimeout 1 0-sec');
setTimeout(function() {
	console.log('[1] setTimeout in 0-sec boom!');
}, 0);

console.log('<2> schedule with setImmediate');
setImmediate(function() {
	console.log('[2] setImmediate boom!');
});

console.log('<3> A immediately resolved promise');
aPromiseCall().then(function() {
	console.log('[3] promise resolve boom!');
});

console.log('<4> schedule with process.nextTick');
process.nextTick(function() {
	console.log('[4] process.nextTick boom!');
});

*/

function aPromiseCall() {
	return new Promise(function(resolve, reject) {
		return resolve();
	});
}

var fs = require('fs');
fs.readFile('./z', 'utf8', function(err, data) {
	if (err)
		throw new Error(err);

	console.log('<0> schedule with setTimeout in 1-sec');
	setTimeout(function() {
		console.log('[0] setTimeout in 1-sec boom!');
	}, 1000);

	console.log('<1> schedule with setTimeout 1 0-sec');
	setTimeout(function() {
		console.log('[1] setTimeout in 0-sec boom!');
	}, 0);

	console.log('<2> schedule with setImmediate');
	setImmediate(function() {
		console.log('[2] setImmediate boom!');
	});

	console.log('<3> A immediately resolved promise');
	aPromiseCall().then(function() {
		console.log('[3] promise resolve boom!');
	});

	console.log('<4> schedule with process.nextTick');
	process.nextTick(function() {
		console.log('[4] process.nextTick boom!');
	});
});
