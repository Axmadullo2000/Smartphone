import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	addedData: []
}

export const AddToBasket = createSlice({
	name: 'Basket/AddToBasket',
	initialState,
	reducers: {
		addToBasketItem(state, action) {
			state.addedData = action.payload
		}
	}
})

export const { addToBasketItem } = AddToBasket.actions

export default AddToBasket.reducer
