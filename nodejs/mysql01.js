#!/usr/bin/env node

// https://github.com/mysqljs/mysql

var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost',
	database: 'test',
//	user: 'me',
//	password: 'secret'
});
///*
connection.connect(function(err) {
	if (err) {
		console.lerror('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});
// */
// However, a connection can also be implicitly established by invoking a query

connection.query('SELECT 1+1 AS solution', function(error, results, fields) {
	if (error) throw error;
	console.log("results: ", results);
	console.log("fields: ", fields);
	console.log('The solution is: ', results[0].solution);
});
connection.end();
