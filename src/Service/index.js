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
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/create/',
			data
		)
		return response.data
	},

	async extraRegister(data) {
		const response = await axios.post(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/extra_create/`,
			data
		)
		return response.data
	},

	async login(data) {
		const response = await axios.post(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/login/',
			data
		)
		return response.data
	},

	async authentication() {
		const response = await axios.get(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/user/'
		)
		return response.data
	},

	async logout() {
		const response = await axios.post(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/logout/'
		)
		return response.data
	},

	async forgotPassword(data) {
		const response = await axios.post(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/reset/',
			data
		)

		return response.data
	},

	async deleteUser(data) {
		const response = await axios.put(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/accounts/deluser/`,
			data
		)
		return response.data
	}
}

export default axios
