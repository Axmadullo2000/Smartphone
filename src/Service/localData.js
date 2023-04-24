export const getItem = item => {
	try {
		const data = sessionStorage.getItem(item)
		return data
	} catch (e) {}
}

export const setItem = (key, value) => {
	try {
		const data = sessionStorage.setItem(key, value)
		return data
	} catch (e) {}
}

export const removeItem = () => {
	try {
		const data = sessionStorage.removeItem('token')
		sessionStorage.clear()
		return data
	} catch (e) {}
}
