---
layout: post
title: 犀牛書 jstdg6e 讀書隨記
category: note
---

tab 開頭的行～會被當作 code ??

	var Jsonp = (function() {
	  // "Static" script ID counter
	  var scriptTagCounter = 1, head;

	  function buildScriptTag(url, cacheOk) {
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

	  return function invoke(fullUrl, cacheOk) {
	    var c = cacheOk || true; // false  ... default
	    var script = buildScriptTag(fullUrl, c);

	    if (typeof head != 'object') {
	      head = document.getElementsByTagName("head").item(0);
	    }
	    head.appendChild(script);
	    return script;
	  }

	}());

// wkliang:20120830

* jekyll 跟小日本的 wiki template 相比，有什麼優缺點？
* 把 servent 放上 github

// wkliang:20120831
* 好玩的 [Bookmarklet](/demo/jstdg6e/1300.html)
* 可以想一下，怎樣用 bookmarklet 加入 JsonP 的功能...

// EOT


{% include references.md %}
