#!/usr/bin/env node

// wkliang:20170501
// http://www.ruanyifeng.com/blog/2015/04/generator.html

function* gen(x) {
	var y = yield x + 2;
	return y;
}

var g = gen(1);

console.log(g.next());
console.log(g.next(2));
console.log(g.next());

// wkliang:20181226
// https://davidwalsh.name/es6-generators

function *foo(x) {
	var y = 2 * (yield (x+1));
	var z = yield (y/3);
	return (x+y+z);
}

var it = foo(5);

console.log(it.next());		// {value:6, done:false}
console.log(it.next(12));	// {value:8, done:false}
console.log(it.next(13));	// {value:42, done:true}

function *bar() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
	return 6;
}

for (let v of bar()) {
	console.log(v);	// 1 2 3 4 5
}

// try08.js
// https://github.com/zoubin/engineering/blob/master/docs/node-stream/basics/index.md
// https://github.com/substack/stream-handbook

'use strict'

const Readable = require('stream').Readable;

class ToReadable extends Readable {
	constructor() {
		super();
		this.iterator = function *(limit) {
			while (limit--)
				yield limit + Math.random();
		}(10);
	}

	_read() {
		const res = this.iterator.next();
		if (res.done) {
			this.push(null);
		} else {
			this.push(res.value + '\n');
		}
	}
}

const readable = new ToReadable();
readable.pipe(process.stdout);
