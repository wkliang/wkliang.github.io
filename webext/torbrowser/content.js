//
/*
(function() {
  console.log('change facebook iframe');
  let iframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < iframes.length; i++) {
    if (iframes[i].src.toLowerCase().indexOf('facebook.com/plugins') > -1) {
      // iframes[i].contentWindow.location.reload(true);
      iframes[i].src = iframes[i].src.replace(/facebook.com/i,'facebookcorewwwi.onion');
      console.log(`iframe src = ${iframes[i].src}`);
      break;
    }
  }
  console.log('change facebook iframe DONE');
})();
*/

console.log('content.js is running');

// listen for checkForWord request, call getTags which includes callback to sendResponse
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request.action !== 'checkForWord') return false;

    // Returns the index of the first instance of the desired word on the page.
    (function (request, sender, sendResponse) {
        var iframes = document.getElementsByTagName('iframe');
        for (var i = 0; i < iframes.length; i++) {
          console.log(`chekForWord ${i} ${iframes[i].src.match(/facebook.*plugins.*/)}`);
          if ( iframes[i].src.match(/facebook.*plugins.*feedback/) ||
             iframes[i].src.match(/facebook.*plugins.*comment/) ) {
            return sendResponse({ results: 
              iframes[i].src.replace(/facebook.com/i,'facebookcorewwwi.onion')});
          }
        }
        return sendResponse({ results: null });
      })(request, sender, sendResponse);
      return true;
});


