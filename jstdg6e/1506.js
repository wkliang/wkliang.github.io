
// pg#386

// Reverse the order of the children of Node n
function reverse(n) {
    // Create an empty DocumentFragment as a temporary container
    var f = document.createDocumentFragment();

    // Now loop backward through the children, moving each one to the fragment.
    // The last child of n becomes the first child of f, and vice-versa.
    // Note that appending a child to f automatically removes it from n.
    while (n.lastChild) f.appendChild(n.lastChild);

    // Finally, move the children of f all at once back to n, all at once.
    n.appendChild(f);
}

// Example 15-6. Implementing insertAdjacentHTML() using innerHTML
//
// This module defines Element.insertAdjacentHTML for browsers that don't
// support it, and also defines portable HTML insertion functions that have
// more logical names than insertAdjacentHTML:
//
// 	Insert.before(), Insert.after(), Insert.atStart(), Insert.atEnd()
//
//	<div id="x">Hello, World</div>
//	^before     ^start      ^end  ^after
//
var Insert = (function() {
    // If elements have a native insertAdjacentHTML, use it in four HTML
    // insertion functions with more sensible names.
    if (document.createElement("div").insertAdjacentHTML) {
	return {
	    before: function(e,h) {e.insertAdjacentHTML("beforebegin",h);},
	    after: function(e,h) {e.insertAdjacentHTML("afterend",h);},
	    atStart: function(e,h) {e.insertAdjacentHTML("afterbegin",h);},
	    atEnd: function(e,h) {e.insertAdjacentHTML("beforeend",h);}
	};
    }

    // Otherwise, we have no native insertAdjacentHTML, Implement the same
    // four insertion functions and then use them to define insertAdjacentHTML

    // First, define a utility method that takes a string of HTML and returns
    // a DocumentFragment containing the parsed representation of that HTML.
    function fragment(html) {
	var elt = document.createElement("div");	// Create empty element
	var frag = document.createDocumentFragment();	// Create empty fragment
	elt.innerHTML = html;				// Set element content
	while (elt.firstChild)				// Move all nodes
	    frag.appendChild(elt.firstChild);		//    from elt to frag
	return frag;					// And return the frag
    }

    var Insert = {
	before: function(elt, html) {
	    elt.parentNode.insertBefore(fragment(html), elt);
	},
	after: function(elt, html) {
	    elt.parentNode.insertBefore(fragment(html), elt.nextSibling);
	},
	atStart: function(elt, html) {
	    elt.insertBefore(fragment(html), elt.firstChild);
	},
	atEnd: function(elt, html) {
	    elt.appendChild(fragment(html));
	}
    };

    // Now implement insertAdjacentHTML based on the functions above
    Element.prototype.insertAdjacentHTML = function(pos,html) {
	switch(pos.toLowerCase()) {
	case "beforebegin": return Insert.before(this, html);
	case "afterend": return Insert.after(this, html);
	case "afterbegin": return Insert.atStart(this, html);
	case "beforeend": return Insert.atEnd(this, html);
	}
    };

    return Insert; // Finally return the four insertion function
}());
