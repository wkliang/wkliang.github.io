#!/bin/sh

usage() {
	echo "Usage: $0 URL {start | stop}"
	exit 1
}

if [ $# -lt 2 ] ; then
	usage
fi

H=`dirname $0`
P=`basename $0`
X=`date +'%Y%m%d%H%M%S'`
# R=http://bcr.media.hinet.net/RA000018
# R=http://219.87.83.73/greenpeace
R=$1
Q=`basename $R`
PS=$H/$Q.ppid
PP=$H/$Q.pid
# PID=""

getpid() {
	if [ ! -f $PP ] ; then
		echo "pid file not exist"
		return
	fi
	cmdline="/proc/`cat $PS`/cmdline"
	echo "cmdline is $cmdline"
	if [ ! -f $cmdline ] ; then
		echo "not exist" $cmdline
		rm -v $PS $PP
		return
	fi
	if ( grep -v $R $cmdline >/dev/null 2>&1 ) ; then
		echo "not match" $cmdline 
		rm -v $PS $PP
		return
	fi
	PID=`cat $PS`
	echo "PID is $PID"
}

start() {
	if [ ! -z $PID ] ; then
		echo $P $Q $PID "is running"
		return
	fi
	echo $$ > $PS # shell pid 
	echo "run" $P $$
	while true ; do
		mplayer -dumpstream -dumpfile $H/$X.$Q $R >/dev/null &
		echo $! > $PP # mplay pid
		wait $!
		sleep 60
	done
}

stop() {
	if [ -z $PID ] ; then
		echo $P $Q $PID "is NOT running"
		return
	fi
	kill -15 `cat $PS` `cat $PP`
	echo `cat $PS` `cat $PP` "is killed"
	rm -v $PP $PS
}

getpid

case "$2" in 
	'start')
		start
		;;
	'stop')
		stop
		;;
	*)
		usage
		;;
esac
