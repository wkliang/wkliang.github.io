#!/usr/bin/env node

// https://github.com/zoubin/engineering/blob/master/docs/node-stream/basics/index.md
// https://github.com/substack/stream-handbook

let offset = 0;
let count = 0;
process.stdin.on('readable', function() {
	count++;
	var buf = process.stdin.read();
	if (!buf) return;
	for (; offset < buf.length; offset++) {
		if (buf[offset] == 0x0A) {
			console.dir(buf.slice(0, offset).toString());
			buf = buf.slice(offset+1);
			offset = 0;
			process.stdin.unshift(buf);
			return;
		}
	}
	process.stdin.unshift(buf);
});

process.on('exit', function() {
	console.error("\nread() called " + count + " times");
});
process.stdout.on("error", process.exit);
