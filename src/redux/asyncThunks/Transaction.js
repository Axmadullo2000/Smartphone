import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getItem } from '../../Service/localData'

axios.interceptors.request.use(config => {
	const token = getItem('token')
	const authorization = token !== null ? `Token ${token}` : null
	config.headers.authorization = authorization
	return config
})

export const getSuccessFullAsyncThunk = createAsyncThunk(
	'historyPayment/getSuccessFullAsyncThunk',
	async () => {
		const response = await axios.patch(
			'http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/get_traffic/'
		)

		return response.data
	}
)
