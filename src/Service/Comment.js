import axios from 'axios'

export const CrudComment = {
	async add(data) {
		const response = await axios.post(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/createPho/',
			data
		)
		return response.data
	},

	async get(id) {
		const response = await axios.get(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/operatePho/${id}/`
		)
		return response.data
	},

	async delete(id) {
		const response = await axios.delete(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/operatePho/${id}/`
		)
		return response.data
	},

	async update(data, id) {
		const response = await axios.put(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/operatePho/${id}/`,
			data
		)
		return response.data
	}
}
