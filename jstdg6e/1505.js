
// pg#384
// Replace the node n with a new <b> element and make n a child of that element.
function embolden(n) {
    // If we're passed a string instead of a node, treat it as an element id
    if (typeof n == "string")
	n = document.getElementById(n);
    var parent = n.parentNode;		// Get the parent of n
    var b = document.createElement("b");// Create a <b> element
    parent.replaceChild(b, n);		// Replace n with the <b> element
    b.appendChild(n);			// Make n a child of the <b> element
}

// pg#385
// Example 15-5. Implementing the outerHTML property using innerHTML

// Implement the outerHTML property for browsers that don't support it.
// Assumes that the browser does support innerHTML, has an extensible
// Element.prototype, and allows getters and setters to be defined.
(function() {
    if (document.createElement("div").outerHTML) {
	console.log("already support outerHTML");
	return;
    }

    // Return the outer HTML of the element referred to by this
    function outerHTMLGetter() {
	var container = document.createElement("div");	// Dummy element
	container.appendChild(this.cloneNode(true));	// Copy this to dummy
	return container.innerHTML;			// Return dummy content
    }

    // Set the outer HTML of the this element to specified value
    function outerHTMLSetter(value) {
	// Create a dummy element and set its content to the specified value
	var container = document.createElement("div");
	container.innerHTML = value;
	// Move each of the nodes from the dummy into the document
	while (container.firstChild)	// Loop until container has no more kids
	    this.parentNode.insertBefore(container.firstChild, this);
	// And remove the node that has been replaced
	this.parentNode.removeChild(this);
    }

    // Now use these two functions as getters and setters for the
    // outerHTML property of all Element objects. Use ES5 Object.defineProperty
    // if it exists and otherwise fall back on __defineGetter__ and Setter__.
    if (Object.defineProperty) {
	Object.defineProperty(Element.prototype, "outerHTML", {
				get: outerHTMLGetter,
				set: outerHTMLSetter,
				enumerable: false, configurable: true
			});
    }
    else {
	Element.prototype.__defineGetter__("outerHTML", outerHTMLGetter);
	Element.prototype.__defineSetter__("outerHTML", outerHTMLSetter);
    }
}());

