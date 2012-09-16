
// pg#459
function deleteEvent(target, type, handler) {
    if (target.removeEventListener)
	target.removeEventListener(type, handler, false);
    else	// wkliang:20120917: might not work!?
	target.detachEvent("on" + type, handler);
}

// pg#461
/*
 * Register the specified handler function to handle events of the specified
 * type on the specified target. Ensure that the handler will always be 
 * invoked as a method of the target
 */
function addEvent(target, type, handler) {
    if (target.addEventListener)
	target.addEventListener(type, handler, false);
    else
	target.attachEvent("on" + type,
		function(event) {
		    // Invoke the handler as a method of target,
		    // passing on the event object
		    return handler.call(target, event);
		});
}

// pg#464
function cancelHandler(event) {
    var event = event || window.event;	// For IE

    /* Do something to handler the event here */
    console.log("cancel",event.type);

    // Now cancel the default action associated with the event
    if (event.preventDefault) event.preventDefault();	// Standard technique
    if (event.returnValue) event.returnValue = false;	// IE
    return false;	// For handlers registered as object properties
}

