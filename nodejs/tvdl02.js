#!/usr/bin/env node

const tt = require('twitter-dl');

console.log(`argv.length: ${process.argv.length}`);
if (process.argv.length >= 4) {
	console.log(`twitter ${process.argv[2]}`);
	tt.download(process.argv[3], process.argv[2])
	.then((result) => {
		console.log(`result: ${result}`);
	}).catch((err) => {
		console.log(`err: ${err}`);
	});
}
