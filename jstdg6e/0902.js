// Example 9-2. A Range class using a constructor
// range2.js: Another class representing a range of values.

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

// This is a constructor function that initializes new Range objects.
// Note that it does not create or return the object. It just initializes this.
function Range(from, to) {
	// Store the start and end points (state) of this new range object.
	// These are noninherited properties that are unique to this object.
	this.from = from;
	this.to = to;
}

// All Range objects inherit from this object.
// Note that the property name must be "prototype" for this to work.

extend(Range.prototype, {
	// constructor: Range,
	setval: function(from,to) {
		this.from = from;
		this.to = to;
	},
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
	},
	// pg#222
	// A Range is not equal to any nonrange.
	// Two ranges are equal if and only if their endpoints are equal.
	equals: function(that) {
		if (that == null) return false;	// Reject null and undefined
		if (that.constructor !== this.constructor /* Range */)
			return false;	// Reject non-ranges
		// Now return true if and only if two endpoints are equal.
		return this.from == that.from && this.to == that.to;
	},
	// pg#224
	// Order ranges by lower bound,
	// upper bound if the lower bounds are equal.
	// Throws an error if passed a non-Range value.
	// Returns 0 if and only if this.equals(that).
	compareTo: function(that) {
	    if (!(that instance of Range))
		throw new Error("Can't compare a Range with " + that);
	    var diff = this.from - that.from;	// Compare lower bounds
	    if (diff == 0)			// If equal, compare upper bounds
		diff = this.to - that.to;
	    return diff;
	}
});
range.methods = Range.prototype;

var SimpleRange = defineClass(
	function() {this.from = -Infinity; this.to = Infinity; },
	Range.prototype,
	{
	norange: function() { return new SimpleRange(-Infinity,Infinity); },
	upto: function(t) { return new SimpleRange(0,t); }
	}
);

var rrr = new SimpleRange();
console.log(""+rrr);
lsprop(rrr);
console.log("rrr includes 2 is " +rrr.includes(2));
rrr.foreach(function(x) { console.log("> "+x+"."); });
console.log("rrr instanceof Range :" + (rrr instanceof Range));
console.log("rrr instanceof SimpleRange :" + (rrr instanceof SimpleRange));
console.log("rrr.constructor === SimpleRange :" + (rrr.constructor === SimpleRange));

