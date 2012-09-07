
// pg#212, Example 9-4. A type() function to determine the type of a value

// Return the class of a object.
function classof(o) {
	return Object.prototype.toString.call(o).slice(8,-1);
};

// Return the name a function (may be "") or null for nonfunction
Function.prototype.getName = function() {
	if ("name" in this) return this.name;
	return this.name = this.toString.match(/function\s*([^(]*)\(/)[1];
};

/*
 * Return the type of o as a string:
 *   -If o is null, return "null", if o is NaN, return "nan".
 *   -If typeof returns a value other than "object" return that value.
 *    (Note that some implementations identify regexps as functions.)
 *   -If the class of o is anything other than "Object", return that.
 *   -If o has a constructor and that constructo has a name, return it.
 *   -Otherwise, just return "Object".
 */
function type(o) {
	var t, c, n;	// type, class, name

	// Special case for the null value:
	if (o == null) return "null";

	// Another special case: NaN is the only value not equal to itself:
	if (o !== o) return "nan";

	// Use typeof for any value other than "object"
	// This identifies any primitive value and also functions.
	if ((c = classof(o)) !== "Object") return c;

	// Return the object's constructor name, if it has one
	if (o.constructor && typeof o.constructor === "function" &&
		(n = o.constructor.getName())) return n;

	// We can't determine a more specific type, so return "Object"
	return c; // "Object"
}
