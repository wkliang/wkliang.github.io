#!/usr/bin/env node

// https://vimeo.com/45140590
// http://neo.com/2012/11/13/y-not-adventures-in-functional-programming-part-i/
// http://neo.com/2012/11/20/y-not-adventures-in-functional-programming-part-ii/
// http://neo.com/2012/11/28/y-not-adventures-in-functional-programming-part-iii/
//
//
// Fixpoints
// Higher Order Function
// Functional Refactoring
//
// (1) Tennent's Correspondence Principle
// (2) Introduce Binding
// (3) Rebind
// (4) Function Wrap
// (5) Inline Function

var log = console.log;
var i = 1234;
var str = "hello, world!";
console.log("%d, %s", i, str);
log("message: " + str);

console.log(function() {
	var make_adder = function(x) {
		return function(n) { return n + x; };
	};
	function compose(f, g) {
		return function(n) { return f(g(n)); };
	};

	return compose(
		function(n) {
			return n * 7
			
		},
		make_adder(3))(3);
}());

console.log("named factorial: %d", function() {
	var fact = function(n) { return n == 0 ? 1 : n * fact(n-1) };
	return fact(5);
}());

console.log("partial factorial: %d", function() {
	var error = function(n) { throw Error("SHOULD NEVER BE CALLED") };
	var improver = function(partial) {
		return function(n) {
				return n == 0 ? 1 : n * partial(n-1);
			};
	};

	var fx = improver(improver(improver(improver(improver(improver(error))))));
	return fx(5);
}());

console.log("partial improved factorial: %d", function() {
	var error = function(n) { throw Error("SHOULD NEVER BE CALLED") };

	var fx = function(improver) {
		return improver(improver);
	} ( function(improver) {
		return function(n) {
			return n == 0 ? 1 : n * improver(improver)(n-1);
		
	}} );
	return fx(5);
}());


console.log("lambda#0 factorial: %d", function() {
	var improver = function(partial) {
		return function(n) {
				return n == 0 ? 1 : n * partial(n-1);
			};
	};

	// Y calculates the FIXPOINT of an improver function
	var Y = function(improver) {
		return function(gen) { return gen(gen) } (
			function(gen) { return function(n) { return improver(gen(gen))(n) }} )
	};

	var fx = Y(improver);
	return fx(5);
}());

console.log("lambda#1 factorial: %d", function() {
	var improver = function(partial) {
		return function(n) {
				return n == 0 ? 1 : n * partial(n-1);
			};
	};

	// Y calculates the FIXPOINT of an improver function
	var Y = function(f) {
		return function(g) { return f(g(g)) } (
			function(g) { return function(n) { return f(g(g))(n) }} )
	};

	var fx = Y(improver);
	return fx(5);
}());

console.log("final factorial: %d", function() {
	var improver = function(partial) {
		return function(n) {
				return n == 0 ? 1 : n * partial(n-1);
			};
	};

	// Y calculates the FIXPOINT of an improver function
	var Y = function(f) {
		return function(g) { return function(n) { return f(g(g))(n) } } ( 
		       function(g) { return function(n) { return f(g(g))(n) } } )
	};

	var fx = Y(improver);
	return fx(5);
}());
