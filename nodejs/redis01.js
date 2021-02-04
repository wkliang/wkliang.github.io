#!/usr/bin/env node

// http://try.redis.io/
//
// https://github.com/NodeRedis/node_redis
//
// http://stackoverflow.com/questions/6004915/how-do-i-move-a-redis-database-from-one-server-to-another
//
let redis = require('redis'),
    r_cli = redis.createClient();

r_cli.on('error', function(err) {
	console.error("Error " + err);
});

r_cli.set('variable_string_key', 'variable_string_value', redis.print);
r_cli.hkeys('user:1000', function(err, replies) {
	console.log(replies.length + ' replies:');
	replies.forEach(function(reply, i) {
		// console.log('\t' + i + ':' + reply);
		r_cli.hget('user:1000', reply, function(err, value) {
			console.log('\t' + i + ':' + reply + ':' + value);
		});
	});
});

r_cli.keys('sess:*', function(err, replies) {
	console.log(replies.length + ' replies:');
	replies.forEach(function(reply, i) {
		// console.log("i: ", i, " reply: ", reply);
		r_cli.get(reply, function(err, value) {
			if (err) console.error(err)
			else console.log(reply, " = ", value);
		});
	});
});
// r_cli.quit();
