#!bin/sh

# url=http://192.168.0.6:3000/stream.mjpg 
url=http://ware.tw:3000/stream.mjpg 

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
