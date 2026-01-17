"use strict"
// figure out how to do variables only accessible to the scope of one file
// make all functions constants
var srbftp = {}

srbftp.logJSON = function(...args) {
	let last = args.length - 1;
	args[last] = JSON.parse(args[last]);
	console.log(...args);
};

srbftp.testFunction = function(...args) {
	let funcname = args[0], funcargs = args.slice(1);
    //wrap the param names in quotes for readability
    let argnames = funcargs.map(arg => `"${arg}"`);
	
	console.log(`${funcname}(${argnames.join(', ')}) =`, c2_callFunction(funcname, funcargs));
};

// bootleg string.format
srbftp.format = function () {
	let string = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		string = string.replace(/{[A-Za-z0-9]+}/, arguments[i]);
	};
	return string;
};

srbftp.semver = function(a,b) {
	// 1 major, 2 minor, 3 patch, 4 prerelease
	const pattern = /^(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?$/;
	a = a.match(pattern), b = b.match(pattern);
	if (!a || !b) return false; // invalid input
	
	for (let i = 1; i <= 3; i++) {
		let n1 = parseInt(a[i]), n2 = parseInt(b[i]);
		if (n1 > n2) return true;
		if (n1 < n2) return false;
	};
	
	// using a prerelease when release is available
	let prea = a[4], preb = b[4];
	if (prea && !preb) return false;
	
	return true; // equals
};

///////////////////////////////////////////////////////////////

const proxies = {};

// workarounds so that js.storage returns construct-readable jsons
proxies.localStorage_get = Storages.localStorage.get;
Storages.localStorage.get = function() {
	let proxied = proxies.localStorage_get.apply(this, arguments);
	return (proxied != null && typeof proxied == "object") ? JSON.stringify(proxied) : proxied;
};

proxies.localStorage_keys = Storages.localStorage.keys;
Storages.localStorage.keys = function() {
	let proxied = proxies.localStorage_keys.apply(this, arguments);
	return JSON.stringify(proxied);
};

(()=>{
const c2_callFunction = window.c2_callFunction
window.c2_callFunction = function(name, params) {
	const names = ["String_IsNumber", "Time_DateString", "JS_OnLoad", "PB_OnSuccess", "PB_OnError"];
	if (names.includes(name)) {
		return c2_callFunction.apply(this, arguments)
	}
}
})()

Object.freeze(proxies)
