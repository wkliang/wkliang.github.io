// http://pastebin.com/ADxHdCnB

var Jsonp = (function() {
  // "Static" script ID counter
  var scriptTagCounter = 1, head;

  function invokeJsonp(fullUrl, cacheOk) {
    var c = cacheOk || true; // false  ... default
    var script = buildScriptTag(fullUrl, c);

    if (typeof head != 'object') {
      head = document.getElementsByTagName("head").item(0);
    }
    head.appendChild(script);
    return script;
  }

  function removeTag(script)  {
    if (typeof head != 'object') {
      head = document.getElementsByTagName("head").item(0);
    }
    head.removeChild(script);
  }

  function buildScriptTag(url, cacheOk)  {
    // Create the script tag
    var element = document.createElement("script"),
      additionalQueryParams, conjunction,
      actualUrl = url,
      elementId = 'jsonp-script-' + scriptTagCounter++;

    if (!cacheOk) {
      additionalQueryParams = '_=' + (new Date()).getTime();
      conjunction = (url.indexOf('?') == -1) ? '?' : '&';
      actualUrl = url + conjunction + additionalQueryParams;
    }

    // Set attributes on the script element
    element.setAttribute("type", "text/javascript");
    element.setAttribute("src", actualUrl);
    element.setAttribute("id", elementId);
    return element;
  }

  return {invoke : invokeJsonp, removeTag: removeTag};
}());

