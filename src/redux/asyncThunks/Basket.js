import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { getItem } from '../../Service/localData'

axios.interceptors.request.use(config => {
	const token = getItem('token')
	const authorization = token !== null ? `Token ${token}` : null
	config.headers.authorization = authorization
	return config
})

export const addProductToBasket = createAsyncThunk(
	'basket/addProductToBasket',
	async data => {
		const response = await axios.post(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/add_product/`,
			data
		)

		return response.data
	}
)

export const productsInBasket = createAsyncThunk(
	'basket/productsInBasket',
	async id => {
		const response = await axios.get(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/operate_product/${id}/`
		)
		return response.data
	}
)

export const deleteProductFromBasket = createAsyncThunk(
	'basket/deleteProductFromBasket',
	async id => {
		const response = await axios.delete(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/api/comments/operate_product/${id}/`
		)

		return response.data
	}
)

export const paymentAsynkThunk = createAsyncThunk(
	'payment/paymentAsynkThunk',
	async id => {
		const response = await axios.post(
			`http://ec2-54-175-61-21.compute-1.amazonaws.com/create-checkout-session/${id}/`
		)
		// console.log(response.data)
		return response.data.id
	}
)
