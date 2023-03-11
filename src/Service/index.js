import axios from 'axios'

import { getItem } from './localData'

axios.interceptors.request.use(config => {
	const token = getItem('token')
	const authorization = token !== null ? `Token ${token}` : null
	config.headers.authorization = authorization
	return config
})

export const AuthService = {
	async register(data) {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/accounts/create/',
			data
		)
		return response.data
	},
	async login(data) {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/accounts/login/',
			data
		)
		return response.data
	},

	async authentication() {
		const response = await axios.get('http://127.0.0.1:8000/api/accounts/user/')
		return response.data
	},

	async logout() {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/accounts/logout/'
		)
		return response.data
	},

	async forgotPassword(data) {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/accounts/reset/',
			data
		)

		return response.data
	}
}
