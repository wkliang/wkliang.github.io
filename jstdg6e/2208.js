
// pg#686, Example 22-8. Making synchronous XMLHttpRequest in a Web Worker

// This file will be loaded with new Worker(), so it run as an independent
// thread and can safely use the synchronous XMLHttpRequest API.
// Messages are expected to be arrays of URLs. Synchronously fetch the
// contents of each URL as a string and send back an array of those strings.

postMessage("worker starting...");

onmessage = function(e) {
    var urls = e.data;	// Our input: the URLs to fetch
    var contents = [];	// Our output: the contents of those URLs

    for (var i = 0; i < urls.length; i++) {
	var url = urls[i];		// For each URL
	var xhr = new XMLHttpRequest();	// Begin an HTTP request
	xhr.open("GET", url, false);	// false makes this synchronous
	postMessage("fetching " + url);
	xhr.send();			// Blocks until response is complete
	if (xhr.status !== 200)		// Throw an erro if request failed
	    postMessage(xhr.status + " " + xhr.statusText +
		": " + url + ", " + xhr.responseText);
	contents.push(xhr.responseText);
    }
    // Finally, send the array of URL contents back to the main thread
    postMessage(contents);
};
