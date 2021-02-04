#!/usr/bin/env node

var debug = true;
function debugPrint() {
        if (debug)
            console.log.apply(console, arguments);
}

var x = "Foo";
var aFunc = function() {
	debugPrint("defined globally");
}

this.x = "Bar";
this.aFunc = function() {
	debugPrint("defined inside global this");
}

global.x = "GlobalX";
global.aFunc = function() {
	debugPrint("defined in global context");
}

function inspect(flag) {
	debugPrint("x: ", x);
	aFunc();
	if (!this || flag) {
		debugPrint("this: ", this);
	} else {
		debugPrint("this.x: ", this.x);
		this.aFunc();
	}
}

var theFunction = (function(fun) {
	var x = "Hidden";
	var theObject = {
		x: "Hello world",
		aFunc: function() {
			debugPrint("defined inside theObject");
		}
	};
	return () => fun.apply(theObject);
})(inspect);

console.log("theFunction() -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
theFunction();
console.log("inspect.apply(this) -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
inspect.apply(this);
console.log("inspect() -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
inspect();
console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
console.dir(this);
console.dir(global.this);
