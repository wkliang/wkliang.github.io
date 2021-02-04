---
layout: post
title: some shell scripts
category: note
---

rp_monitor.sh --- play streamming videos
```
#!bin/sh

url=http://192.168.0.6:3000/stream.mjpg 

pipe=$(mktemp)
rm -v $pipe
mknod $pipe p

if [ ! -p $pipe ] ; then 
	echo mknod $pipe p
	exit
fi

wget --no-cache $url -O $pipe >/dev/null 2>&1 &
ffplay -vf "rotate=PI" $pipe 

rm -v $pipe
```

rp_reset_usb.sh --- reset wireless kb/mice hub without unpluging then pluging

```
#!/bin/bash

port="1-1.4" # as shown by lsusb -t: {bus}-{port}(.{subport})

bind_usb() {
  echo "$1" >/sys/bus/usb/drivers/usb/bind
}

unbind_usb() {
  echo "$1" >/sys/bus/usb/drivers/usb/unbind
}

if [ $# = 0 ] ; then
  port="1-1.4"
else
  port=$1
fi

echo unbind_usb "$port"
unbind_usb "$port"

echo sleep 1 # enable delay here
sleep 1 # enable delay here

echo bind_usb "$port"
bind_usb "$port"

```

borrow from [stackoverflow](https://stackoverflow.com/questions/12855000/bash-redirecting-eof-into-variable)

```
while read line ; do
	echo $lnhe
done << __EOF__
path1
path2
path3
__EOF__
```

following command also useful

```
tar cvf /tmp/FIFO -T filelist.txt
```

// Have Fun!

{% include references.md %}
