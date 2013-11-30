---
layout: post
title: firefox with tor
category: note
---

[old post on blogsport](http://wkliang.blogspot.tw/2012/06/firefox-with-tor-socks.html) re-post here,

洋蔥網路 可以用來翻牆、隱藏自己的 IP、、基本上用來搭配：瀏覽器、IM、、這些懂得使用 SOCKS 協議的客戶端軟件。

目前測試過的瀏覽器：opera 沒問題，但是 opera 傻傻地不會用 socks 去 query DNS，讓 DNS 的管理員有機會追蹤網路使用紀錄。

firefox 可以在 about:config 設定

	network.proxy.socks = "127.0.0.1"  
	network.proxy.socks_port = 9050  
	network.proxy.socks_remote_dns = true  


想要同時開啟兩個不同的 firefox sessions 一個正常使用，另一個利用 Tor/Socks... 先使用firefox 的 ProfileManager 創造 default 之外的 tor profile

	firefox -ProfileManager


在命令行：

	firefox -P tor -no-remote


可以在兩個不同的 firefox session 打開 tor 檢查 確認是否已經透過 Tor 洋蔥網路瀏覽？

BTW, 不要笨到用 Tor 去打開需要輸入個人帳密的網站，Tor 的出口節點是有可能搞鬼的！

进入Tor网络后，加密信息在路由器间传递，最后到达“出口節點”（exit node），明文数据从这个节点直接发往原来的目的地。对于目的主机而言，是从“出口節點”发来信息。要注意的是明文資訊即使在 Tor網路中是加密的，離開 Tor後仍然是明文的。Wikileaks 創始人便聲稱其公開的某些檔案是截獲於 Tor的出口節點

使用網路要真正的安全、隱密、、是很需要知識的。 

// Have Fun!

{% include references.md %}
