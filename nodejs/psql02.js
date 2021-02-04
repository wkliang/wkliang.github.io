#!/usr/bin/env node

// https://github.com/brianc/node-postgres

var pg = require('pg').native;

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
	user: 'wkliang',	// env var: PGUSER: "foo"
	database: 'wkliang',	// env var: PGDATABASE: "my_db"
//	password: "",		// env var: PGPASSWORD: "secret"
	host: "localhost",	// Server hosting the progres database
	port: 5432,		// env var: PGPORT
	max: 10,		// max number of clients in the pool
	idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

// this initializes a connection pool
// it will keep idle connections open for 30 seconds
// and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to pool
pool.connect(function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}
	client.query('SELECT $1::int AS number', ['32767'], function(err, result) {
		// call done(err) to release the client back to the pool or
		// destroy it if there is an error
		done(err);

		if (err) {
			console.error('error running query', err);
		}
		console.log(result.rows[0].number);
	});
});

pool.on('error', function(err, client) {
	// if an error is encountered by a client while it sits idle in the pool
	console.error('idle client error', err.message, err.stack);
});
