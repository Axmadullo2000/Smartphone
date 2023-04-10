import { createSlice } from '@reduxjs/toolkit'

import { getSuccessFullAsyncThunk } from '../asyncThunks/Transaction'

const initialState = {
	bookedProducts: []
}

export const TransactionSlice = createSlice({
	name: 'getSuccessFullAsyncThunk',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getSuccessFullAsyncThunk.fulfilled, (state, action) => {
			state.bookedProducts = action.payload
		})
	}
})

export default TransactionSlice.reducer
