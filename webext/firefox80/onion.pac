/*
https://www.tecmint.com/use-tor-network-in-web-browser/
https://findproxyforurl.com/example-pac-file/
https://support.mozilla.org/en-US/kb/connection-settings-firefox
https://developer.mozilla.org/en-US/docs/Web/HTTP/Proxy_servers_and_tunneling/Proxy_Auto-Configuration_(PAC)_file
*/
function FindProxyForURL(url, host) {
	if (isPlainHostName(host) || shExpMatch(host, "*.onion"))
		return "SOCKS5 127.0.0.1:9050"
	if (shExpMatch(url, "*://ip*.ek21.com/*") ||
//	    shExpMatch(url, "*://*.jkforum.net/*") ||
	    shExpMatch(url, "*://*.medium.com/*") ||
	    shExpMatch(url, "*://*.cmoney.com.tw/*"))
		return "SOCKS5 127.0.0.1:9050"
	return "DIRECT";
}
