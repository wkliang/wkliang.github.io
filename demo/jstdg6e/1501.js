
// pg#365
// Example 15-1. Looking up multiple elements by ID
/*
 * This function expects any number of string arguments. It treats each
 * argument as an element id and calls document.getElementById() for each.
 * Returns an object that maps ids to the corresponding Element object.
 * Throws an Error object if any of the ids is undefiend.
 */
function getElements(/* ids... */) {
    var elements = {};				// Start with any empty map
    for (var i=0; i<arguments.length; i++) {	// For each argument
	var id = arguments[i];			// Arguemtn is an element id
	var elt = document.getElementById(id);	// Look up the Element
	if (elt == null)			// If not defined
	    throw new Error("No element with id: " + id);	//throw an error
	elements[id] = elt;			// Map id to element
    }
    return elements;				// Return id to element map
}
