"use strict";
var srbftp = {};

// todo: allow preceding arguments and make the json itself last
srbftp.logJSON = function(arg) {
	console.log(JSON.parse(arg))
};

srbftp.testFunction = function(...args) {
	let funcname = args[0], funcargs = args.slice(1);
    //wrap the param names in quotes for readability
    let argnames = funcargs.map(arg => `"${arg}"`);
	
	console.log(`${funcname}(${argnames.join(', ')}) =`, c2_callFunction(funcname, funcargs));
};

///////////////////////////////////////////////////////////////

String.format = function () {
	let string = arguments[0];

	for (let i = 1; i < arguments.length; i++) {
		string = string.replace(/{[A-Za-z0-9]+}/, arguments[i]);
	};

	return string;
};

///////////////////////////////////////////////////////////////

var proxies = {};

// workarounds so that js.storage returns construct-readable jsons
proxies.localStorage_get = Storages.localStorage.get;
Storages.localStorage.get = function() {
	let proxied = proxies.localStorage_get.apply(this, arguments);
	return JSON.stringify(proxied);
};

proxies.localStorage_keys = Storages.localStorage.keys;
Storages.localStorage.keys = function() {
	let proxied = proxies.localStorage_keys.apply(this, arguments);
	return JSON.stringify(proxied);
};
