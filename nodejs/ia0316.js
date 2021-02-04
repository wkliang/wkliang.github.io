#!/usr/bin/env node

// regular callback chain

setTimeout(function() {
	console.log("#1 execute first.");
	setTimeout(function() {
		console.log("#1 execute next.");
		setTimeout(function() {
			console.log("#1 execute last.");
		}, 100);
	}, 500);
}, 1000);

// Listing 3.16 Serial control using a community-created add-on

var flow = require('nimble');

flow.series([
	function(cb) {
		setTimeout(function() {
			console.log("#2 execute first.");
			cb();
		}, 1000);
	},
	function(cb) {
		setTimeout(function() {
			console.log("#2 execute next.");
			cb();
		}, 500);
	},
	function(cb) {
		setTimeout(function() {
			console.log("#2 execute last.");
			cb();
		}, 100);
	}
]);

// using Promise

// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// js fat arror function syntax, difference:
// () => { statements }
// () => expression 
// 	about is equal to: () => { return expression; }

new Promise((resolve, error) => {
	setTimeout(() => {
		console.log("#3 execute first.");
		resolve(new Date());
	}, 1000);
})
.then(unused => new Promise(resolve => {
		setTimeout(() => {
			console.log("#3 execute next.");
			resolve();
		}, 500);
	})
)
.then(() => new Promise(resolve => {
		setTimeout(() => {
			console.log("#3 execute last.");
			resolve();
		}, 100);
	})
)



