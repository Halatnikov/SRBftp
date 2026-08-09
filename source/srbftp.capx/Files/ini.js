"use strict"
srbftp.ini2json = function (arg, raw = false) {
	arg = decodeURIComponent(arg)
	let result = {}, scope = result, section = null
	
	// type conversion
	function cast(arg) {
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
			
			// [array[]] with values or objects
			if (section.endsWith("[]")) {
				section = section.slice(0, -2).trim()
				if (!Array.isArray(result[section])) result[section] = []
			}
			// [object] with key=values
			else {
				if (!result[section]) result[section] = {}
			}
			scope = result[section]
		}
		// key=value lines
		else if (line.includes("=")) {
			let separator = line.indexOf("=")
			let key = line.substring(0, separator).trim()
			let value = cast(line.substring(separator + 1).trim())
			
			// inside an array, assume object
			if (section && Array.isArray(scope)) {
				let obj = {}
				result[section].push(obj)
				scope = obj
			} 
			
			// key[]=value array
			if (key.endsWith("[]")) {
				key = key.slice(0, -2).trim()
				if (!Array.isArray(scope[key])) scope[key] = []
				scope[key].push(value)
			}
			// key=value
			else {
				scope[key] = value
			}
		}
		// otherwise eligible lines
		else {
			// inside an array, assume keyless value
			if (section && Array.isArray(scope)) {
				scope.push(cast(line.trim()))
			}
			// global scope or in an object
			// interpret as having an empty value
			else {
				scope[line.trim()] = ""
			}
		}
	})
	
	return raw ? result : JSON.stringify(result)
}

srbftp.json2ini = function (arg, raw = false) {
	arg = raw ? arg : JSON.parse(arg)
	let result = [], global = {}, sections = {}
	// there's a funny edgecase when if there's an empty array inside an object, it prints nothing, but should be fine to ignore?
	// also doesn't know what to do with an array containing both objects and values, but that doesn't sound useful here
	// inside global scope, arrays as a [section[]] instead of array[]=value probably look cleaner
	
	function serialize(obj) {
		Object.keys(obj).forEach(key => {
			let value = obj[key]
			
			// key[]=value arrays
			if (Array.isArray(value)) {
				value.forEach(item => result.push(`${key}[]=${String(item)}`))
			} 
			// key=value properties
			else {
				result.push(`${key}=${String(value)}`)
			}
		})
	}
	
	// split into global scope and sections
	Object.keys(arg).forEach(key => {
		let value = arg[key]
		
		if (typeof value == "object") { // reminder both objects and arrays are "objects" in js
			sections[key] = value
		} 
		else {
			global[key] = value
		}
	})
	// print global scope first
	serialize(global)
	
	// do the mario
	Object.keys(sections).forEach(name => {
		let section = sections[name]
		
		// [array[]] with objects or keyless values
		if (Array.isArray(section)) {
			// preserve empty arrays
			if (section.length == 0) {
				result.push(`\n[${name}[]]`)
			
			// containing objects
			} else if (section.every(item => typeof item == "object")) {
				section.forEach(item => {
					result.push(`\n[${name}[]]`)
					serialize(item)
				})
			
			// containing keyless values
			} else {
				result.push(`\n[${name}[]]`)
				section.forEach(item => result.push(String(item)))
			}
		
		// [object] with key=values
		} else {
			result.push(`\n[${name}]`)
			serialize(section)
		}
	})
	
	result.push("") // eof
	return result.join("\n")
}
