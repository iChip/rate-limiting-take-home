/*

Takes in three parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that implements a more generalized 
version of rate limiting above. When invoked ```retFn``` upholds 
the following two invariants: 

1) For every call to ```retFn``` there is a call to ```fn``` that happens as soon as possible

2) Within any window of ```time``` milliseconds there is *at most* 
    ```numInWindow``` calls to ```fn```.

*/

export default function multiRateLimit(fn, time, numInWindow) {
  let pendingCalls = [];
	let callHistory = []

	return function retFn(...args) {
		pendingCalls.push(fn.bind(this, ...args));
		attemptCall();
	}

	function attemptCall() {
		if (pendingCalls.length === 0) {
			return;
		}

		const now = Date.now();
		while (callHistory.length > 0 && callHistory[0] < now - time) {
			callHistory.shift();
		}

		if (callHistory.length < numInWindow) {
	    pendingCalls.shift().call();
	    callHistory.push(now);
	    attemptCall()
			return;
		}

  	const waitMillis = callHistory[0] + time - now;
    setTimeout(attemptCall, waitMillis);
	}
}