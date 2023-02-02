import { configureStore } from '@reduxjs/toolkit'

import ExampleReducer from '../slices'

export const store = configureStore({
	reducer: {
		data: ExampleReducer,
	},
})
