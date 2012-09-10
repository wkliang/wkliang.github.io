
// pg#381
// Example 15-3. Finding all Text node descendants of an element

// Return the plain-text content of element e, recursing into child elements.
// This method works like the textContent property
function textContent(e) {
    var child, type, s = "";	// s holds the text of all children
    if (e.nodeType === 3 || e.nodeType == 4)
	return e.nodeValue;
    for (child = e.firstChild; child != null; child = child.nextSibling) {
	type = child.nodeType;
	if (type === 3 || type === 4)	// Text or CDATASEction nodes
	    s += child.nodeValue;
	else if (type === 1)		// Recurse for Element nodes
	    s += textContent(child);
    }
    return s;
}

// Recursively convert all Text node descendants of n to uppercase.
function upcase(n) {
    if (n.nodeType === 3 || n.nodeType === 4)	// If n is Text or CDATA
	n.data = n.data.toUpperCase();	// ... convert content to uppercase
    else				// Otherwise, recurse on child nodes
	for (var i = 0; i < n.childNodes.length; i++)
	    upcase(n.childNodes[i]);
}
