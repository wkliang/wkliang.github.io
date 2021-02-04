#!/usr/bin/env node

// https://mp.weixin.qq.com/s?__biz=MjM5ODc5ODgyMw==&mid=402893277&idx=1&sn=11efef355db161371f7a431e90394f99#rd

function makePromise(val) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, (Math.random() * 5000).toFixed(0));
	}).then(() => val);
}

console.log([1,2,3,4,5].reduce((m, c) => { m.push(c); return m}, []));

[1,2,3,4,5].reduce(function(seq, curr) {
		return seq.then(() => makePromise(curr))
			.then((val) => console.log(val));
	}, Promise.resolve());

// 20200614 
// the reduce function, which is the most versatile collection function
// as it can emulate all the other ones.
// https://advancedweb.hu/how-to-use-async-functions-with-array-reduce-in-javascript/

(async () => {
	const startTime = new Date().getTime();
	const sleep = (n) => new Promise((res) => setTimeout(res, n));
	const arr = [1, 2, 3];
	const asyncRes = await arr.reduce(async (memo, e) => {
		console.log(`before ${memo} ${e}`);
		await memo;
		// await sleep(10);
		console.log(`after ${memo} ${e}`);
		return (await memo) + e;
	}, 0);

	console.log(`asyncRec: ${asyncRes}, ${new Date().getTime() - startTime} ms`);
})(); // 6
