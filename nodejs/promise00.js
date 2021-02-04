#!/usr/bin/env node

// http://www.mattgreer.org/articles/promises-in-wicked-detail/

function myPromise(fn) {
	var state = 'pending';
	var value;
	var deferred = null;

	function handle(handler) {
		if (state === 'pending') {
			deferred = handler;
			return;
		}
		if (!handler.onResolved) {
			handler.resolve(value);
			return;
		}
		var ret = handler.onResolved(value);
		handler.resolve(ret);
	}

	function resolve(newValue) {
		// check for returning another promise
		if (newValue && typeof newValue.then === 'function') {
			newValue.then(resolve);
			return;
		}
		value = newValue;
		state = 'resolved';

		if (deferred) {
			handle(deferred);
		}
	}

	this.then = function(onResolved) {
		return new myPromise(function(resolve) {
			handle({
				/* ES6? onResolved: */ onResolved,
				/* ES6? resolve: */ resolve
			});
		});
	};

	fn(resolve);
}

function doSomething(value) {
	return new myPromise(function(resolve) { // wkliang:20170425
		resolve(value);		// resolved value is matter
		return value * 2;	// return value is insignificant
	});
}

doSomething(42).then(function(result) {
	console.log('first result:', result);
	return 88;
}).then(function(secondResult) {
	console.log('second result:', secondResult);
	return new myPromise(function(resolve) {
		resolve(new Date());
	});
}).then(function(finalResult) {
	console.log("final result:", finalResult);
});
