#!/usr/bin/env node


// Brian W. Kernighan
//
// 9.8 错误检测和校正
//
// IBM 的 Peter Luhn 于 1954 年设计的一个 checksum 算法,
// 来检测在实际操作中最常见的两种错误:单个数字错误、由于两个数字写错位置
// 而引起的大多数换位错误。这个算法很简单:
// 从最右一位数开始向左,把每个数字交替乘 1 或 2,如果结果大于 9 就减 9。
// 如果把各位数的计算结果加起来,最后得到的总和能被 10 整除,那这个卡号
// 就是有效卡号。你可以用这个方法测试一下自己的银行卡,或者某些银行广告中出
// 现的卡号,如“4417 1234 5678 9112”。由于这个卡号计算的结果是 69,
// 所以不是真卡号;如果把它的最后一个数字换成 3,那就是有效卡号了。
//
// https://en.wikipedia.org/wiki/Luhn_algorithm
//
// https://www.geeksforgeeks.org/luhn-algorithm/
//
// https://zellwk.com/blog/callbacks/
// https://zellwk.com/blog/js-promises/
// https://zellwk.com/blog/converting-callbacks-to-promises/


function checksum(s) {
	let i = s.length;
	let sum = 0;
	let odd = true;
	while (--i >= 0) {
		if (s[i] < '0' || s[i] > '9')
			throw "invalid string";

		let v = s[i] - '0';
		if (!odd) v *= 2;
		odd = !odd;

		sum += Math.floor(v / 10) + (v % 10);
		console.log(`${i} : ${s[i]} ${v} ${sum}`);
	}
	return sum % 10 ? false : true;
}

console.log(`checksum :${checksum("79927398713")}`)
console.log(`checksum :${checksum("4417123456789112")}`)
console.log(`checksum :${checksum("4417123456789113")}`)
