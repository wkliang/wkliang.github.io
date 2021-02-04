#!/usr/bin/env node

const myFs = require("fs");

/*
myFs.readFile('./zzzzz', function(err, data) {
	if (err) throw err;
	console.dir(JSON.parse(data));
});
*/

async function f0() {
    let x = await new Promise(resolve => {
      setTimeout(() => resolve('hello'), 1000);
    });
    console.log('await:', x);
}

async function f1() {
  let r = true; // = myFs.exists('./zzzzz');
  if (r) {
    let s = await new Promise((resolve,reject) =>
	myFs.readFile('./zzzzz', 'utf-8',
		(err,data) => err ? reject(err) : resolve(data)));
    console.log(typeof s,   //string
	JSON.parse(s) );
  }
}

f0();
f1();
