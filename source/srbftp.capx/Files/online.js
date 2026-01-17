"use strict"
srbftp.online = {}
const online = srbftp.online

let ini2json = (arg) => srbftp.ini2json(arg, true)

const request = function(options) {
	let config = {
		baseURL: options.url,
		headers: {
			"SRBftp": options.version,
			"Timestamp": options.time,
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
	options = ini2json(options)
	options.config = {
		url: "/api/health",
		method: "get",
	}
	request(options)
}

//////////////////////////////////////////////// user

online.login = function(options) {
	options = ini2json(options)
	options.config = {
		url: "/api/collections/users/auth-with-password",
		method: "post",
		data: {
			"identity": String(options.data.username),
			"password": String(options.data.password),
		}
	}
	request(options)
}

online.signup = function(options) {
	options = ini2json(options)
	options.config = {
		url: "/api/collections/users/records",
		method: "post",
		data: {
			"name": String(options.data.username),
			"password": String(options.data.password),
			"passwordConfirm": String(options.data.passwordconfirm),
		}
	}
	request(options)
}

online.refresh_login = function(options) {
	options = ini2json(options)
	options.config = {
		url: "/api/collections/users/auth-refresh",
		method: "post",
		headers: {
			authorization: "Bearer " + String(options.data.token),
		}
	}
	request(options)
}

online.get_user = function(options) {
	options = ini2json(options)
	options.config = {
		url: "/api/collections/users/records/" + String(options.data.id),
		method: "get",
	}
	request(options)
}

//////////////////////////////////////////////// leaderboards

online.leaderboards_levels = function(options) {
	options = ini2json(options)
	options.config = {
		url: "/api/collections/leaderboards_levels/records",
		method: "get",
		params: {skipTotal: "true", fields: "id, total_time, total_score"},
	}
	request(options)
}

online.leaderboards = function(options) {
	options = ini2json(options)
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
