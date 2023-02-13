import { configureStore } from '@reduxjs/toolkit'

import ProductSlice from '../slices'

export const store = configureStore({
	reducer: {
		data: ProductSlice,
	},
})
