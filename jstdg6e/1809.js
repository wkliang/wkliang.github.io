
// pg#505
// Example 18-9. File upload with an HTTP POST request

// Find all <input type="file"> elements with a data-uploadto attribute
// and register an onchange handler so that any selected file is
// automatically POSTED to specified "uploadto" URL. The server's
// response is ignored.
whenRead(function() {	// Run when the document is ready
    var elts = document.getElementsByTagName("input");	// All input elements
    for (var i = 0; i < elts.length; i++) {		// Loop through them
	var input = elts[i];
	if (input.type !== "file") continue;	// Skip all but file upload elts
	var url = input.getAttribute("data-uploadto");	// Get upload URL
	if (!url) continue;	// Skip any without url

	input.addEventListener("change",
	    function() {	// When user selects file
		var file = this.files[0]; // Assume a single file selection
		if (!file) return;		// If no file, do nothing
		var xhr = new XMLHttpRequest();	// Create a new request
		xhr.open("POST", url);		// POST to the URL
		xhr.send(file);			// Send the file as body
	    }, false);
    }
});

