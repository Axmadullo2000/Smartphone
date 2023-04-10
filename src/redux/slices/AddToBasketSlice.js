import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import {
	addProductToBasket,
	deleteProductFromBasket,
	paymentAsynkThunk,
	productsInBasket,
	updateBasketItem
} from '../asyncThunks/Basket'

const initialState = {
	addedData: [],
	basketData: [],
	updatedData: [],
	remove: [],
	paymentLink: ''
}

export const AddToBasket = createSlice({
	name: 'Basket/AddToBasket',
	initialState,

	extraReducers: builder => {
		builder
			.addCase(addProductToBasket.fulfilled, (state, action) => {
				state.addedData = action.payload
				toast.success('Added to the basket the Product!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				})
			})
			.addCase(productsInBasket.fulfilled, (state, action) => {
				state.basketData = action.payload
			})
			.addCase(updateBasketItem.fulfilled, (state, action) => {
				state.updatedData = action.payload
			})

			.addCase(deleteProductFromBasket.fulfilled, (state, action) => {
				state.remove = action.payload
				toast.success('Product removed From Basket', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				})
			})

			.addCase(paymentAsynkThunk.fulfilled, (state, action) => {
				state.paymentLink = action.payload
			})
	}
})

export const { addToCart } = AddToBasket.actions

export default AddToBasket.reducer
