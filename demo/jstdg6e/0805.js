
// pg#189, Example 8-5. A Function.bind() method for ECMAScript 3

if (!Function.prototype.bind) {
	console.log("Define our version of Functio.prototype.bind()");
	Function.prototype.bind = function(o /*, args */) {
		// Save the this and arguments values into variables so we can
		// use them in the nested function below.
		var self = this, boundArgs = arguments;

		// The return value of the bind() method is a function
		return function() {
			// Build up an argument list, starting with any args
			// passed to bind after the first one, and follow those
			// with all args passed to this function.
			var args = [], i;
			for (i = 1; i < boundArgs.length; i++)
				args.push(boundArgs[i]);
			for (i = 0; i < arguments.length; i++)
				args.push(arguments[i]);
			// Now invoke self as a method of o, with those args
			return self.apply(o, args);
		};
	};
}


// pg#209, 9.4 Augmenting Classes

// Invoke the function f this many times, passing the iteration number
// For example, to print "hello" 3 times:
//
// var n = 3;
// n.times.(function(n) { console.log(n + " hello"); });

Number.prototype.times = function(f, context) {
	var n = Number(this);
	for (var i = 0; i < n; i++)
		f.call(context, i);
};

// Define the ES5 String.trim() method if one does not already exist.
// This method returns a string with whitespace removed from the start and end.
String.prototype.myTrim = String.prototype.myTrim || function() {
	if (!this) return this;			// Don't alter the empty string
	return this.replace(/^\s+|\s+$/g,"");	// Regular expression magic
};

// Return a function's name. If it has a (nonstandard) name property, use it.
// Otherwise, convert the function to a string and extract the name from that.
// Returns an empty string for unname function like itself.
Function.prototype.getName = function() {
	return this.name || this.toString().match(/function\s*([^(]*)\(/)[1];
};

// Testing code

function hello(x) {
	var str = this.message || "Hello";
	console.log(str + ", " + x + "!");
}

new Number(5).times(hello);
new Number(3).times(hello,{message: "hi"});
console.log("myTrim: '" + " hi, there ".myTrim() + "'");
console.log("function.getName(): '" + hello.getName() + "'");
