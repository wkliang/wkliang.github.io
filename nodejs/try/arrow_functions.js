#!/usr/bin/env node

// "restrict"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// https://hacks.mozilla.org/category/es6-in-depth/page/2/
// https://nodejs.org/en/docs/es6/

var a = ["Hydrogen", "Helium", "Lithium", "Berylium"];

var a2 = a.map(function(s) { return s.length; });
console.log("a2: " + a2);


var a3 = a.map(s => s.length);
console.log("a3: " + a3);

console.log("0 == null : " + (0 == null));
