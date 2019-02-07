/*

Takes in two parameters ```fn (a function)``` and ```time (number of milliseconds)```. 

Returns a function ```retFn``` that delays invoking ```fn``` until 
after ```time``` has elapsed from the *last* time ```retFn``` was invoked.

*/

export default function debounce(fn, time) {
	let pendingTimer = null;
	return function() {
		if (pendingTimer !== null) {
			clearTimeout(pendingTimer);
		}
		pendingTimer = setTimeout(fn, time);
	}
}