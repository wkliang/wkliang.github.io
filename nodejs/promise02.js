#!/usr/bin/env node

/*
 * https://developers.google.com/web/fundamentals/getting-started/primers/promises
 *
 * - A promise can only succeed or fail once. It cannot succeed or fail twice,
 *   neither can it switch from success to failure or vice versa
 * 
 * - If a promise has succeeded or failed and you later add a success/failure callback,
 *   the correct callback will be called, even though the event took place earlier.
 */
let xxx = new Promise((resolve,reject) => {
		resolve(new Date());
	});

let counter = 0;
let timer = setInterval(() => {
		if (counter < 10)
			xxx.then(
				(value) => console.log(new Date(), "#1 success:", value),
				(reason) => console.log(new Date(), "#1 failure:", reason)
			);
		else if (counter < 20)
			xxx = xxx.then(
				(value) => {
					console.log(new Date, "#2 success:", value);
					return counter;
				},
				(reason) => console.log(new Date(), "#2 failure:", reason)
			);
		else
			clearInterval(timer);
		counter++;
	}, 1000);
