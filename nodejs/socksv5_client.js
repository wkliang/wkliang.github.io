#!/usr/bin/env node

// https://github.com/mscdex/socksv5

var socks = require('socksv5');

/* wkliang:20160911 cannot refer .onion hidden server */
var client = socks.connect({
	// host: '3g2upl4pq6kufc4m.onion',
	// host: 'ip4.ek21.com',
	host: '61.230.126.11',
	port: 8080,
	proxyHost: '127.0.0.1',
	proxyPort: 9150,
	auths: [ socks.auth.None() ]
}, function(socket) {
	console.log('>> connection successful');

	// socket.write('GET / HTTP/1.0\r\n\r\n');
	// socket.write('GET /age_15/?ot=1 HTTP/1.0\r\n');
	// socket.write('GET /msg_new?roomid=age_15&cserial:eXEzjzjwun2C&msgno=1495000&r=100 HTTP/1.0\r\n');
	socket.write('POST /login?r=0.9876543210987654 HTTP/1.0\r\n');
	socket.write('Host: ip4.ek21.com\r\n');
//	socket.write('Accept-Encoding: gzip, deflate\r\n');
//	socket.write('Accept-Languageen,zh;q=0.5\r\n');
	socket.write('Connection: keep-alive\r\n');
	socket.write('Cookie: pk=2N95\r\n');
	socket.write('Referer: http://ip4.ek21.com/age_15/?ot=1\r\n');
//	socket.write('User-Agent: Mozilla/5.0 (windows;) webkit/20160101 icebird0.0\r\n');
	socket.write('Content-Type: application/x-www-form-urlencoded\r\n');
	socket.write('Content-Length: 52\r\n\r\n');
	socket.write('roomid=age_15&nickname=Natalia&password=&gender=girl');

	socket.pipe(process.stdout);
});

