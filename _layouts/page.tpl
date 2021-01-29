<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<meta name="author" content="wkliang" />
<meta name="keywords" content="{{ page.tags | join: ',' }}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>pirate bear:D{% if page.title %} / {{ page.title }}{% endif %}</title>
<link href="http://wkliang.github.com/feed.xml" rel="alternate" title="pirate bear:D" type="application/atom+xml" />
<link rel="stylesheet" type="text/css" href="/assets/css/site.css" />
<link rel="stylesheet" type="text/css" href="/assets/css/code/github.css" />
{% for style in page.styles %}<link rel="stylesheet" type="text/css" href="{{ style }}" />
{% endfor %}
</head>

<body class="{{ page.pageClass }}">

<div class="main">
	{{ content }}

	<footer>
		<p>&copy; Since 2012 <a href="http://github.com/wkliang" target="_blank">github.com/wkliang</a></p>
	</footer>
</div>

<side>
	<h2><a href="/">pirate bear:D</a><a href="/feed.xml" class="feed-link" title="subscribe">RSS feed</a></h2>
	
	<nav class="block">
		<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
		</ul>
	</nav>
	
	<form action="/search/" class="block block-search">
		<h3>搜索</h3>
		<p><input type="search" name="q" placeholder="Enter to search" /></p>
	</form>
	
	<div class="block block-about">
		<h3>关于</h3>
		<figure>
			<img src="/assets/img/bear.jpg"/>
			<figcaption><strong>wkliang</strong></figcaption>
		</figure>
		<p>Clarke's Three Laws:
		<li>When a distinguished but elderly scientist states that something is possible, he is almost certainly right. When he states that something is impossible, he is very probably wrong.</li>
		<li>The only way of discovering the limits of the possible is to venture a little way past them into the impossible.</li>
		<li>Any sufficiently advanced technology is indistinguishable from magic.</li>
		</p>
	</div>
	
	<div class="block block-license">
		<h3>版权申明</h3>
		<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" class="hide-target-icon" title="全部采用知识共享署名"><img alt="知识共享许可协议" src="/assets/img/88x31.png" /></a></p>
	</div>
	
	<div class="block block-fork">
		<a href="https://github.com/wkliang"><img style="position: absolute; top: 0; right: 0; border: 0;" src="/assets/img/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>
	</div>
	
	<div class="block block-thank">
		<h3>Powered by</h3>
		<p>
			<a href="http://disqus.com/" target="_blank" title="云评论服务">Disqus</a>,
			<a href="http://github.com/" target="_blank">GitHub</a>,
			<a href="http://www.google.com/cse/" target="_blank" title="自定义站内搜索">Google Custom Search</a>,
			<a href="http://en.gravatar.com/" target="_blank" title="统一头像标识服务">Gravatar</a>,
			<a href="http://softwaremaniacs.org/soft/highlight/en/">HighlightJS</a>,
			<a href="http://github.com/mojombo/jekyll" target="_blank">jekyll</a>
		</p>
	</div>
</side>

<script src="http://elfjs.googlecode.com/files/elf-0.3.3-min.js"></script>
<script src="/assets/js/site.js"></script>
<script src="/assets/js/highlight.js"></script>
<script src="/assets/js/hljs/languages/css.js"></script>
<script src="/assets/js/hljs/languages/xml.js"></script>
<script src="/assets/js/hljs/languages/javascript.js"></script>
<script src="/assets/js/hljs/languages/php.js"></script>
<script src="/assets/js/hljs/languages/ruby.js"></script>
{% for script in page.scripts %}<script src="{{ script }}"></script>
{% endfor %}

</body>
</html>
