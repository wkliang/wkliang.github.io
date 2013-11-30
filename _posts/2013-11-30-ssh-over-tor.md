---
layout: post
title: ssh over tor
category: power_usage
---

on server side,

	yum install tor connect-proxy

after installation, modify /etc/tor/torrc to enable tor accessing sshd

	HiddenServiceDir /var/lib/tor/ssh/
	HiddenServicePort 22 127.0.0.1:22

start up service
	
	systemctl start tor.service

you could find some files generated under /var/lib/tor/ssh. "hostname" contains hidden service identifier.

on client side, modify ~/.ssh./config

	Host xyz1234567890zyx.onion
	HostName xyz1234567890zyx.onion
	User root
	CheckHostIP no
	# Compression yes
	# Protocol 2
	ProxyCommand connect-proxy -R %h -S 127.0.0.1:9050 %h %p

now you can fire up ssh client to connect over tor

// Have Fun!

{% include references.md %}
