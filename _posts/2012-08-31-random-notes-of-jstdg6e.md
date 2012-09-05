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

// wkliang:20120904，jstdg6e 筆記
* pg#350 showModalDialog("form.html"); 兩個 html 必須 same origin，不然 from 抓不到 window.dialogArguments
* pg#351, firefox 跟別人不一樣，onerror handler return true 代表該錯誤事件已經被處理了。
* pg#351，If you name an element in your HTML document using the id attribute, and if the Window object does not already have a property by that name, the Window object is given a nonenumerable property whose name is the value of the id attribute and whose name is the HTMLElement object that represents that document element. ~~~ 有錯！ window property 的 name 是 id，value 可以是 HTMLElement，或者 array of HTMLElements（當 name="sameName"），甚至是 window object（iframe）


// EOT


{% include references.md %}
