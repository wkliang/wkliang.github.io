
// pg#229, Example 9-11. Subclass definition utilities

// A simple function for creating simple subclasses

function defineSubclass(
		superclass,	// Constructor of the superclass
		constructor,	// The constructor for the new subclass
		methods,	// Instance methods: copied to prototype
		statics)	// Class properties: copied to constructor
{
	// Set up the prototype object of the subclass
	// wkliang:20120824: why don't use:
	//	constructor.prototype = new superclass();
	// wkliang:20121016: use constructor to call superclass.constructor
	constructor.prototype = inherit(superclass.prototype);
	constructor.prototype.constructor = constructor;

	// Copy the methods and statics as we would for regular class
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	return constructor;
}

// We can also do this as a method of superclass constructor
Function.prototype.extend = function(constructor, methods, statics) {
	return defineSubclass(this, constructor, methods, statics);
};

