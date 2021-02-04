#!/usr/bin/env node

// https://storylens.com/@manjunath/how-to-handle-errors-in-express-nodejs-d8b7d

const flipCoin = () => Math.floor((Math.random()*1000))%2;
const runPromise = (v,t) => Promise.resolve((async () => await new Promise(
	(resolve,reject)=>flipCoin() ?
		setTimeout(() => resolve(v),t):
		setTimeout(() => reject(new Error(v)),t)))())

let rp = runPromise('pro bono',Math.random()*1000);

rp.then(v => console.log(`resolve#1 ${v}`))
.catch(e => console.log(`reject#1 ${e}`));

rp.then(v => console.log(`resolve#2 ${v}`))
.catch(e => console.log(`reject#2 ${e}`));

console.log('Hello, brave new world!!!');

