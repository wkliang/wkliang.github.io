
// pg#679, Example 22-5. Using the Twitter search gadget with postMessage()

// This file of JS code inserts the Twitter Search Gadget into the document
// and adds an event handler to all links in the document so that when the
// use moves the mouse over them, the gadget searchs for the link's URL.
// This allows the users to see what people are tweeting about the link
// destination before clicking on it.

function handleMessage(e) {
    if (typeof e.data === "string") {
	console.log("o: " + e.origin + ", d: " + e.data + ".");
    }
    else {
	for (var i in e.data) {
	    console.log("e.data[" + i + "]=" + e.data[i] + ".");
	}
    }
}

window.addEventListener("load", function() {	// Won't work in IE < 9
//   var origin = "http://wkliang.github.com";		// Gadget origin
//   var gadget = "/jstdg6e/2204.html";			// Gadget path
    var origin = "";		// Gadget origin
    var gadget = "2204.html";			// Gadget path

    var iframe = document.createElement("iframe");	// Create the iframe
    iframe.src = origin + gadget;			// Set its URL
    iframe.width = "240";				// 250 pixel wide
    iframe.height = "320"; // "100%";			// Full document right
    iframe.style.cssFloat = "right";			// Flush right
//  iframe.style.position = "fixed";

    // Insert the iframe at the start of the document
    document.body.insertBefore(iframe, document.body.firstChild);

    // Now find all links and hook them up to the gadget
    var links = document.getElementsByTagName("a");
    var urls = [];
    for (var i = 0; i < links.length; i++) {
	// addEventListener doesn't work in IE8 and before
	links[i].addEventListener("mousemove", function() {
	    // Send the url as the search term, and only deliver it if the
	    // iframe is still displaying a document from xxxxx.com
	    iframe.contentWindow.postMessage(this.href, "*" /* origin */);
	    console.log("postMessage: ", this.href);
	}, false);
	// urls.push(links[i].href);
    }
    urls.push("0101.html");
    urls.push("0800.html");

    var worker = new Worker("2208.js");
    worker.postMessage(urls);

    worker.onmessage = function(e) {
	handleMessage(e);
    };

}, false);

window.addEventListener("message", function(e) { handleMessage(e) }, false);
