#!/usr/bin/env node

// https://github.com/petkaantonov/bluebird/issues/581
// https://stackoverflow.com/questions/37096311/expressjs-nodejs-promises-return-early-from-promise-chain


const flipCoin = (cnt = 1) => {
	while (cnt--) {
		if (Math.floor((Math.random()*1000))%2)
			return true;
	}
	return false;
}


const runPromise = (v,t) => new Promise((resolve,reject) => flipCoin() ?
		setTimeout(() => resolve(v),t):
		setTimeout(() => reject(new Error(v)),t));

let rp0 = runPromise('pro bono',Math.random()*1000);

rp0.then(v => console.log(`resolve#1 ${v}`))
.catch(e => console.log(`reject#1 ${e}`));

rp0.then(() => {
	Promise.resolve(rp0).then(v => console.log(`Got#2 ${v}`));
})
.catch(() => {
	Promise.reject(rp0).catch(e => console.log(`Got#2 ${e}`));
})

for (let i = 0; i < 10; ++i) {
	console.log(`flipCoin: ${flipCoin()}`);
}

