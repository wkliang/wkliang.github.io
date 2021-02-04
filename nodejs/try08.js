#!/usr/bin/env node

// https://github.com/zoubin/engineering/blob/master/docs/node-stream/basics/index.md
// https://github.com/substack/stream-handbook

'use strict'

const Readable = require('stream').Readable;

class ToReadable extends Readable {
	constructor(iterable) {
		super();
		this.iterator = new function *() {
			yield * iterable
		}
	}

	// 子类需要实现该方法，生产数据的逻辑
	_read() {
		const res = this.iterator.next();
		if (res.done) {
			this.push(null);
		} else {
			this.push(res.value + '\n');
		}
	}
}

const iterable = function *(limit) {
	while (limit--)
		yield Math.random();
}(1e2);

// wkliang:20170220: implement above code in old school way

function ToRead2(limit) {
	Readable.call(this);

	this.gen = () => limit-- ? limit + Math.random() : 0;
}
require('util').inherits(ToRead2, Readable);

ToRead2.prototype._read = function() {
	let value = this.gen();
	if (value) this.push(value + '\n');
	else this.push(null);
};

// const readable = new ToReadable(iterable);
let readable = new ToRead2(10);
// console.log(readable);
readable.pipe(process.stdout);

let rs = new Readable;

rs.push("beep ");
rs.push("boop\n");

// it would be even better in many circumstances if
// we could avoid buffering data altogether and
// only generate the data when the consumer asks for it.
rs._read = ((chr, _end) => () => {
		rs.push(String.fromCharCode(chr++));
		if (chr > _end) rs.push(null);
	}
)(97, 'z'.charCodeAt(0));

rs.pipe(process.stdout);

