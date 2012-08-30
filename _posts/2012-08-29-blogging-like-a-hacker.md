---
layout: post
title: 像黑客一样写自己的技术博客
category: thinking, reading, note
---

看了這篇博文：[搭建一个免费的，无限流量的Blog----github Pages和Jekyll入门](http://www.ruanyifeng.com/blog/2012/08/blogging_with_jekyll.html)

一時手癢，想試看看看...
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


原文：[像黑客一样写自己的技术博客](http://mytharcher.github.com/posts/my-tech-blogging-like-a-hacker.html)

...

其实，我只希望一切都很简单。

然后我通过[GitHub]遇见了[jekyll]，加上[Github]本身支持对网站项目的托管和域名指向，以及以前用的各种云服务，整个世界瞬间变的美好了！

现在，我可以：

* 使用纯文本的[Markdown]编辑文章
* 使用git维护文章的版本
* 不用租一个虚拟空间和数据库服务，而就在[GitHub]上托管整个网站
* 自定义域名指向
* 使用[Disqus]的云评论服务
* 一如既往的使用[Google Picasa]作为我的图片外链服务
* 用[Google Custom Search]自定义站内搜索
* [jekyll]自带的或者用[HighlightJS]做代码高亮
* [Gravatar]统一头像标识服务
* ……

感谢这个有云的时代！可以让我们通过一件件简单的工具打造属于每个程序员自己的站点，[像黑客一样写博客](http://kyle.xlau.org/posts/blogging-like-a-hacker.html)（原文：[Blogging Like a Hacker](http://tom.preston-werner.com/2008/11/17/blogging-like-a-hacker.html)）。于是我可以把精力只放在文章的内容上，这一定会更有效率。

...

// wkliang:20120830, Random note & thinking:

* jekyll 跟小日本的 wiki template 相比，有什麼優缺點？
* 把 servent 放上 github

// EOT


{% include references.md %}
