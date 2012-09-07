
// pg#230, Example 9-12. SingletonSet: a simple set sublcass

// The constructor function
function Singletonset(member) {
	this.member = member;	// Remember the single member of the set
}

// Create a prototype object that inherits from the prototype of Set.
SingletoSet.prototype = inherit(Set.prototype);

// Now add properties to the prototype.
// These properties override the properties of the same name from Set.prototype
extend(SingletonSet.prototype, {
	// Set the constructor property appropriately
	constructor: SingletonSet,
	// This set is read-only: add() and remove() throw errors
	add: function() { throw "read-only set"; },
	remove: function() { throw "read-only set"; },
	// A singletoSet always has size 1
	size: function() { return 1; },
	// Just invoke the function once, passing the single member.
	foreach: function(f, context) { f.call(context, this.member); },
	// The contains methods is simple: true only for one value
	contains: function(x) { return x === this.member; }
});

SingletonSet.prototype.equals = function(that) {
    return that instanceof Set && that.size==1 && that.contains(this.member);
};
