#!/usr/bin/env node

const fs = require('fs');
const m3u8 = require('m3u8');
// var Promise = require('bluebird');
const streamBuffers = require('stream-buffers');

// var twitterdl = require('./twitter-dl/index.js');
// The following code was copied from the npm library twitter-dl.
// twitter-dl uses ISC license.
'use strict';

let _ = require('underscore');
let scrape = require('metatag-crawler');
let rest = require('restling');

// var Promise = require('bluebird');
// var streamBuffers = require('stream-buffers');

const downloader = function (url) {
  const download = require('download');
  return new Promise((resolve, reject) => {
    var context = {
      writeableStream: null
    };
    context.writeableStream = new streamBuffers.WritableStreamBuffer()

    download(url)
      .on('finish', function(response) {
      })
      .on('end', function(response) {
      })
      .on('data', function(progress) {
        context.writeableStream.write(progress);
      })
      .then(function() {
        context.writeableStream.end();
        resolve(context.writeableStream);
      })
      .catch(function(err) {
        reject(new Error(err));
      })
  });
}

function parse(url) {
  return new Promise((resolve, reject) => {
    scrape(url, (err, data) => {
      console.log(`videos: ${JSON.stringify(data)}`);
      rest.get(data.og.videos[0].url).then(function(result) {
	console.log(`url: ${url}\nvideos[0].url: ${data.og.videos[0].url}\nresult: ${result.data}`);
        let myRegexp = /data-config=\"(.*?)\"/g;
        let match = myRegexp.exec(result.data);
        let json = match[1].replace(/\&quot;/g, '"');
        let urlvid = JSON.parse(json).video_url;
        resolve(urlvid);
      }, function(error) {
        if (error.response) {
          reject(error.response);
        }
      });
    });
  });
}

var twitterdl = {
 download : function download(url) {
  return new Promise((resolve, reject) => {
    parse(url).then((result) => {
      downloader(result).then((stream) => {
        resolve(stream);
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    });
  });
}
}

// var ffmpeg = require('./ffmpeg.js');
const fluent_ffmpeg = require('fluent-ffmpeg');
// var Promise = require('bluebird');
// var streamBuffers = require('stream-buffers');
// var fs   = require('fs');

const ffmpeg = {
  convertToMp4Buffer: function(inputBuffer, duration) {
  return new Promise((resolve, reject) => {
    var stream = null;
    stream = new streamBuffers.WritableStreamBuffer();
    try {
      fluent_ffmpeg()
        .input(inputBuffer)
        .format('mp4')
        .duration(duration)
        .audioCodec('aac')
        .videoCodec('libx264')
        .outputOptions(['-bsf:a aac_adtstoasc', '-movflags frag_keyframe+empty_moov'])
        .output(stream)
        .on('end', () => {
          stream.end();
          resolve(stream);
        })
        .run();

    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
}
}

function parsem3u(writeableStream) {
  return new Promise((resolve, reject) => {
    var parser = m3u8.createStream();
    var readStream = new streamBuffers.ReadableStreamBuffer();
    readStream.put(writeableStream.getContents());
    readStream.stop();
    readStream.pipe(parser);

    parser.on('item', function(item) {
      item.set('uri', 'https://video.twimg.com' + item.get('uri'));
    });
    parser.on('m3u', function(m3u) {
      resolve(m3u);
    });
  });
}

function getUriFromm3u(m3u) {
  return m3u.items.StreamItem.slice(-1)[0].properties.uri;
}

// const tvdl = require('twitter-video-downloader')
const tvdl = function(tweetUrl) {
  return new Promise((resolve) => {
    context = {
      videoStream: null,
      downloadQueue: [],
      totalDuration: 0
    };

    context.videoStream = new streamBuffers.ReadableStreamBuffer();

    twitterdl.download(tweetUrl)
      .then((result) => {
        return Promise.all([parsem3u(result)]);
      })
      .then((result) => {
        var uri = getUriFromm3u(result[0]);
        return downloader(uri);
      })
      .then((result) => {
        return Promise.all([parsem3u(result)]);
      })
      .then ((result) => {
        result[0].items.PlaylistItem.forEach((item) => {
          context.totalDuration += item.properties.duration;
        })
        context.downloadQueue = result[0].items.PlaylistItem.map((item) => {
          return item.properties.uri;
        });
        return Promise.each(context.downloadQueue, (item) => {
          return downloader(item)
            .then((result) => {
              context.videoStream.put(result.getContents());
            });
          });
      })
      .then(() => {
        context.videoStream.stop();
        return Promise.all([ffmpeg.convertToMp4Buffer(context.videoStream, context.totalDuration)]);
      })
      .then((result) => {
        resolve(result[0]);
      });
  });
}

if (process.argv.length > 2) {
	tvdl(process.argv[2]).then(function(vs) {
		vs.pipe(fs.createWriteStream('zzzzzz.mp4'));
	});
}
