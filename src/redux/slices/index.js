import { createSlice } from '@reduxjs/toolkit'

import {
	fetchNewProductCardsAsyncThunk,
	fetchPopularCardsAsyncThunk,
	nextBtnAsyncThunk,
	prevBtnAsyncThunk,
	SearchAsyncThunk,
} from '../asyncThunks'

const initialState = {
	status: '',
	data: [],
	popularData: [],
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
			.addCase(fetchNewProductCardsAsyncThunk.fulfilled, (state, action) => {
				state.data = action.payload
			})
			.addCase(fetchPopularCardsAsyncThunk.fulfilled, (state, action) => {
				state.popularData = action.payload
			}),
})

export default ExampleSlice.reducer
