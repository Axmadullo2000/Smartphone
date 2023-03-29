import { createSlice } from '@reduxjs/toolkit'

import {
	addProductToBasket,
	deleteProductFromBasket,
	productsInBasket
} from '../asyncThunks/Basket'

const initialState = {
	addedData: [],
	basketData: [],
	remove: []
}

export const AddToBasket = createSlice({
	name: 'Basket/AddToBasket',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(addProductToBasket.fulfilled, (state, action) => {
				state.addedData = action.payload
			})
			.addCase(productsInBasket.fulfilled, (state, action) => {
				state.basketData = action.payload
			})
			.addCase(deleteProductFromBasket.fulfilled, (state, action) => {
				state.remove = action.payload
			})
	}
})

export const { IncreaseQuantity } = AddToBasket.actions

export default AddToBasket.reducer
