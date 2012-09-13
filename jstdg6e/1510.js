
// pg#407
// Example 15-10. A streaming API for the innerHTML property

// Define a simple "streaming" API for setting the innerHTML of an element.
function ElementStream(elt) {
    if (typeof elt === "string") elt = document.getElementById(elt);
    this.elt = elt;
    this.buffer = "";
}

// Concatenate all arguments and append to the buffer
ElementStream.prototype.write = function() {
    this.buffer += Array.prototype.join.call(arguments, "");
};

// Just like write(), bu add a newline
ElementStream.prototype.writeln = function() {
    this.buffer += Array.prototype.join.call(arguments, "") + "\n";
};

// Set element content from buffer and empty the buffer.
ElementStream.prototype.close = function() {
    this.elt.innerHTML = this.buffer;
    this.buffer = "";
};

// pg#408
// getSelection() method of Window object does not return selected text
// if it is within an <input> or <textarea> from element: it only returns
// text selected from the body of the document itself.
//
// To obtain the selected text from a text input field or <textarea> element,
// use code:
//
// elt.value.substring(elt.selectionStart, elt.selectionEnd);
//
// The selectionStart and selectionEnd properties are not supported
// in IE8 or earlier.
//
function getSelectedText() {
    if (window.getSelection)		// The HTML5 standard API
	return window.getSelection().toString();
    else if (document.selection)	// This is the IE-specific technique
	return document.selection.createRange().text;
    return "";
}

