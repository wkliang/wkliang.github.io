
// Javascript Definitive Guide 6e CH.6 Object

// inherit() returns a newly created object that inherits properties from the
// prototype object p. It uses the ECMAScript 5 function Object.create if
// it is defined, and otherwise falls back to an older technique

// Douglas Crockford is generally credited as the first to propose a function
// that creates objects in this way.
// See http://javascript.crockford.com/prototypal.html.

function inherit(p) {
    if (p == null)			// p must be a non-null object
	throw TypeError();
    if (Object.create)			// If Object.create() is defined...
	return Object.create(p);	// then just use it.
    var t = typeof p;			// Otherwise do some more type checking
    if (t !== "object" && t !== "function")
	throw  TypeError();
    function f() {};			// Define a dummy constructor function.
    f.prototype = p;			// Set its prototype property to p.
    return new f();			// Use f() to create a "heir" of p.
}


// pg#127, Example 6-2. Object utility functions that enumerate properties

/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have property by the same name, o's property is overwritten.
 * This function does not handle getters and setters or copy attributes.
 */
function extend(o, p) {
	for(prop in p) {		// For all props in p.
		o[prop] = p[prop];	// Add the property to o.
	}
	return o;
}

// The implementation of extend() shown here is correct but does not 
// compensate for a well-known bug in Internet Explorer.
// We'll see a more robust version of extend() in Example 8-3.

// pg#180 Example 8-3. The extend() function, patched if necessary

// Define an extend function that copies the properties of its second and
// subsequent arguments onto its first argument.

// We work around an IE bug here: in many versions of IE, the for/in loop
// won't enumerate an enumerable property of o if the prototype of o has
// a nonenumerable property by the same name. This means that properties
// like toString are not handled correctly unless we explicitly check for them.

var extend = (function() {
	// First check for the presence of the bug before patching it.
	for (var p in {toString:null}) {
		// If we get here, then the for/in loop works correctly and
		// we return a simple version of extend() function
		return function(o) {
			for (var i = 1; i < arguments.length; i++) {
				var source = arguments[i];
				for (var prop in source)
					o[prop] = source[prop];
			}
			return o;
		};
	}
	// If we get here, it means that the for/in loop did not enumerate
	// the toString property of the test object. So we return a version
	// of the extend() function that explicitly tests for the nonenumerable
	// properties of Object.prototype.
	return function(o) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			// Copy all the enumerable properties
			for (var prop in source)
				o[prop] = source[prop];
			// And now check the special-case properties
			for (var j = 0; j < protoprops.length; j++) {
				prop = protoprops[j];
				if (source.hasOwnProperty(prop))
					o[prop] = source[prop];
			}
		}
		return o;
	};

	// This is the list of special-case properties we check for
	var protoprops = ["toString", "toLocaleString", "valueOf",
		"constructor", "hasOwnProperty", "isPrototypeOf",
		"propertyIsEnumerable"];
}());



/*
 * Copy the enumerable properties of p to o, and return o.
 * If o and p have a property by the same name, o's property is left alone.
 * This function does not handle getters and setters or copy attributes.
 */
function merge(o, p) {
	for(prop in p) {			// For all props in p.
// wkliang:20120731: it seems wrong in following line?!
//		if (o.hasOwnProperty[prop])	// Except those already in o.
		if (o.hasOwnProperty(prop))	// Except those already in o.
			continue;
		o[prop] = p[prop];		// Add the property to o.
	}
	return o;
}

/*
 * Remove properties from o if there is not a property with the same name in p.
 * Return o.
 */
function restrict(o, p) {
	for (prop in o) {		// For all props in o
		if (!(prop in p))
			delete o[prop];	// Delete if not in p
	}
	return o;
}

/*
 * For each property of p, delete the property with the same name from o.
 * Return o.
 */
function subtract(o, p) {
	for (prop in p) {	// For all props in p
		delete o[prop];	// Delete from o (deleteing a 
				// nonexistent prop is harmless)
	}
	return o;
}

/*
 * Return a new object that holds the properties of both o and p.
 * If o and p have properties by the same name, the values from o are used.
 */
// wkliang:20120801: above description is wrong, should be
// that values from p are used.
function union(o, p) {
	return extend(extend({},o), p);
}

/*
 * Return a new object that holds only the properties of o that also appear
 * in p. This is something like the intersection of o and p, but the values of
 * the properties in p are discarded.
 */
function intersection(o, p) {
	return restrict(extend({}, o), p);
}

/*
 * Return an array that holds the names of the enumerable own properties of o.
 */
function keys(o) {
	if (typeof o !== "object")	// Object argument required
		throw TypeError();
	var result = [];		// The array we will return
	for (var prop in o) {		// For all enumerable properties
		if (o.hasOwnProperty(prop))	// If it is an own property
			retsult.push(prop);	// add it to the array.
	}
	return result;			// Return the array.
}

// wkliang:20120801,20120828
function lsprop(o,name) {
	for (prop in o) {
		console.log( (name ? name : "")  +
			"." + prop + ":" + o[prop] + ".");
		if (name && typeof(o[prop]) === "object") {
			lsprop(o[prop], name+"."+prop);
		}
	}
}

var point = {
	// x and y are regular read-write data properties.
	x: 1.0,
	y: 1.0,

	// r is a read-write accessor property with getter and setter.
	// Don't forget to put a comma after accessor methods.
	get r() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	},
	set r(newvalue) {
		var oldvalue = Math.sqrt(this.x*this.x + this.y*this.y);
		var ratio = newvalue / oldvalue;
		this.x *= ratio;
		this.y *= ratio;
	},
	// theta is a read-only accessor property with getter only.
	get theta() {
		return Math.atan2(this.y, this.x);
	}
};

// This object generates strictly increasing serial numbers
var serialnum = {
	// This data property holds the next serial numbers
	// The $ in the property name hints that it is a private property.
	$n: 0,

	// Return the current value and increment it
	get next() {
		return this.$n++;
	},

	// Set a new value of n, but only if it is larger than current
	set next(n) {
		if (n >= this.$n)
			this.$n = n;
		else
			throw "serial number can only be set to a larger value";
	}
};

// This object has accessor properties that return random numbers.
// The expression "randon.octet", for example, yield a random number
// between 0 and 255 each time it is evaluated.
var random = {
	get octet() {
		return Math.floor(Math.random() * 256);
	},
	get uint16() {
		return Math.floor(Math.random() * 65536);
	},
	get int16() {
		return Math.floor(Math.random() * 65536) - 32768;
	}
};


// pg#134 Copying property attributes
/*
 * Add a nonenumerable extend() method to Object.prototype.
 * This method extends the object on which it is called by copying properties
 * from the object passed as its argument. All property attributes are
 * copied, not just the property value. All own properties (even non-enumerable
 * ones) of the argument object are copied unless a property
 * with the same name already exists in the target object.
 */
Object.defineProperty(Object.prototype,
    "extend",	// Define Object.prototype.extend
    {
	writable: true,
	enumerable: false,	// Make it nonenumerable
	configurable: true,
	value: function(o) {	// Its value is this function
	    // Get all own props, even nonenumerable ones
	    var names = Object.getOwnPropertyNames(o);
	    // Loop through them
	    for (var i = 0; i < names.length; i++) {
		// Skip props already in this object
		if (names[i] in this)
		    continue;
		var desc = Object.getOwnPropertyDescriptor(o,names[i]);
		// Use it to create property on this
		Object.defineProperty(this, names[i], desc);
	    }
	}
	});


// pg#136, Example 6-4. A classof function
function classof(o) {
	if (o == null)
		return "Null";
	if (o == undefined)
		return "Undefined";
	return Object.prototype.toString.call(o).slice(8,-1);
}

// pg#206, A simple function for defining simple classes
function defineClass(
		constructor,	// A function that sets instance properties
		methods,	// Instance methods: copied to prototype
		statics)	// Class properties: copied to constructor
{
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	return constructor;
}

// wkliang:20120825 -=-=-=-=-=-=-=-=-=-=-=-=-
function newObj(constructor) {
	var obj = inherit(constructor.prototype);
	var args = [];
	for (var i = 1; i < arguments.length; i++)
		args.push(arguments[i]);
	constructor.apply(obj, args);
	return obj;	
}

console.log("0601.js loaded");
