#!/usr/bin/env node

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
// https://eloquentjavascript.net/11_async.html

let thenableObj = {};
thenableObj.then = function(cb) {
    console.log(`thenable : ${cb}`);
    setTimeout(() => {
    	cb('hello brave new world! ' + Math.random());
    }, Math.random() * 10000);
}

var promise1 = Promise.resolve(thenableObj);

promise1.then(function(value) {
  console.log('promise1:', value);
  // expected output: 123
});
promise1.then((v) => console.log(`promise1+: ${v}`))

Promise.resolve(thenableObj).then((v) => console.log(`promise2: ${v}`));


class thenableObject {
	constructor(m = 'Salaam', t = 1000) {
		this.cblist = [];
		// let self = this;
		setTimeout(() => this.cblist.forEach(cb => cb(`${m} ${Date.now()}`)), t);
	}
	then(cb) {
		this.cblist.push(cb)
	}
};

let to2 = new thenableObject('Shalom');
var p1 = Promise.resolve(to2);
p1.then((v) => console.log(`p1: ${v}`))

Promise.resolve(to2).then(v => console.log(`p2: ${v}`));
