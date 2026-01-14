// figure out how to do variables only accessible to the scope of one file
// make all functions constants

srbftp.online = {}
let online = srbftp.online

let lazyjson = srbftp.lazyjson

const request = function(options) {
	let config = {
		baseURL: options.url,
		headers: {
			"SRBftp": options.version,
		},
		timeout: 10000, // 10 sec
	}
	let instance = axios.create(config)
	
	instance(options.config)
	.then((res) => {c2_callFunction("PB_OnSuccess", [options.tag, JSON.stringify(res)]); console.log(res)})
	.catch((err) => {c2_callFunction("PB_OnError", [options.tag, JSON.stringify(err)]); console.log(err)})
}

//////////////////////////////////////////////// general

online.health = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/health",
		method: "get",
	}
	request(options)
}

//////////////////////////////////////////////// user

online.login = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/collections/users/auth-with-password",
		method: "post",
		data: {
			"identity": options.data.username,
			"password": options.data.password,
		}
	}
	request(options)
}

online.signup = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/collections/users/records",
		method: "post",
		data: {
			"name": options.data.username,
			"password": options.data.password,
			"passwordConfirm": options.data.passwordconfirm,
		}
	}
	request(options)
}

online.refresh_login = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/collections/users/auth-refresh",
		method: "post",
		headers: {
			authorization: "Bearer " + options.data,
		}
	}
	request(options)
}

online.get_user = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/collections/users/records/" + options.data,
		method: "get",
	}
	request(options)
}

//////////////////////////////////////////////// leaderboards

online.leaderboards_levels = function(options) {
	options = lazyjson(options)
	options.config = {
		url: "/api/collections/leaderboards_levels/records",
		method: "get",
		params: {skipTotal: "true", fields: "id,total_time,total_score"},
	}
	request(options)
}

online.leaderboards = function(options) {
	options = lazyjson(options)
	let level = /^\w+$/.test(options.data.level) ? options.data.level : ""
	let type = options.data.type != "time" ? "score" : "time"
	
	const filter_types = {
		normal: `level = "${level}" && type = "${type}"`,
	}
	let filter = filter_types[options.data.filter] || filter_types.normal
	
	const sort_types = {
		time: {
			best: "value",
		},
		score: {
			best: "-value",
		},
	}
	let sort = sort_types[type][options.data.sort] || sort_types[type].best
	
	options.config = {
		url: "/api/collections/leaderboards/records",
		method: "get",
		params: {
			filter: filter,
			sort: sort,
			page: options.data.page,
			expand: "user",
			skipTotal: "true", 
			fields: "contents, created, user, expand.user.name"
		},
	}
	request(options)
}

//////////////////////////////////////////////// 

Object.freeze(online)