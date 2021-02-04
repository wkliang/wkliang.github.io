#!/usr/bin/env node

// http://www.cc.ntu.edu.tw/chinese/epaper/0034/20150920_3409.html
// 利用 NPM 快速建置 Node.js 網路應用框架

var mongoose = require('mongoose');

// test is a database of mongoDB
mongoose.connect("mongodb://localhost/test");

// Student is a collection of mongoDB
var Student = mongoose.model("Student", {
	name: String,
	score: Number
});

var insert = new Student({name: "Apple", score: 60});
insert.save(function(err) {
	if (err) {
		console.err("Failed");
		return;
	}
	console.log("Saved");
});

insert = new Student();
insert.name = "banana";
insert.score = 80;
insert.save();
console.log("Saved:", insert);

function printResult(err, students) {
	for (var index in students) {
		var stu = students[index];
		console.log("name:", stu.name);
	}
}

console.log("print all result");
Student.find(printResult);

console.log("print specific name");
Student.find({name: 'apple'}, printResult);

console.log("print limited score");
Student.find({score: {$gte: 60}}, printResult);


