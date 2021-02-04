#!/usr/bin/env node

var co = require('co');

co(function *() {
	console.log('Inside');
});


myGenerator = function *() {
	var i = 0;
	while (true) {
		i += yield i;
	}
}

var adder = myGenerator();
console.log(adder.next().value);
console.log(adder.next(2).value);
console.log(adder.next(3).value);
console.log(adder.next(4).value);

/*
async function myAsyncFunc() {
	console.log("Hello async functions!");
}

myAsyncFunc();
*/
