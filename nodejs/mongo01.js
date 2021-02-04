//
// https://github.com/mongodb/node-mongodb-native
// The official MongoDB driver for Node.js.
// Provides a high-level API on top of mongodb-core
// that is meant for end users.
//
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

var insertDocuments = function(db, callback) {
	var collection = db.collection('documents');
	collection.insertMany([
		{a: 1}, {a: 2}, {a: 3}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the `documents` collection");
		callback(result);
	});
};

var updateDocument = function(db, callback) {
	var collection = db.collection('documents');
	collection.updateOne({a: 2}, {$set: {b: 1}},
		function(err, result) {
			assert.equal(err, null);
			assert(1, result.result.n);
			console.log("Updated the document with the field a equal to 2");
			callback(result);
		});
};

var deleteDocument = function(db, callback) {
	var collection = db.collection('documents');
	collection.deleteOne({a: 3},
		function(err, result) {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("Removed the document with the field a equal to 3");
			callback(result);
		})
	
};

var findDocuments = function(db, callback) {
	var collection = db.collection('documents');
	collection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		assert.equal(2, docs.length);
		console.log("Found the following records");
		console.dir(docs);
		callback(docs);
	});
};

var url = 'mongodb://localhost/test';
MongoClient.connect(url, function(err, db) {
	assert.equal(null, err);
	console.log("Connected correctly to server");

/*
	var collection = db.collection('documents');
	collection.drop(function(err, result) {
		console.error("Err:", err);
		console.log("Result:", result);
	});
*/
	try {
		insertDocuments(db, function() {
			updateDocument(db, function() {
				deleteDocument(db, function() {
					findDocuments(db, function() {
						db.close();
					});
				});
			});
		});
	} catch (err) { // wkliang:20170425: can NOT catch async exception
		console.error("!!!ERROR!!!", err);
	}

	process.on('uncaughtException', function(err) {
		console.error("!!!uncaughtException!!!", err);
		// console.log(JSON.stringify(err));
		process.exit();
	});
});

