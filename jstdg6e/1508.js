
// pg#391

// Example 15-8. Querying the scrollbar positions of a window
// Return the current scrollbar offsets as the x and y properties of an object
function getScrollOffset(w) {
    // Use the specified window or the current window if no argument
    w = w || window;

    // This work for all browser except IE version 8 and before
    if (x.pageXOffset != null) return {x: w.pageXOffset, y:w.pageYOffset};

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
	return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop};

    // For browsers in Quirks mode
    return {x:d.body.scollLeft, y:d.body.scrollTop};

}

// Example 15-9. Querying the viewport size of a window
// Return the viewport size as w and h properties of an object
function getViewportSize(w) {
    // Use the specified window or the current window if no argument
    w = w || window;

    // This work for all browser except IE version 8 and before
    if (x.innerWidth != null) return {w: w.innerWidth, h:w.innerHeight};

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
	return {
		w:d.documentElement.clientWidth,
		h:d.documentElement.clientHeight };

    // For browsers in Quirks mode
    return {w:d.body.clientWidth, h:d.body.clientHeight};
}

// wkliang:20120910
// summary two functions above, return x, y, w, h
function getDisplayInfo(w) {
    // Use the specified window or the current window if no argument
    w = w || window;

    // This work for all browser except IE version 8 and before
    if (x.pageXOffset != null)
	return {
		x: w.pageXOffset, y:w.pageYOffset,
		w: w.innerWidth, h: w.innerHeight };

    // For IE (or any browser) in Standards mode
    var d = w.document;
    if (document.compatMode == "CSS1Compat")
	return {
		x: d.documentElement.scrollLeft,
		y: d.documentElement.scrollTop,
		w: d.documentElement.clientWidth,
		h: d.documentElement.clientHeight };

    // For browsers in Quirks mode
    return {
	x: d.body.scollLeft,
	y: d.body.scrollTop,
	w: d.body.clientWidth,
	h: d.body.clientHeight };

}

// pg#396
// wkliang:20120910
function getElementPos(elt) {
    var x = 0, y = 0;
    // Loop to add up offsets
    for (var e = elt; e != null; e = e.offsetParent) {
	x += e.offsetLeft;
	y += e.offsetTop;
    }
    // Loop again, through all ancestor elements to subtract scroll offsets.
    // This subtracts the main scrollbars, too, and converts to viewport coords.
    for (var e=elt.parentNode; e!=null && e.nodeType==1; e=e.parentNode) {
	x -= e.scrollLeft;
	y -= e.scrollTop;
    }
    return {x:x, y:y};
}

