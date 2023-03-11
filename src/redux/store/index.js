import { configureStore } from '@reduxjs/toolkit'

import ProductSlice from '../slices'
import AuthSlice from '../slices/AuthSlice'
import CommentSlice from '../slices/CommentSlice'

export const store = configureStore({
	reducer: {
		data: ProductSlice,
		auth: AuthSlice,
		comment: CommentSlice
	}
})
