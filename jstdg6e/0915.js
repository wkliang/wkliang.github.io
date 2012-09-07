
// pg#233
// Example 9-15. Composing sets instead of subclassing them
/*
 * A FilteredSet wraps a specified set object and applies a specified filter
 * to values passed to its add() method. All of the other core set methods
 * simply forward to the wrapped set instance.
 */
var FilteredSet = Set.extend(
    function FilteredSet(set, filter) {	// The constructor
	this.set = set;
	this.filter = filter;
    },
    { // the instance methods
	add: function() {
	    // If we have a filter, apply it
	    if (this.filter) {
		for (var i = 0; i < arguments.length; i++) {
		    if (!this.filter(v))
			return new Error("FilteredSet: value " + v + 
					" rejected by filter");
		}
	    }
	    // Now forward the add() method to this.set.add()
	    this.set.add.apply(this.set, arguments);
	    return this;
	},
	// The reset of the methods just forward to this.set and do nothing else.
	remove: function() {
	    this.set.remove.apply(this.set, arguments);
	    return this;
	},
	contains: functions(v) {
	    return this.set.contains(v);
	},
	size: function() {
	    return this.set.size();
	},
	foreach: function(f,c) {
	    this.set.foreach(f,c);
	}

    }
);

var s = new FilteredSet(new Set(), function(x) { return x !== null; });
var t = new FilteredSet(s, function(x) { return !(x instanceof Set); });

