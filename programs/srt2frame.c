/*
	srt11.c

	20100416 -
		to generate "trading places"
		from a correct timeline srt with translate one 

	20120705 -
		to generate "heart and souls"
		merging two sub-files into one by timeline

	20121009 - srt2frame
		to generate subtitle according to frame
*/
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define SRT_STRSIZ	4096

typedef struct {
	int hr, min, sec, xs;
} SRT_time;

typedef struct {
	int seq;
	SRT_time begin, end;
	unsigned char str[SRT_STRSIZ];
} SRT_buf;

unsigned long SRT_time_long( SRT_time* tm )
{
	return (unsigned long)((((tm->hr*60)+tm->min)*60+tm->sec)*1000+tm->xs);
}

void SRT_time_set( SRT_time* tm, unsigned long val )
{
	tm->xs = val % 1000;	val /= 1000;
	tm->sec = val % 60;	val /= 60;
	tm->min = val % 60;	val /= 60;
	tm->hr = val;
}

void SRT_reset(SRT_buf *sp)
{
	memset((void*)sp, 0, sizeof(SRT_buf));
}

void SRT_writeout(FILE* fp, SRT_buf* sp)
{
	fprintf(fp, "%d \n%02d:%02d:%02d,%03d --> %02d:%02d:%02d,%03d \n%s\n",
		sp->seq,
		sp->begin.hr, sp->begin.min, sp->begin.sec, sp->begin.xs,
		sp->end.hr, sp->end.min, sp->end.sec, sp->end.xs,
		sp->str);
}

int SRT_readin(FILE* fp, SRT_buf* sp)
{
	unsigned char buf[BUFSIZ], *ptr;
	int rc, seq;
	int hs, ms, ss, xs, he, me, se, xe;

	while( 1 ) {
		if( fgets( buf, sizeof(buf), fp ) == NULL ) 
			return -1 * __LINE__;
		// printf( "%s(%d)\tbuf=%s.\n", __FILE__, __LINE__, buf );
		for( ptr = buf; *ptr && isspace(*ptr); ptr++ ) 
			;
		if( !(*ptr) )		/* null char */
			continue;	/* read next line */
		// printf( "%s(%d)\tptr=%s.\n", __FILE__, __LINE__, ptr );
		if( (sp->seq = atoi(ptr)) > 0 )
			break;
	}
	if( fgets( buf, sizeof(buf), fp ) == NULL ) 
		return -1 * __LINE__;

	// printf( "%s(%d)\tbuf=%s.\n", __FILE__, __LINE__, buf );
	rc = sscanf( buf, "%02d:%02d:%02d,%03d --> %02d:%02d:%02d,%03d",
		&sp->begin.hr, &sp->begin.min, &sp->begin.sec, &sp->begin.xs,
		&sp->end.hr, &sp->end.min, &sp->end.sec, &sp->end.xs );
	if( rc < 8 ) {
		printf( "%s(%d)\trc=%d,%s.\n", __FILE__, __LINE__, rc, buf);
		return -1 * __LINE__;
	}
#if 0
	printf( "%s(%d)\t%4d\t%02d:%02d:%02d,%03d --> %02d:%02d:%02d,%03d\n",
		 __FILE__, __LINE__,
		seq, hs, ms, ss, xs, he, me, se, xe );
#endif
	while( fgets( buf, sizeof(buf), fp ) != NULL ) {
		for( ptr = buf; *ptr && isspace(*ptr); ptr++ ) 
			;
		// printf( "%s", buf );
		if( !(*ptr) )	/* null line */
			break;
		if((ptr = strchr(buf, '\r'))!=NULL) {
			*ptr = '\n';
			*(ptr+1)='\0';
		}
		if( SRT_STRSIZ-strlen(sp->str) > strlen(buf)+1 )
			strcat(sp->str, buf);
	}
	return 0;
}

void SRT_add_time(SRT_time* to, SRT_time* fm, int carry)
{
	to->hr += fm->hr;
	to->min += fm->min;
	to->sec += fm->sec;
	to->xs += fm->xs;

	// printf( "carry=%d, xs=%d\n", carry, to->xs);
	to->xs += carry;
	if (to->xs < 0) {
		carry = (to->xs / 1000) - ((to->xs % 1000) ? 1 : 0);
		to->xs += (-1 * carry * 1000);
	} else {
		carry = to->xs / 1000;
		to->xs = to->xs % 1000;
	}

	to->sec += carry;
	if (to->sec < 0) {
		carry = (to->sec / 60) - ((to->sec % 60) ? 1 : 0);
		to->sec += (-1 * carry * 60);
	} else {
		carry = to->sec / 60;
		to->sec = to->sec % 60;
	}

	to->min += carry;
	if (to->min < 0) {
		carry = (to->min / 60) - ((to->min % 60) ? 1 : 0);
		to->min += (-1 * carry * 60);
	} else {
		carry = to->min / 60;
		to->min = to->min % 60;
	}

	to->hr += carry;
	if (to->hr < 0)
		to->hr = 0;
}

void SRT_add(SRT_buf* to, SRT_buf* fm, int ofs)
{
	to->seq += fm->seq;

	SRT_add_time(&(to->begin), &(fm->begin), ofs);
	SRT_add_time(&(to->end), &(fm->begin), ofs);
}

void SRT_expand(SRT_buf* buf, unsigned long mul, unsigned long div)
{
	unsigned long val;

	val = SRT_time_long( &(buf->begin) ) * mul / div;
	SRT_time_set( &(buf->begin), val );

	val = SRT_time_long( &(buf->end) ) * mul / div;
	SRT_time_set( &(buf->end), val );
}

void SRT_adjust(SRT_buf* buf, int msec)
{
	unsigned long val;

	val = SRT_time_long( &(buf->begin) ) + msec;
	SRT_time_set( &(buf->begin), val );

	val = SRT_time_long( &(buf->end) ) + msec;
	SRT_time_set( &(buf->end), val );
}

typedef struct SRT_data {
	struct SRT_data* next;
	SRT_buf buff;
} SRT_data;

SRT_data *srtFirst = NULL;

SRT_data* SRT_data_new(SRT_buf* sbp)
{
	SRT_data* sdp;

	sdp = malloc(sizeof(SRT_data));
	if (sdp != NULL) {
		sdp->next = NULL;
		memcpy(&sdp->buff, sbp, sizeof(SRT_buf));
	}
	return sdp;
}

SRT_data* SRT_data_add(SRT_buf* sbp)
{
	SRT_data *curr, *prev, *srtNew;
	unsigned long t1, t2;

	t1 = SRT_time_long(&(sbp->begin));
	// printf("2:%s.\n", sbp->str);

	for (prev=NULL, curr=srtFirst; curr!=NULL; prev=curr, curr=curr->next) {
		t2 = SRT_time_long(&(curr->buff.begin));
		if (t1 < t2) {
			break;	// to insert before curr
		} else if (t1 == t2) {
			// printf("1:%s.\n", curr->buff.str);
			strcat(curr->buff.str, sbp->str);
			return ;
		}
	}
	srtNew = SRT_data_new(sbp);
	if (srtNew != NULL) {
		if (prev == NULL) {	// replace srtFirst
			srtNew->next = srtFirst;
			srtFirst = srtNew;
		} else {
			srtNew->next = prev->next;
			prev->next = srtNew;
		}
	}
	return srtNew;

}

void SRT_data_dump(SRT_data *sdp)
{
	int i;
	for (i = 0; sdp != NULL; sdp = sdp->next) {
		sdp->buff.seq = i++;
		SRT_writeout(stdout, &sdp->buff);
	}
}

unsigned long time2ms(char *s)
{
	int rc, hr, min, sec, ms;
	unsigned long out;
	rc = sscanf(s, "%02d:%02d:%02d.%03d", &hr, &min, &sec, &ms);
	if (rc != 4)
		return 0L;
	out = hr; out *= 60;
	out += min; out *= 60;
	out += sec; out *= 1000;
	out += ms;
	return out;
}

unsigned long duration2ms(char *s)
{
	int rc, sec, ms;
	unsigned long out;
	rc = sscanf(s, "%d.%03d", &sec, &ms);
	if (rc != 2)
		return 0L;
	out = sec; out *= 1000;
	out += ms;
	return out;
}

int main( int argc, char *argv[] )
{
	FILE *fp, *outfp;
	SRT_buf sb;
	int rc, step, frame;
	char *outDir, fname[BUFSIZ];
	unsigned long current, start, end, srt_beg, srt_end;

	if (argc != 6) {
		fprintf( stderr, "%s srtfile start duration FPS outputDir\n",
			argv[0] );
		return EXIT_FAILURE;
	}
	outDir = argv[5];
	start = time2ms(argv[2]);
	end = start + duration2ms(argv[3]);
	step = 1000 / atoi(argv[4]);
	frame = 1;
	current = (start / step) * step;

	printf("f=%d, c=%lu, s=%lu, e=%lu, d=%d\n",
		frame, current, start, end, step);

	fp = fopen( argv[1], "r" );
	if( fp == NULL ) {
		fprintf( stderr, "%s(%d) cannot open %s.\n",
			__FILE__, __LINE__, argv[1] );
		return EXIT_FAILURE;
	}
	while (1) {
		SRT_reset(&sb);
		rc = SRT_readin(fp, &sb);
		if (rc < 0) {
			fprintf(stderr, "SRT_readin()=%d.\n", rc);
			break;
		}
		srt_beg = SRT_time_long(&sb.begin);
		srt_end = SRT_time_long(&sb.end);
		printf("%d, %lu, %lu\n", sb.seq, srt_beg, srt_end);
		if (srt_beg > end) {
			fprintf(stderr, "stop at %d, f=%d, c=%lu\n",
				sb.seq, frame, current);
			break;
		}
		while (current < srt_end) {
			if (current > srt_beg) {
				sprintf(fname, "%s/%d", outDir, frame);
				printf("%s, c=%lu, b=%lu, e=%lu, seq=%d, %s.\n",
					fname, current, srt_beg, srt_end,
					sb.seq, sb.str);
				outfp = fopen(fname, "w+");
				if (outfp) {
					fwrite(sb.str, 1, strlen(sb.str),
						outfp);
				}
				fclose(outfp);
			}
			frame++;
			current += step;
		}
	}
	fclose( fp );
	return EXIT_SUCCESS;
}
