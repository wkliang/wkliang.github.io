#!/usr/bin/env node

// http://www.tutorialspoint.com/nodejs/nodejs_scaling_application.htm

const fs = require("fs");
const child_process = require("child_process");

function try_exec() {
	for (var i = 0; i < 3; ++i) {
		var workerProcess = child_process.exec("node try_support.js " + i,
			function(error, stdout, stderr) {
				if (error) {
					console.log("Error stack: " + error.stack);
					console.log("Error code: " + error.code);
					console.log("Signal recieved: " + error.signal);
				}
				console.log("stdout: " + stdout);
				console.log("stderr: " + stderr);
			});
		workerProcess.on("exit",
			function(code) {
				console.log("Child process exited with exit code " + code);
			});
	}
}

function try_spawn()
{
	for (var i = 0; i < 3; ++i) {
		var workerProcess = child_process.spawn("node", ["try_support.js", i]);

		workerProcess.stdout.on("data", function(data) {
			console.log("stdout: " + data);
		});

		workerProcess.stderr.on("data", function(data) {
			// wkliang:20160618, not happen
			console.log("stderr: " + data);
		});

		workerProcess.on("colse", function(code) {
			// wkliang:20160618, not happen
			console.log("child process closed with code: " + code);
		});

		workerProcess.on("exit",
			function(code) {
				console.log("Child process exited with exit code " + code);
			});
	}
}

function try_fork()
{
	for (var i = 0; i < 3; ++i) {
		var workerProcess = child_process.fork("try_support.js", [i]);

/*
		workerProcess.stdout.on("data", function(data) {
			console.log("stdout: " + data);
		});

		workerProcess.stderr.on("data", function(data) {
			// wkliang:20160618, not happen
			console.log("stderr: " + data);
		});
*/
		workerProcess.on("colse", function(code) {
			// wkliang:20160618, not happen
			console.log("child process closed with code: " + code);
		});

		workerProcess.on("exit",
			function(code) {
				console.log("Child process exited with exit code " + code);
			});
	}
}

try_fork();
