#!/usr/bin/env node

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

const fs = require("fs");
const readFilePromise = function(path) {
	return new Promise((resolve, reject) => {
		fs.readFile(path.toString().trim(),
			(err, data) => {
				if (err) reject(err);
				else {
					console.log("data:", data.toString().substring(0, 256));
					resolve(data);
				}
				
			});
	});
};

var sinceDate = new Date();
console.log(": ", sinceDate, "sync code started");

function createTimeoutPromise(msg) {
	return new Promise((resolve, reject) => {
		setTimeout(function() {
				var now = new Date();
				console.log(": ", now, msg);
				resolve(now - sinceDate);
			}, Math.random() * 2000 + 1000);
	})
}
createTimeoutPromise("async code started...")
.then((resolve, reject) => {
	console.log(": ", new Date(), "then code executed, got", resolve);
	return new Date() - sinceDate;
})
.then((resolve) => {
	console.log(": ", new Date(), "new promise created, got", resolve);
	return createTimeoutPromise("new promise executed");
})
.then((resolve) => {
	console.log(": ", new Date(), "then code executed, got", resolve);
	return "./z";
})
.then(resolve => readFilePromise(resolve))
.then(resolve => readFilePromise(resolve))
.then(resolve => readFilePromise(resolve))
.catch(reason => {
	console.log(": ", new Date(), "catch:", reason);
});

console.log(": ", new Date(), "total", new Date() - sinceDate, "msec.");

