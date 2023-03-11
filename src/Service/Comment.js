import axios from 'axios'

export const CrudComment = {
	async add(data) {
		const response = await axios.post(
			'http://127.0.0.1:8000/api/comments/createPho/',
			data
		)
		return response.data
	},

	async get(id) {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/comments/operatePho/${id}/`
		)
		return response.data
	},

	async delete(id) {
		const response = await axios.delete(
			`http://127.0.0.1:8000/api/comments/operatePho/${id}/`
		)
		return response.data
	},

	async update(data, id) {
		const response = await axios.put(
			`http://127.0.0.1:8000/api/comments/operatePho/${id}/`,
			data
		)
		return response.data
	}
}
