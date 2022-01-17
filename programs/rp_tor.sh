#!/bin/bash

hosts=~/try/Changelog.md

test()
{
	# https://linuxhint.com/bash_append_array/
	arrList=("torsocks")
	while [ $# -ne 0 ] ; do
		pattern="^$1.*\\.onion\$"
		result=$(grep $pattern $hosts)
		echo $# $result
		if [ -z "$result" ] ; then
			arrList+=($1)
		else
			r2=$(echo $result |sed 's/^.*\s//')
			arrList+=($r2)
		fi
		shift
	done
	echo arrList ${arrList[@]}
	exec ${arrList[@]}
}

test "$@"
echo after test "$@"



