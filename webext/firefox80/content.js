//
console.log('content.js is running');

// listen for checkForWord request, call getTags which includes callback to sendResponse
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(`request: ${JSON.stringify(request)}`);

    if (request.action === 'eventTarget') {
	    document.location = request.data;
	    sendResponse('OK');
	    return true;
    } else if (request.action !== 'checkForWord') return false;

    // Returns the index of the first instance of the desired word on the page.
    var iframes = document.getElementsByTagName('iframe');
    var results = [];
    for (var i = 0; i < iframes.length; i++) {
        // console.log(`chekForWord ${i} ${iframes[i].src.match(/facebook.*plugins.*/)}`);
	results = [...results, iframes[i].src];
    }
    console.log(`results: ${results}`);
    sendResponse({ results });
    return true;
});

