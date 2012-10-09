---
layout: post
title: embed srt into mkv using ffmpeg ImageMagick
category: programming
---

following shell script to embed srt into mkv
and [srt2frame.c](/programs/srt2frame) for framming srt.

	#!/bin/sh

	AVF=${1}
	SRT=${2}
	START=${3}
	DURATION=${4}
	OUTPUT=${5}

	if [ $# -lt 5 ]; then
		echo $0 avfile srt start duration output
		exit 1
	fi

	ffmpeg -i ${AVF} -ss ${START} -t ${DURATION} \
		-vf scale=-1:360 -f image2 -y ${OUTPUT}.frames/f%d.png \
		-ss ${START} -t ${DURATION} -acodec copy -sameq -y ${OUTPUT}.mka

	FRAMES=`ls ${OUTPUT}.frames |wc -l`
	FPS=`echo "scale=0; ${FRAMES}/${DURATION}" |bc`
	mkdir -p ${OUTPUT}.out
	mkdir -p ${OUTPUT}.txt
	mkdir -p ${OUTPUT}.frames
	srt2frame ${SRT} ${START} ${DURATION} ${FPS} ${OUTPUT}.txt
	for (( i=1 ; i<=${FRAMES} ; i++ )) ; do
		echo ${FRAMES} ${FPS} ${i}
		if [ -f ${OUTPUT}.txt/${i} ] ; then
			SUBTXT=`cat ${OUTPUT}.txt/${i}`
			convert ${OUTPUT}.frames/f${i}.png \
				-gravity Center \
				-font Microsoft-JhengHei-Negreta \
				-pointsize 24 -fill black \
				-draw "text 0,122 \"${SUBTXT}\"" \
				-pointsize 24 -fill white \
				-draw "text 0,120 \"${SUBTXT}\"" \
				${OUTPUT}.out/f${i}.png
		else
			cp ${OUTPUT}.frames/f${i}.png ${OUTPUT}.out
		fi
	done

	ffmpeg -threads 4 -r ${FPS} -f image2 -i ${OUTPUT}.out/f%d.png -i ${OUTPUT}.mka -acodec copy -sameq -y ${OUTPUT}.mkv

	echo "Done!"
	exit

// pg#367, NodeLists and HTMLCollections

	for (var i=0; i < document.images.length; i++)	// Loop thru all images
	    document.images[i].style.display = "none";	// ... and hide them.


// wkliang:20120905

* jekyll 跟小日本的 wiki template 相比，有什麼優缺點？
* 把 servent 放上 github
* 好玩的 [Bookmarklet](/demo/jstdg6e/1300.html)
* 可以想一下，怎樣用 bookmarklet 加入 JsonP 的功能...
* ch8 functional programming 相關的 paradigms 需更熟悉，特別是 map/reduce
* pg#350 showModalDialog("form.html"); 兩個 html 必須 same origin，不然 from 抓不到 window.dialogArguments
* pg#375 Document Structure and Traversal ~ 覺得 MSIE 根本是來添亂的，不乖乖 follow W3C 標準，光會定義一些不甚高明的 API 跟 structure... (sick)


// EOT


{% include references.md %}
