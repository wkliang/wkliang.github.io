#!/usr/bin/env node

// JavaScript Web Applications | 36 | Chapter 3: Models and Data

Math.guid = function() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
		function(c) {
			var r = Math.random() * 16 | 0;
			var v = c == 'x' ? r : (r&0x03|0x08);
			return v.toString(16);
		}).toUpperCase();
};

console.log(Math.guid());
console.log(Math.guid());
console.log(Math.guid());
