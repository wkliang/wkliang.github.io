#!/usr/bin/env node

// https://nodejs.org/api/vm.html

'use strict';

const vm = require('vm');

const httpCode = `((RRR) => {
	RRR('http').createServer(request, response) => {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end('Hello world\n');
	}).listen(8124);
	console.log('Server running at http://127.0.0.1:8124/');
})`;

vm.runInThisContext(httpCode)(require);
