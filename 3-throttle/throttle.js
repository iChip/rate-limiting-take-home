/*

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that invokes ```fn``` at most once 
every ```time``` milliseconds. More specifically when ```retFn``` is 
invoked then ```fn``` is invoked immediately, except if there's been less 
than ```time``` milliseconds elapsed from the last time ```retFn``` was called, 
in which case, do nothing.

*/

export default function throttle(fn, time) {
	let lastInvocationTime = null;

	return function retFn() {
		const now = Date.now();
		const allowedInvocationTime = lastInvocationTime + time;
		if (lastInvocationTime === null ||  allowedInvocationTime < now) {
			lastInvocationTime = now;
			fn();
		}
	}
}
