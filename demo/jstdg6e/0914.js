
// pg#232
// Example 9-14. A class factory and method chaining
/*
 * This function returns a subclass of specified Set class and overrides
 * the add() method of that class to apply the specified filter.
 */
function filteredSetSubclass(superclass, filter) {
    var constructor = function() {		// The subclass constructor
	superclass.apply(this, arguments);	// Chains to the superclass
    };
    var proto = constructor.prototype = inherit(superclass.prototype);
    proto.constructor = constructor;
    proto.add = function() {
	// Apply the filter to all arguments before adding any
	for (var i = 0; i < arguments.length; i++) {
	    var v = arguments[i];
	    if (!filter(v))
		throw("value " + v + " rejected by filter");
	}
	// Chain to our superclass add implementation
	superclass.prototype.add.apply(this, arguments);
    };
    return constructor;
}

var NonNullSet = (function() {	// Define and invoke function
    var superclass = Set;	// Only specify the superclass once.
    return superclass.extend(
	function() { superclass.apply(this, arguments); }, // the constructor
	{
	    add: function() {
		// Check for null or undefined arguments
		for (var i = 0; i < arguments.length; i++)
		    if (arguments[i] == null)
			throw new Error("Can't add null or undefined");
		// Chain to the superclass to perform the actual insertion
		return superclass.prototype.add.apply(this, arguments);
	    }
	});
}());

// Define a set class that holds strings only
var StringSet = filteredSetSubclass(Set,
	function(x) {return typeof x==="string";});

// Define a set class that does not allow null, undefined or functions
var MySet = filteredSetSubclass(NonNullSet,
	function(x) {return typeof x !== "function";});

