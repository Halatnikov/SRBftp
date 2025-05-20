var srbftp = {};

// todo: allow preceding arguments and make the json itself last
srbftp.logJSON = function(arg) {
	console.log(JSON.parse(arg))
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
