#!/usr/bin/env node

// https://wcc723.github.io/javascript/2017/12/29/javascript-proimse/

let runPromise = (someone) => {
	// let ran = parseInt(Math.random() * 2);
	let ran = Math.floor(Math.random() * 10);
	console.log(`${someone} start running`);
	return new Promise((resolve, reject) => {
		if (ran) {
			setTimeout(function() {
				resolve(`${someone} fullfilled in ${ran} seconds`);
			}, ran * 1000);
		} else {
			reject(new Error(`${someone} fail! rejected!`));
		}
	});
};

/*
runPromise('MING').then((data) => {
	console.log(data);
}).catch((err) => {
	console.log(err);
});
*/

// Promise.{race,all}
/*
Promise.all([runPromise('Peter Parker'), runPromise('Aunt May'), runPromise('Gwen Stacy')])
.then(data => {
	console.log('race', data);
})
.catch(err => {
	console.log(err);
});
*/

(async function() {
let single = await runPromise('Tony Stark');
let race = await Promise.race([runPromise('Peter Parker'), runPromise('Aunt May'), runPromise('Gwen Stacy')]);
	return `${single}, ${race}`;
})()
.then(msg => {
	console.log('msg::', msg);
})
.catch(err => {
	console.log('err::', err);
});
