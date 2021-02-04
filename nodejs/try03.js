#!/usr/bin/env node

// https://medium.freecodecamp.com/javascript-closures-explained-by-mailing-a-package-4f23e9885039

var i = 100;
while (i --> 50) {
	setTimeout(function() {
		 console.log("fail: %d", i);
	}, 100);
}

while (i --> 10) {
	setTimeout(function(x) {
		return function() {
			console.log("success: %d", x);
		};
	}(i), 100);
}

