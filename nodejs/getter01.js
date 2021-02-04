#!/usr/bin/env node

// getter / setter
//
// wkliang:20171008
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get

var expr = function(i) {
	var l = ['True', 'Good'];
	return function() {
		return l[i++ % 2];
	}
}(0);

var obj = {
	list: ['Trueman', 'is', 'a', 'Goodman'],
	get latest() {
		return (this.list.length == 0) ?
			undefined : this.list[this.list.length - 1];
	},
	get [expr() + 'man']() { return this.list.indexOf('Trueman'); }
};

console.log(obj.latest);	// print "Goodman"
console.log(expr());
console.log(obj.Trueman);	// print 0
console.log(obj.Goodman);	// print undefined
