#!/usr/bin/env node

// https://github.com/kriskowal/q
// https://github.com/alsotang/node-lessons

var Q = require("q");
var defer = Q.defer();

var outputPromise = defer.promise.then(
	function(success) {
		console.log(success);
		return success;
	},
	function(error) {
		console.log(error);
		// return error;
		throw new Error(error);
	},
	function(progress) {
		console.log(progress);
		return progress;
	});

outputPromise.then(
	function(fulfilled) {
		console.log("outputPromise fufilled: " + fulfilled);
	},
	function (rejected) {
		console.log("outputPromise rejected: " + rejected);
	},
	function (inProgress) {
		console.log("outputPromise inProgress: " + inProgress);
	});

defer.notify("in progress");

// 没有输出。promise的状态只能改变一次
defer.reject("reject");
defer.resolve("resolve");

(function(timeout) {
	var defer = Q.defer();
	setTimeout(function() {
		defer.resolve("timeout=" + timeout);
	}, timeout);
	return defer.promise;
})(1000).then(function(fufilled) {
		console.log("fufilled: ", fufilled, new Date());
		// return fufilled + "++";
		var defer = Q.defer();
		setTimeout(function() {
			defer.resolve(fufilled + "++" + new Date());
		}, 2000);
		return defer.promise;
	}).then(function(message) {
		console.log("message: ", message);
		return new Date();
	}).then(function(timetag) {
		console.log("timetag: ", timetag);
	});
