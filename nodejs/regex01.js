#!/usr/bin/env node

// wkliang:20181025
// https://juejin.im/post/5bcd3703518825778c497908

let regex = /^(\d{4})\D(\d{2})\D(\d{2})$/;
let str = "2018-10-25";

console.log("str.match:", str.match(regex));
console.log("regex.exec:", regex.exec(str));
console.log("with g opt:", /^(\d{4})\D(\d{2})\D(\d{2})$/g.exec(str));

console.log("RegExp:", RegExp.$1, RegExp.$2, RegExp.$3);

console.log("regex.test:", regex.test(str));
console.log("RegExp:", RegExp.$1, RegExp.$2, RegExp.$3);

console.log("search:", str.search(regex));
console.log("RegExp:", RegExp.$1, RegExp.$2, RegExp.$3);

/*
let date = [];
console.log(str.replace(regex, (match, year, month, day) => {
	console.log("match:", match);
	date.push(year, month, day);
	return "gotcha";
}));
*/

let date = str.replace(regex, (match, year, month, day) => {
	console.log("match:", match);
	let d = [];
	d.push(year, month, day);
	return d;
});
console.log("date:", date);

date = str.replace(/-/g, "/");
console.log("date:", date);

date = str.replace(regex, "$1:$2:$3");
console.log("date:", date);
