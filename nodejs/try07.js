#!/usr/bin/env node

// https://cnodejs.org/topic/584a207a3ebad99b336b1ede
// 少年，不要滥用箭头函数啊

function foo() {
	let that = this;

	this.arrow = () => {
		console.log(this.name);
	};
	this.simulationArrow = () => {
		console.log(that.name);
	}
	this.common = function() {
		console.log(this.name);
	};
}

var f = new foo();
f.name = "foo";
let name = "global";

f.arrow();
f.simulationArrow();
f.common();

let arrow = f.arrow;
let simulationArrow = f.simulationArrow;
let common = f.common;

arrow();
simulationArrow();
common();
