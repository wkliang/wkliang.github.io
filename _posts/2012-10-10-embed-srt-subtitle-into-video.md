---
layout: post
title: embed srt into mkv using ffmpeg ImageMagick
category: programming
---

following [shell script](/programs/srt2frame.sh) to embed srt into mkv
and [srt2frame.c](/programs/srt2frame.c) for framming srt.

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
		-ss ${START} -t ${DURATION} -acodec copy -sameq \
		-y ${OUTPUT}.mka

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

	ffmpeg -threads 4 -r ${FPS} -f image2 -i ${OUTPUT}.out/f%d.png \
		-i ${OUTPUT}.mka -acodec copy -sameq -y ${OUTPUT}.mkv

	echo "Done!"
	exit

// EOT

{% include references.md %}
