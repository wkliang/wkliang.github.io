#!/usr/bin/env node

// https://medium.com/@rayshih771012/functional-computational-thinking-what-is-a-monad-2adea91154e

const fs = require("fs");

<!-- CPS = Continuation-passing style

const readFileCPS = function(path, cb) {
	fs.readFile(
		path.trim(),
		function(err, data) {
			console.log("%s => %s", path.trim(), data.toString());
			cb(data.toString());
		}
	);
};

const composeCPS = function(g, f) {
	return function(x, cb) {
		g(x, function(y) {
			f(y, function(z) {
				cb(z);
			});
		});
	};
};

const readFileContentCPS = composeCPS(readFileCPS, readFileCPS);
// readFileContentCPS("./z", function(res) { console.log("result: " + res); });

// function createExecObj(exec) { return ({ "exec" : exec }); }
const createExecObj = exec => ({exec}) // <!-- JS6 feature?

createExecObj(() => console.log("exec method called")).exec();

composeEXEC = (g, f) => {
	return x => {
		return {
			exec: cb => {
				g(x).exec(y => {
					f(y).exec(cb)
				})
			}
			
		}
	}
}

composeEXEC2 = (g, f) => x => createExecObj(cb => g(x).exec(y => f(y).exec(cb)))

const readFileExec = path => createExecObj(cb => readFileCPS(path, cb))

const readFileContentExec = composeEXEC2(readFileExec, readFileExec)
// readFileContentExec("./z").exec(result => console.log(result))

const createExecBindObj = exec => ({
	exec,
	bind(f) {
		return createExecBindObj(cb => {
			this.exec(y => f(y).exec(cb))
		})
	}
})

const readFileExecBind = path => createExecBindObj(cb => readFileCPS(path, cb))
//*
readFileExecBind("./z")
	.bind(readFileExecBind)
	.bind(readFileExecBind)
	.exec(result => console.log("result: %d", result.length))
//*/
