#!/usr/bin/env node

// http://stackoverflow.com/questions/6657216/why-doesnt-node-js-have-a-native-dom
// https://github.com/tmpvar/jsdom

var jsdom = require('jsdom');
var fs = require('fs');
var esun = fs.readFileSync("./ESUN_Estatement_10410.html", "utf-8");

jsdom.env(esun, function(err, window) {
		// var $ = window.$;
		// console.log("ESUN");
		// console.log(window.innerWidth);
		// console.log(window.document.getElementsByClassName("body"));
		console.log(window.document.documentElement.outerHTML);
	});

// jsdom.defaultview;

