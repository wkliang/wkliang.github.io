#!/usr/bin/env node

// http://fred-zone.blogspot.com/2017/01/javascript-mapreduce.html


var data = {
	'Fred': 1,
	'Leon': 2,
	'Wesley': 3,
	'Chuck': 4,
	'Denny': 5
};

// 使用 Object.keys() 取得包含所有 key 的陣列
var result = Object.keys(data).reduce(function(prev, name) {
		// 利用 key 取得原始物件的值，然後加總
		return data[name] + prev;
	}, 0);
console.log(result);
