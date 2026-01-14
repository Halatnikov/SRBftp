"use strict";
var srbftp = {};

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

// returns 1 if check is passed
srbftp.semver = function(a,b) {
	// 1 major, 2 minor, 3 patch, 4 prerelease
	const pattern = /^(\d+)\.(\d+)\.(\d+)(?:-([\w.-]+))?$/;
	a = a.match(pattern), b = b.match(pattern);
	if (!a || !b) return 0; // invalid input
	
	for (let i = 1; i <= 3; i++) {
		let n1 = parseInt(a[i]), n2 = parseInt(b[i]);
		if (n1 > n2) return 1;
		if (n1 < n2) return 0;
	};
	
	// using a prerelease when release is available
	let prea = a[4], preb = b[4];
	if (prea && !preb) return 0;
	
	return 1;
};

// for like actual json objects like records and saves, please just make a new param (or do i????)
// perhaps replace discord rpc inis to these?
srbftp.lazyjson = function(arg) {
	const escape = {"\\": "\\\\", '"': '\\"', "\n": "\\n", "\r": "\\r", "\t": "\\t"};
	let processed = arg.split("\n")
		.map(line => {
			line = line.trim()
			if (!line || ["{", "}", "},"].includes(line)) return line;

			let separator = line.indexOf(":");
			if (separator == -1) return line;
			let key = line.substring(0, separator).trim();
			let value = line.substring(separator + 1).trim().replace(/,$/, '');
			
			// nested objects
			if (value == "{") return `"${key}": {`;
			// sanitize
			key = key.replace(/[\\"\n\r\t]/g, char => escape[char]);
			value = value.replace(/[\\"\n\r\t]/g, char => escape[char]);
			value = ["true", "false", "null"].includes(value) ? value : `"${value}"`;
			return `"${key}": ${value},`;
		})
		.join("\n")
		// trailing commas
		.replace(/,\s*([}\]])/g, "$1");
	
	try {
		return JSON.parse(processed)
	} catch (err) {
		console.error("lazyjson failed:\n", processed) //replace these with a vague error in release
		console.error(err.message)
	}
}

///////////////////////////////////////////////////////////////

var proxies = {};

// workarounds so that js.storage returns construct-readable jsons
proxies.localStorage_get = Storages.localStorage.get;
Storages.localStorage.get = function() {
	let proxied = proxies.localStorage_get.apply(this, arguments);
	return (proxied !== null && typeof proxied === 'object') ? JSON.stringify(proxied) : proxied;
};

proxies.localStorage_keys = Storages.localStorage.keys;
Storages.localStorage.keys = function() {
	let proxied = proxies.localStorage_keys.apply(this, arguments);
	return JSON.stringify(proxied);
};
