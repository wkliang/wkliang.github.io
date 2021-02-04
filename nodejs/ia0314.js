#!/usr/bin/env node

// 3.2.3 Challenges with asynchronous development

function asyncFunction(cb) {
	setTimeout(cb, 200);
}

var color = 'blue';

// Listing 3.14 How scope behavior can lead to bugs

asyncFunction(() => {
	console.log('#1 The color is ' + color);
});

// Listing 3.15 Using an anonymous function to preserve a global variable's value

(color => {
	asyncFunction(() => {
		console.log('#2 The color is ' + color);
	});
})(color);

color = 'green';
