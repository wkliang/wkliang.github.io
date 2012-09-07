
// pg#373
// Example 15-2. Portable document traversal functions

/**
 * Return the nth ancestor of e, or null if there is no such ancestor
 * or if that ancestor is not an Element (a Document or DocumentFragment e.q.).
 * If n is 0 return e itself.
 * If n is 1 (or omitted) return the parent.
 * If n is 2, return the grandparent, etc.
 */
function parent(e, n) {
    if (n === undefined)
	n = 1;
    while(n-- && e)
	e = e.parentNode;
    if (!e || e.nodeType !== 1)
	return null;
    return e;
}

/**
 * Return the nth sibling element of Element e.
 * If n is positive return the nth next sibling element.
 * If n is negative, return the -nth previous sibling element.
 * If n is zero, return e itself.
 */
function sibling(e, n) {
    while (e && n !== 0) { // If e is not defined we just return it
	if (n > 0) { // Find next element sibling
	    if (e.nextElementSibling) e = e.nextElementSibling;
	    else {
		for (e=e.nextSibling; e && e.nodeType!==1; e=e.nextSibling)
		    /* empty loop */ ;
	    }
	    n--;
	}
	else { // Find the previous element sibling
	    if (e.previousElementSibling) e = e.previousElementSibling;
	    else {
		for(e=e.previousSibling;e&&e.nodeType!==1;e=e.previousSibling)
		    /* empty loop */ ;
	    }
	    n++;
	}
    }
    return e;
}

/**
 * Return the nth element child of e, or null if it doesn't have one.
 * Negative value of n count from the end. 0 means the first child, but
 * -1 means the last child, -2 means the second to last, and so on.
 */
function child(e, n) {
    if (e.children) {			   // If children array exists
	if (n < 0) n += e.children.length; // Convert negative n to array index
	if (n < 0) return null;		   // If still negative, no child
	return e.children[n];		   // Return specified child
    }
    // if e does nove have a children array, find the first child and count
    // forward or find the last child and count backwards from there.
    if (n >= 0) { // n is non-negative: cound forward from the first child
	// Find the first child element of e
	if (e.firstElementChild) e = e.firstElementChild;
	else {
	    for (e = e.firstChild; e && e.nodeType !== 1; e = e.nextSibling)
		/* empty */ ;
	}
	return sibling(e, n); // Return the nth sibling of the first child
    }
    else { // n is negative, so count backwards from the end
	if (e.lastElementChild) e = e.lastElementChild;
	else {
	    for (e = e.lastChild; e && e.nodeType !== 1; e = e.previousSibling)
		/* empty */;
	}
	return sibling(e, n+1); // +1 to convert child -1 to sib 0 of last
    }
}

// pg#374, Defining Custom Element Methods
//
// All current browsers (including IE8, but not IE7 and before)
// implement the DOM so that types like Element and HTMLDocument are classes
// like String and Array. They are not constructor (we'll see how to create new
// Element objects later in the chapter), but they have prototype objects and
// you can extend them with custom methods:

Element.prototype.next = function() { // don't work with IE7 and before ?!
    if (this.nextElementSibling)
	return this.nextElementSibling;
    var sib = this.nextSibling;
    while (sib && sib.nodeType !== 1)
	sib = sib.nextSibling;
    return sib;
};

// This ability to extend DOM types is still useful, however, if you want to 
// implement IE-specific feature in browsers other than IE. As noted above,
// the nonstandard Element property children was introduced by IE and has been
// adopted by other browsers. You can use code like this to simulate it
// in browsers like Firefox 3.0 that do not support it:

// Simulate the Element.children property in non-IE browsers that don't have it
// Note that this returns a static array than a live Nodelist

if (!document.documentElement.children) {
    Element.prototype.__defineGetter__("children", function() {
	var kids = [];
	for (var c = this.firstChild; c != null; c = c.nextSibling)
	    if (c.nodeType === 1)
		kids.push(c);
	return kids;
    });
}

// The __defineGetter__ method (cover in 6.7.1) is completely nonstandard,
// but it is perfect for portability code like this.

