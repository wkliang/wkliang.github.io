---
layout: post
title: 犀牛書 jstdg6e 讀書隨記
category: note
---

tab 開頭的行～會被當作 code ??

	// pg#320, Example 13-4. 

	// Asynchronously load and execute a script from specified URL
	function loadasync(url) {
	    var head = document.getElementsByTagName("head")[0]; // Find document <head>
	    var s = document.createElement("script");	// Create a <script> element
	    s.src = url;
	    head.appendChild(s);
	}

// wkliang:20120830

* jekyll 跟小日本的 wiki template 相比，有什麼優缺點？
* 把 servent 放上 github

// wkliang:20120831
* 好玩的 [Bookmarklet](/demo/jstdg6e/1300.html)
* 可以想一下，怎樣用 bookmarklet 加入 JsonP 的功能...
* jstdg6e ch8 functional programming 相關的 paradigms 需要更熟悉，特別是 map/reduce

// EOT


{% include references.md %}
