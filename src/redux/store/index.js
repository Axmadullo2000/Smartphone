import { configureStore } from '@reduxjs/toolkit'

import ProductSlice from '../slices'
import AddToBasketSlice from '../slices/AddToBasketSlice'
import AuthSlice from '../slices/AuthSlice'
import CommentSlice from '../slices/CommentSlice'
import TransactionSlice from '../slices/TransactionSlice'

export const store = configureStore({
	reducer: {
		data: ProductSlice,
		auth: AuthSlice,
		comment: CommentSlice,
		basket: AddToBasketSlice,
		payment: TransactionSlice
	},
	devTools: process.env.NODE_ENV === 'production'
})
