import { createSlice } from '@reduxjs/toolkit'

import {
	fetchNewProductCardsAsyncThunk,
	fetchPopularCardsAsyncThunk,
	filterByFewParams,
	getAllData,
	getDetailProduct,
	getExtraProducts,
	SearchAsyncThunk
} from '../asyncThunks'

const initialState = {
	status: '',
	data: [],
	popularData: [],
	allData: [],
	catalogData: [],
	filteredData: [],
	detailData: [],
	extraProductDetail: [],
	commentData: []
}

const ProductSlice = createSlice({
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

			.addCase(fetchNewProductCardsAsyncThunk.fulfilled, (state, action) => {
				state.data = action.payload
			})
			.addCase(fetchPopularCardsAsyncThunk.fulfilled, (state, action) => {
				state.popularData = action.payload
			})
			.addCase(getAllData.fulfilled, (state, action) => {
				state.allData = action.payload
			})
			.addCase(filterByFewParams.fulfilled, (state, action) => {
				state.filteredData = action.payload
			})

			.addCase(getDetailProduct.fulfilled, (state, action) => {
				state.detailData = action.payload
			})
			.addCase(getExtraProducts.fulfilled, (state, action) => {
				state.extraProductDetail = action.payload
			})
})

export const { getCatalogList } = ProductSlice.actions

export default ProductSlice.reducer
