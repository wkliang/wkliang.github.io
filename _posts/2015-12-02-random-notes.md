---
layout: post
title: 一些 nodejs 隨手記
category: note
---

20151202
========

[Go Native - Calling C++ From NodeJS](http://sagivo.com/post/130207525903/nodejs-addonsZZ)

20151116
========

[網路爬蟲](https://nodejs.org/en/docs/es6/)

Jupyter 似乎很犀利...
用 browser 當 IDE/command line tool 進行網頁撈取

[什麼是網路爬蟲?](http://www.largitdata.com/course/1/)

[设计师如何学习前端？](http://www.zhihu.com/question/21921588)

[JavaScript 模块化七日谈](http://huangxuan.me/js-module-7day/#/)

[Node入门](http://www.nodebeginner.org/index-zh-cn.html)

[使用 Socket.IO 建立 Realtime Web App](http://blogger.gtwang.org/2014/03/socket-io-node-js-realtime-app.html)

[Node.js Web应用代码热更新的另类思路](http://fex.baidu.com/blog/2015/05/nodejs-hot-swapping) 相信使用 Node.js 开发过 Web 应用的同学一定苦恼过新修改的代码必须要重启 Node.js 进程后才能更新的问题。习惯使用 PHP 开发的同学更会非常的不适用。手动重启进程不仅仅是非常恼人的重复劳动，当应用规模稍大以后，启动时间也逐渐开始不容忽视。

解决这类问题最直接和普适的手段就是监听文件修改并重启进程。这个方法也已经有很多成熟的解决方案提供了，比如已经被弃坑的 node-supervisor，以及现在比较火的 PM2 ，或者比较轻量级的 node-dev 等等均是这样的思路。

本文则提供了另外一种思路，只需要很小的改造，就可以实现真正的0重启热更新代码，解决 Node.js 开发 Web 应用时恼人的代码更新问题。

[ES6 In Depth: An Introduction](https://hacks.mozilla.org/2015/04/es6-in-depth-an-introduction/)
