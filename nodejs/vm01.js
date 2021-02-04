#!/usr/bin/env node

// https://nodejs.org/api/vm.html

'use strict';

const vm = require('vm');
const x = 1;

const sandbox = {x : 2};
console.log("very beginning:", typeof sandbox, sandbox);

/* "contextifying" : When the method vm.createContext() is called,
 * the sandbox object that is passed in (or a newly created object if sandbox is undefined)
 * is associated internally with a new instance of a V8 Context.
 * This V8 Context provides the code run using the vm module's methods 
 * with an isolated global environment within which it can operate.
 */

let zzz = vm.createContext(sandbox);	// Contextify the sandbox
console.log("after vm.createContext:", sandbox, sandbox == zzz);

const code = 'x += 40; var y = 17;';

// x and y are global variables in the sandboxed environment.
// Initially, x has the value 2 because that is the value of sandbox.x

const sandbox_new = {x: 13};
console.log('typeof sandbox_new:', typeof sandbox_new, sandbox_new);
vm.createContext(sandbox_new);
vm.runInContext(code, sandbox_new);
console.log('typeof sandbox_new:', typeof sandbox_new, sandbox_new);

sandbox.x = 9;

vm.runInContext(code, sandbox);
console.log("after vm.runInContext:", sandbox);

console.log(sandbox.x);	// 42
console.log(sandbox.y); // 17

console.log(x);	// 1; y is not defined.
