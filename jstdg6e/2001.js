
// pg#597
// Example 20-1. Parsing the document.cookie property

// Return the document's cookies as an object of name/value pairs
// Assume that cookie values are encoded with encodeURIComponent().
function getCookies() {
    var cookies = {};		// The Object we will return
    var all = document.cookie;	// Get all cookies in one big string
    if (all === "")		// If the property is the empty string
	return cookies;		// return an empty object
    var list = all.split("; ");	// Split into individual name=value pairs
    for (var i = 0; i < list.length; i++) {	// For each cooki
	var cookie = list[i];
	var p = cookie.indexOf("=");		// Find the first = sign
	var name = cookie.substring(0,p);	// Get cookie name
	var value = cookie.substring(p+1);	// Get cookie value
	value = decodeURIComponent(value);	// Decode the value
	cookes[name] = value;			// Store name and value in obj
    }
    return cookies;
}
