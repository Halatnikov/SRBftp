"use strict"
srbftp.ini2json = function (arg, raw = false) {
	arg = decodeURIComponent(arg)
	let result = {}, scope = result, section = null
	
	// type conversion
	const cast = (arg) => {
		let num = Number(arg)
		return (!isNaN(num) && arg != "") ? num : arg
	}
	
	arg.split("\n").forEach(line => {
		line = line.trim()
		// comments and empty lines
		if (line == "" || line.startsWith(";") || line.startsWith("#")) return
		
		// [section] lines
		if (line.startsWith("[") && line.endsWith("]")) {
			section = line.slice(1, -1).trim()
			
			// [array[]] with objects
			if (section.endsWith("[]")) {
				let name = section.slice(0, -2).trim()
				if (!Array.isArray(result[name])) result[name] = []
				let obj = {}
				result[name].push(obj)
				scope = obj
			// [section] with key=values
			} else {
				if (!result[section]) result[section] = {}
				scope = result[section]
			}
			// [array] with values is handled later
			return
		}
		// key=value lines
		if (line.includes("=")) {
			let separator = line.indexOf("=")
			let key = line.substring(0, separator).trim()
			let value = cast(line.substring(separator + 1).trim())
			
			// key[]=value array
			if (key.endsWith("[]")) {
				let name = key.slice(0, -2).trim()
				if (!Array.isArray(scope[name])) scope[name] = []
				scope[name].push(value)
			// key=value
			} else {
				scope[key] = value
			}
		}
		// out of global scope
		else if (section) {
			// [array] with values
			// initialize
			if (!Array.isArray(scope) && Object.keys(scope).length == 0) {
				result[section] = []
				scope = result[section]
			}
			// put values
			if (Array.isArray(scope)) {
				scope.push(cast(line.trim()))
			}
		}
	})
	
	return raw ? result : JSON.stringify(result)
}

srbftp.json2ini = function (arg, raw = false) {
	arg = raw ? arg : JSON.parse(arg)
	let result = []
	
	for (let key in arg) {
		let value = arg[key]
		
		// order matters
		// [array[]] with objects
		if (Array.isArray(value) && value.length > 0 && typeof value[0] == "object") {
			let arr = value
			arr.forEach(obj => {
				result.push(`\n[${key}[]]`)
				for (let key in obj) {
					result.push(`${key}=${String(obj[key])}`)
				}
			})
		}
		// [array] with values
		else if (Array.isArray(value)) {
			let arr = value
			result.push(`\n[${key}]`)
			arr.forEach(value => {
				result.push(String(value))
			})
		}
		// [section] with key=values
		else if (typeof value == "object") {
			let obj = value
			result.push(`\n[${key}]`)
			for (let key in obj) {
				let value = obj[key]
				
				// key[]=value array
				if (Array.isArray(value)) {
					let arr = value
					arr.forEach(value => {
						result.push(`${key}[]=${String(value)}`)
					})
				// key=value
				} else {
					result.push(`${key}=${String(value)}`)
				}
			}
		}
		// global key=values
		else {
			result.push(`${key}=${String(value)}`)
		}
	}
	
	return result.join("\n")
}
