//
// https://github.com/mongodb/node-mongodb-native
// The official MongoDB driver for Node.js.
// Provides a high-level API on top of mongodb-core
// that is meant for end users.
//
var MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

let dropDocuments = (obj) => new Promise((resolve, reject) =>
	obj.collection.drop(function(err, result) {
		try {
			console.log("drop collection:", true===result, err);
			resolve(obj);
		} catch (e) {
			reject(e);
		}
	}))

let insertDocuments = (obj, values) => new Promise((resolve, reject) =>
	obj.collection.insertMany(values, function(err, result) {
		try {
			assert.equal(err, null);
			assert.equal(3, result.result.n);
			assert.equal(3, result.ops.length);
			console.log("Inserted %d documents into collection:", values.length, result);
			resolve(obj);
		} catch (e) {
			reject(e);
		}
	}))

let updateDocument = (obj, val1, val2) => new Promise((resolve, reject) =>
	obj.collection.updateOne(val1, val2, function(err, result) {
		try {
			assert.equal(err, null);
			assert(1, result.result.n);
			console.log("Updated the document with the field a equal to 2");
			resolve(obj);
		} catch (e) {
			reject(e);
		}
	}))

let deleteDocument = (obj, val) => new Promise((resolve, reject) =>
	obj.collection.deleteOne(val, function(err, result) {
		try {
			assert.equal(err, null);
			assert.equal(1, result.result.n);
			console.log("Removed the document with:", val);
			resolve(obj);
		} catch (e) {
			reject(e);
		}
	}))

// Node.js in Action
// Listing 6.8 A configurable logger middleware component for Connect
let findDocuments = (obj, val, fmt) => new Promise((resolve, reject) =>
	obj.collection.find(val).toArray(function(err, docs) {
		try {
			assert.equal(err, null);
			assert.equal(2, docs.length);
			console.log("Found the following records:");
			docs.forEach((doc, i) => {
				console.log("%d => %s", i,
					fmt.replace(/:(\w+)/g, (match, prop) =>
						prop + ":" + doc[prop] + "|" ));
			});
			resolve(obj);
		} catch (e) {
			reject(e);
		}
	}))

let connectDB = (url) => new Promise((resolve, reject) =>
	 MongoClient.connect(url, function(err, db) {
		try {
			assert.equal(null, err);
			console.log("Connected correctly to %s", url);
			resolve({db: db});
		} catch (e) {
			 reject(e);
		}
	}))

connectDB("mongodb://localhost/test")
.then(value => ({db: value.db, collection: value.db.collection('documents')}))
.then(obj => dropDocuments(obj))
.then(obj => insertDocuments(obj, [{a: 1}, {a: 2}, {a: 3}]))
.then(obj => updateDocument(obj, {a: 2}, {$set: {b: 1}}))
.then(obj => deleteDocument(obj, {a: 3}))
.then(obj => findDocuments(obj, {}, ":a :_id"))
.then(value => {
	console.log("db.close()");
	value.db.close();
}).catch(reason => {
	console.error("!!!ERROR!!!", reason);
});

process.on('uncaughtException', function(err) {
	console.error("!!!uncaughtException!!!", err);
	process.exit();
});

