#!/usr/bin/env node

// https://github.com/mysqljs/mysql
// 	Pooling connections
// Node.js in Action #102
// 	Using MySQL to build a work-traking APP

var mysql = require('mysql');
var db = mysql.createPool({
	connectionLimit : 10,
	host: 'localhost',
	database: 'test',
//	debug: true,
//	user: 'me',
//	password: 'secret'
});

// Pool event
db.on('acquire', function(connection) { // is acquired from the pool
	console.log('Connection %d acquired', connection.threadId);
});

db.on('connection', function(connection) { // new one is made
	connection.query('SET SESSION auto_increment_increment=1');
});

db.on('enqueue', function() { // a callback has been queued to wait for an available connection
	console.log('Waiting for available connection slot');
});

db.on('release', function(connection) { // is released back to the pool
	console.log('Connection %d released', connection.threadId);
});

var work = (function() {
	let exports = {};
	let qs = require('querystring');

	exports.sendHtml = function(res, html) {
		res.setHeader('Content-Type', 'text/html');
		res.setHeader('Content-Length', Buffer.byteLength(html));
		res.end(html);
	};

	exports.parseReceivedData = function(req, cb) {
		var body = '';
		req.setEncoding('utf8');
		req.on('data', (chunk) => body += chunk);
		req.on('end', function() {
			let data = qs.parse(body);
			console.dir(data);
			cb(data);
		});
	};

	exports.actionForm = function(id, path, label) {
		return '<form method="POST" action="' + path + '">'
			+ '<input type="hidden" name="id" value="' + id + '"/>'
			+ '<input type="submit" value="' + label + '"/>'
			+ '</form>';
	};

	exports.add = function(db, req, res) {
		exports.parseReceivedData(req, function(work) {
			db.query( "INSERT INTO work (hours, date, description) "
				+ "VALUES (?,?,?) ", [work.hours, work.date, work.description],
				function(err) {
					if (err) throw err;
					exports.show(db, res);
				});
		});
	};

	exports.delete = function(db, req, res) {
		exports.parseReceivedData(req, function(work) {
			db.query( "DELETE FROM work WHERE id=?", [work.id],
				function(err) {
					if (err) throw err;
					exports.show(db, res);
				});
		});
	};

	exports.archive = function(db, req, res) {
		exports.parseReceivedData(req, function(work) {
			db.query( "UPDATE work SET archived=1 WHERE id=?", [work.id],
				function(err) {
					if (err) throw err;
					exports.show(db, res);
				});
		});
	};

	exports.show = function(db, res, showArchived) {
		let query = "SELECT * FROM work WHERE archived=? ORDER BY date DESC";
		let archiveFlag = (showArchived) ? 1 : 0;
		db.query(query, [archiveFlag],
			function(err, rows) {
				if (err) throw err;
				let html = '<!DOCTYPE html><html><meta charset="utf-8"><body>';
				html += archiveFlag ? '' :
					 '<a href="/archived">Archived Work</a><br/>';
				html += exports.workHitlistHtml(rows);
				html += exports.workFormHtml();
				html += '</body></html>';
				exports.sendHtml(res, html);
			});
		
	};

	exports.showArchived = function(db, res) {
		exports.show(db, res, true);
	};

	exports.workHitlistHtml = function(rows) {
		let html = '<table>';
		for (let i in rows) {
			html += '<tr>';
			html += '<td>' + rows[i].date + '</td>';
			html += '<td>' + rows[i].hours + '</td>';
			html += '<td>' + rows[i].description + '</td>';
			if (!rows[i].archived) {
				html += '<td>' + exports.workArchiveForm(rows[i].id) + '</td>';
			}
			html += '</tr>';
		}
		html += '</table>';
		return html;
	};

	exports.workFormHtml = function() {
		return '<form method="POST" action="/">'
			+ '<p>Date (YYYY-MD-DD):<br/><input name="date" type="text"></p>'
			+ '<p>Hours worked:<br/><input name="hours" type="text"></p>'
			+ '<p>Description:<br/><textarea name="description"></textarea></p>'
			+ '<input type="submit" value="Add" />'
			+ '</form>';
	};

	exports.workArchiveForm = (id) => exports.actionForm(id, '/archive', 'Archive');
	exports.workDeleteForm = (id) => exports.actionForm(id, '/delete', 'Delete');

	return exports;
}());

var http = require('http');
var server = http.createServer(function(req, res) {
	switch (req.method) {
	case 'POST':
		switch (req.url) {
		case '/':	work.add(db, req, res); break;
		case '/archive':work.archive(db, req, res); break;
		case '/delete':	work.delete(db, req, res); break;
		}
		break;
	case 'GET':
		switch (req.url) {
		case '/': work.show(db, res);	break;
		case '/archived': work.showArchived(db, res);	break;
		}
		break;
	}
});

db.getConnection(function(err, connection) {
	if (err) throw err;
	connection.query( "CREATE TABLE IF NOT EXISTS work ("
		+ "id INT(10) NOT NULL PRIMARY KEY AUTO_INCREMENT, "
		+ "hours DECIMAL(5,2) DEFAULT 0, "
		+ "date DATE, "
		+ "archived INT(1) DEFAULT 0, "
		+ "description LONGTEXT)"
		+ "CHARACTER SET 'utf8'",
		function(err) {
			connection.release();
			if (err) throw err;
			console.log('Server stated...');
			server.listen(8080, '127.0.0.1');
		}
	)
});
