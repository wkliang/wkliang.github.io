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

