
var srbftp = {};

var proxies = {};

// workarounds so that js.storage returns construct-readable jsons
proxies.localStorage_get = Storages.localStorage.get;
Storages.localStorage.get = function() {
	let proxied = proxies.localStorage_get.apply(this, arguments)
	return JSON.stringify(proxied);
};

proxies.localStorage_keys = Storages.localStorage.keys;
Storages.localStorage.keys = function() {
	let proxied = proxies.localStorage_keys.apply(this, arguments)
	return JSON.stringify(proxied);
};