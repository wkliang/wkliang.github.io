
// pg#214, Example 9-5. A function for duck-type checking

// Return true if o implements the methods specified by the remaining args.
function quacks(o /*, ... */) {
	for (var i = 1; i < arguments.length; i++) {	// for each arg after o
		var arg = arguments[i];
		switch(typeof arg) {	// If arg is a:
		case 'string' :		// check for a method with that name
			if (typeof o[arg] !== "function")
				return false;
			continue;
		case 'function' :	// use the prototype object instead
			// If the argument is a function, we use its prototype 
			arg = arg.prototype;
			// fall through to the next case
		case 'object' :		// check for matching methods
			for (var m in arg) {	// for each property 
				if (typeof arg[m] !== "function")
					continue; // skip non-methods
				if (typeof o[m] !== "function")
					return flase;
			}
		}
	}

	// If we're still here, then o implements everything
	return true;
}
