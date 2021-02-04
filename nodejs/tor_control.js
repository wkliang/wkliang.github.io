#!/usr/bin/env node

// https://gitweb.torproject.org/torspec.git/tree/control-spec.txt
// http://www.thesprawl.org/research/tor-control-protocol/
// https://gist.github.com/estliberitas/4448496

/**
 ** Created with IntelliJ IDEA.
 ** User: Alexander <estliberitas> Makarenko
 ** Date: 04.01.13
 ** Time: 3:25
 **/
'use strict';

var fs = require('fs')
  , net = require('net')
  , q = require('q')
  , util = require('util')
//, cookiePath = process.argv[2] || '/var/run/tor/control.authcookie'
  , cookiePath = process.argv[2] || process.env.HOME + '/.local/share/torbrowser/tbb/x86_64/tor-browser_en-US/Browser/TorBrowser/Data/Tor/control_auth_cookie'
  , cookie = fs.readFileSync(cookiePath).toString('hex')
  , controlPort = 9151;

console.log("cookiePath %s", cookiePath);
console.log("cookie %s", cookie);
// process.exit();

/**
 ** Request tor get new identity, i.e. reset circuit
 **
 ** @param {String} host
 **    Hostname of Tor control service
 ** @param {String|Number} port
 **    Tor control port
 ** @param {String} [auth]
 **    Auth cookie (optional)
 ** @param {Function} callback
 **    Callback taking result (err)
 **/
function new_identity(host, port, auth, callback) {
  if (typeof auth === 'function') {
    callback = auth;
    auth = null;
  }

  var sock = new net.Socket({ allowHalfOpen: false });
  connect(sock, port, host)
    .then(function() {
      return write(sock, util.format('AUTHENTICATE %s', auth));
    })
    .then(function() {
      return write(sock, "getconf controlPort");
    })
    .then(function() {
      return write(sock, "getinfo events/names");
    })
    .then(function() {
      return write(sock, "getinfo circuit-status");
    })
    .then(function() {
      return write(sock, "getinfo stream-status");
    })
    .then(function() {
      return write(sock, "getinfo info/names");
    })
    .then(function() {
      return write(sock, 'signal NEWNYM');
    })
    .then(function() {
      sock.destroy();
      callback();
    })
    .fail(function(err) {
      sock.destroy();
      callback(err);
    });
}


/**
 ** Write data to socket in promise-style
 **
 ** @param {net.Socket} sock
 **    Socket object
 ** @param {String} cmd
 **    Command to execute
 ** @return {promise}
 **    Promise object
 **/
function write(sock, cmd) {
  var deferred = q.defer();
  if (!sock.writable) {
    process.nextTick(function() {
      deferred.reject(new Error('Socket is not writable'));
    });
    return deferred.promise;
  }

  sock.removeAllListeners('error');
  sock.removeAllListeners('data');

  sock.once('data', function(data) {
    var res = data.toString().replace(/[\r\n]/g, '')
      , tokens = res.split(' ')
      , code = parseInt(tokens[0]);

    console.log("sock rx: %s", data);

    if (code !== 250) {
      deferred.reject(new Error(res));
    } else {
      deferred.resolve();
    }
  });

  sock.once('err', deferred.reject);
  sock.write(cmd + '\r\n');
  console.log("sock tx: %s", cmd);
  return deferred.promise;
}


/**
 ** Connect to Tor control service in promise-style
 **
 ** @param {net.Socket} sock
 **    Socket object
 ** @param {String|Number} port
 **    Tor control port
 ** @param host
 **    Tor control host
 ** @return {promise}
 **    Promise object
 **/
function connect(sock, port, host) {
  var deferred = q.defer();
  sock.once('connect', deferred.resolve);
  sock.once('error', deferred.reject);
  sock.connect(port, host);
  return deferred.promise;
}


new_identity('127.0.0.1', controlPort, cookie, function(err) {
  if (err) {
    console.error(err);
  } else {
    console.log('Finished');
  }
});
