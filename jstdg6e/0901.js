
// Javascript Definitive Guide 6e CH.9 Classes and Modules

/*
 *
 */

// pg#200 Example 9-1. A simple Javascript class

// range.js: a class representing a range of values

// This is a factory function that returns a new range object
function range(from, to) {
	// Use the inherit() function to create an object that inherits from the
	// prototype object defined below. The prototype object is stored as
	// a property of this function, and defines the shared methods(behavior)
	// for all range objects.
	
	var r = inherit(range.methods);
	// Store the start and end points (state) of this new range object.
	// These are noninherited properties that are unique to this object.
	r.from = from;
	r.to = to;

	// Finally return the new object
	return r;
}

// This prototype object defines methods inherited by all range objects.
range.methods = {
	// Return true if x is in range, false otherwise
	// This method works for textual and Date ranges as well as numeric.
	includes: function(x) {
		return this.from <= x && x <= this.to; 
	},
	// Invoke f once for each integer in the range.
	// This method works only for numeric ranges.
	foreach: function(f) {
		for (var x = Math.ceil(this.from); x <= this.to; x++)
			f(x);
	},
	// Return a string representation of the range
	toString: function() {
		return "(" + this.from + "..." + this.to + ")";
	}
};


