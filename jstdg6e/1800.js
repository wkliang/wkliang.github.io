
// pg#497
// Example 18-1. POSTing plain text to a server

function postMessage(msg) {
    var request = new XMLHttpRequest();	// New request
    request.open("POST", "/log.php");	// POST to a server-side script
    // Send the message, in plain text, as the request body
    request.setRequestHeader(
	"Content-Type",			// Request body will be plain text
	"text/plain;charset=UTF-8");
    request.send(msg);			// Send msg as the request body
    // The request is done. We ignore any response or any error.
}

// pg#499
// Example 18-2. Getting HTTP response onreadystatechange

// Issue an HTTP GET request for the contents of the specified URL.
// When the response arrives successfully, verify that it is plain text
// and if so, pass it to the specified callback function
function getTexet(url, callback) {
    var request = new XMLHttpRequest();	// Create new request
    request.open("GET", url);		// Specify URL to fetch
    request.onreadystatechange = function() {	// Define event listener
	// If the request is complete and was successful
	if (request.readyState === 4 && request.status === 200) {
	    var type = request.getResponse("Content-Type");
	    if (type.match(/^text/))		// Make sure response is text
		callback(request.responeText);	// Pass it to callback
	}
    };
    request.send(null);			// Send the request noew
}

// pg#499
// Issue a synchronous HTTP GET request for the contents of the specified URL.
// Return the response text or throw an error if the request was not successful
// or if the response was not text.
function getTextSync(url) {
    var request = new XMLHttpRequest();	// Create new request
    request.open("GET", url, false);	// Pass false for synchronous
    request.send(null);			// Send the request now

    // Throw an error if the request was not 200 OK
    if (request.status !== 200)
	throw new Error(request.statusText);

    // Throw an error if the type was wrong
    var type = request.getResponseHeader("Content-Type");
    if (!type.match(/^text/)
	throw new Error("Expected textual response; got: " + type);

    return request.responseText;
}


// pg#500
// Example 18-3. Parsing the HTTP response

// Issue an HTTP GET request for the contents of the specified URL.
// When the response arrives, pass it to the callback function as a
// parsed XML Document object, a JSON-parsed object, or a string.
function get(url, callback) {
    var request = new XMLHttpRequest();		// Create new request
    request.open("GET", url);			// Specify URL to fetch
    request.onreadystatechange = function() {	// Define event listener
	// If the request is complete and was successful
	if (reques.readyState === 4 && request.status === 200) {
	    // Get the type of response
	    var type = request.getResponseHeader("Content-Type);
	    // Check type so we don't get HTML documents in the future
	    if (type.indexOf("xml") !=== -1 && request.responseXML)
		callback(request.responseXML); // Document response
	    else if (type === "application/json")
		callback(JSON.parse(request.responseText)); // JSON response
	    else
		callback(request.responseText); // String response
	}
    };
    request.send(null);				// Send the request now
}


// pg#502
// Example 18-4. Encoding an object for an HTTP request
/**
 * Encode the properties of an object as if they were name/value pairs from
 * an HTML form, using application/x-www.form-urlencoded format
 */
function encodeFormData(data) {
    if (!data) return "";	// Always return a string

    var pairs = [];		// To hold name=value pairs
    for (var name in data) {	// For each name
	if (!data.hasOwnProperty(nam)) continue;	// Skip inherited
	if (typeof data[name] === "function") continue;	// Skip methods
	var value = data[name].toString();		// Value as string
	name = encodeURIComponent(name.replace(" ","+"));	// Encode name
	value = encodeURIComponent(value.replace(" ","+"));	// Encode value
	pairs.push(name + "=" + value);	// Remember name=value pair
    }
    return pairs.join('&');	// Return joined pairs separated with &
}


// pg#503
// Example 18-5. Making an HTTP POST request with form-encoded data
function postData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);			// POST to the specified url
    request.onreadystatechange = function() {	// Simple event handler
	if (request.readyState===4 && callback)	// When response is complete
	    callback(request);			// call the callback
    };
    request.setRequestHeader("Content-Type",	// Set Content-Type
	"application/x-www-form-urlencoded");
    request.send(encodeFormData(data));		// Send form-encoded data
}


// pg#503
// Example 18-6. Making a GET request with form-encoded data
function getData(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url +			// GET the specified url
	"?" + encodeFormData(data));		// with encoded data added
    request.onreadystatechange = function() {	// Simple event handler
	if (request.readyState===4 && callback)
	    callback(request);
    };
    request.send(null);				// Send the request
}


// pg#504
// Example 18-7. Making an HTTP POST request with a JSON-encoded body
function postJSON(url, data, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);			// POST to the specified url
    request.onreadystatechange = function() {	// Simple event handler
	if (request.readyState===4 && callback)	// When response is complete
	    callback(request);			// call the callback
    };
    request.setRequestHeader("Content-Type",	// Set Content-Type
	"application/json");
    request.send(JSON.stringify(data));		// Send form-encoded data
}


// pg#504
// Example 18-8. An HTTP POST request with an XML document as its body
//
// postQuery("http://foods.com", "pizza", "02134", "1km", callback);
//
//	<query>
//		<find zipcode="02134" radius="1km">
//			pizza
//		</find>
//	</query>
//
// Encode what, where, and radius in an XML document and post them to the
// specified url, invoking callback when the response is received
function postQuery(url, what, where, radius, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", url);			// POST to the specified url
    request.onreadystatechange = function() {	// Simple event handler
	if (request.readyState===4 && callback)
	    callback(request);
    };

    // Create an XML document with root element <query>
    var doc = document.implementation.createDocument("", "query", null);
    var query = doc.documentElement;		// The <query> element
    var find = doc.createElement("find");	// Create a <find> element
    query.appendChild(find);			// And add it to the <query>
    find.setAttribute("zipcode", where);	// Set attributes on <find>
    find.setAttribute("radius", radius);
    find.appendChild(doc.createTextNode(what));	// And set content of <find>

    // Now send the XML-encoded data to the server.
    // Note that the Content-Type will be automatically set.
    request.send(doc);
}


