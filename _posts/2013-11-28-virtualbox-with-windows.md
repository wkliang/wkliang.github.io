---
layout: post
title: virtualbox with windows
category: power_usage
---

	yum install VirtualBox kmod-VirtualBox

virtualbox needs kernel module to work properly. after installation, reboot linux system; or deal with modprobe stuffs.

refer [mordern.IE](http://www.modern.ie/en-us/virtualization-tools#downloads) to download IE + windows installation image, for IE10 - Win7:

	wget -i https://az412801.vo.msecnd.net/vhd/IEKitV1_Final/VirtualBox/Linux/IE10_Win7/IE10.Win7.For.LinuxVirtualBox_2.txt

There will be one part1.sfx and several partx.rar downloaded. use

	unrar x *.part1.sfx

one big .ova file genereated, which could be use by VirtualBox to instantiat ONE runtime environment

// Have Fun!

{% include references.md %}
