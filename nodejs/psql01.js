#!/usr/bin/env node

// https://github.com/brianc/node-postgres
// https://github.com/brianc/node-pg-native

// var pg = require('pg').native;
// var client = new pg.Client("postgres://wkliang@127.0.0.1/wkliang");
var Client = require('pg-native');
var client = new Client();

client.connect(function(err) {
	if (err) {
		console.error("connect Error!", err.message, err.stack);
		throw err;
	}
	client.query('SELECT $1::text AS name', ["brainc"], function(err, result) {
		if (err) {
			console.error(err);
			throw err;
		}

		// console.log(result.rows[0]);
		console.dir(result);

		client.end(function(err) {
			if (err)
				throw err;

			console.log("end of work!");
		});
	});
});

client.connectSync();

var rows = client.querySync('SELECT NOW() AS the_date');
console.log(rows[0].the_date);

client.prepareSync('get_twitter', 'SELECT $1::text AS twitter_handle', 1);

rows = client.executeSync('get_twitter', ['@briancarlson']);
console.log(rows[0].twitter_handle);

rows = client.executeSync('get_twitter', ['@realcarrotfacts']);
console.log(rows[0].twitter_handle);
console.dir(rows);

