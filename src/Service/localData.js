export const getItem = item => {
	try {
		const data = localStorage.getItem(item)
		return data
	} catch (e) {
		console.log(e)
	}
}

export const setItem = (key, value) => {
	try {
		const data = localStorage.setItem(key, value)
		return data
	} catch (e) {
		console.log(e)
	}
}

export const removeItem = item => {
	try {
		const data = localStorage.removeItem('token')
		return data
	} catch (e) {
		console.log(e)
	}
}
