#!/usr/bin/env node

// wkliang:20170501: test on ES6 new features
// http://es6.ruanyifeng.com/#docs/iterator

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

/*
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());
console.log(iter.next());

for (let x = iter.next(); !x.done; x = iter.next())
	console.log(x.value);
*/
for (let x of iter)
	console.log(x);

class RangeIterator {
	constructor(start, stop) {
		this.index = start;
		this.stop = stop;
	}

	[Symbol.iterator]() { return this; }

	next() {
		return (this.index < this.stop) ?
			{done: false, value: this.index++} :
			{done: true, value: undefined};
	}
}

for (let x of new RangeIterator(0,3)) {
	console.log(x);
}

console.log(Object.keys(process));
