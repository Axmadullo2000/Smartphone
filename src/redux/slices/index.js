import { createSlice } from '@reduxjs/toolkit'

import {
	fetchCardsAsyncThunk,
	nextBtnAsyncThunk,
	prevBtnAsyncThunk,
	SearchAsyncThunk,
} from '../asyncThunks'

const initialState = {
	status: '',
	data: [],
}

const ExampleSlice = createSlice({
	name: 'slice/ExampleSlice',
	initialState,
	reducers: {},
	extraReducers: builder =>
		builder
			.addCase(SearchAsyncThunk.pending, state => {
				state.status = 'loading'
			})
			.addCase(SearchAsyncThunk.fulfilled, (state, action) => {
				state.status = 'Completed'
				state.data = action.payload
			})
			.addCase(prevBtnAsyncThunk.fulfilled, (state, action) => {
				state.data = action.payload
			})

			.addCase(nextBtnAsyncThunk.fulfilled, (state, action) => {
				state.data = action.payload
			})
			.addCase(fetchCardsAsyncThunk.fulfilled, (state, action) => {
				state.data = action.payload
			}),
})

export default ExampleSlice.reducer
