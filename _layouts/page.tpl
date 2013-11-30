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
	<h2><a href="/">pirate bear:D</a><a href="/feed.xml" class="feed-link" title="RSS订阅"><img src="http://blog.rexsong.com/wp-content/themes/rexsong/icon_feed.gif" alt="RSS feed" /></a></h2>
	
	<nav class="block">
		<ul>
		{% for category in site.custom.categories %}<li class="{{ category.name }}"><a href="/category/{{ category.name }}/">{{ category.title }}</a></li>
		{% endfor %}
		</ul>
	</nav>
	
	<form action="/search/" class="block block-search">
		<h3>搜索</h3>
		<p><input type="search" name="q" placeholder="输入关键词按回车搜索" /></p>
	</form>
	
	<div class="block block-about">
		<h3>关于</h3>
		<figure>
			<img src="/assets/img/bear.jpg"/>
			<figcaption><strong>wkliang</strong></figcaption>
		</figure>
		<p>And One More Thing... Steve Jobs said:</p>
		<p>我的激情所在是打造一家可以传世的公司,这家公司里的人动力十足地创造伟大的产品。其他一切都是第二位的。当然,能赚钱很棒,因为那样你才能够制造伟大的产品。但是动力来自产品,而不是利润。斯卡利本末倒置,把赚钱当成了目标。这只是个微妙的差别,但其结果却会影响每一件事:你聘用谁,提拔谁,会议上讨论什么事情。</p>
		<p>有些人说:"消费者想要什么就给他们什么。”但那不是我的方式。我们的责任是提前一步搞清楚他们将来想要什么。我记得亨利·福特曾说过,“如果我最初是问消费者他们想要什么, 他们应该是会告诉我: 要一匹更快的马!”人们不知道想要什么, 直到你把它摆在他们面前。正因如此,我从不依靠市场研究。我们的任务是读懂还没落到纸面上的东西。</p>
	</div>
	
	<div class="block block-license">
		<h3>版权申明</h3>
		<p><a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/2.5/cn/" target="_blank" class="hide-target-icon" title="本站(博客)作品全部采用知识共享署名-非商业性使用-禁止演绎 2.5 中国大陆许可协议进行许可。转载请通知作者并注明出处。"><img alt="知识共享许可协议" src="http://i.creativecommons.org/l/by-nc-nd/2.5/cn/88x31.png" /></a></p>
	</div>
	
	<div class="block block-fork">
		<a href="https://github.com/wkliang"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_orange_ff7600.png" alt="Fork me on GitHub"></a>
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
