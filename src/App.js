import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import 'swiper/css'

import { SearchResult } from './components/SearchResult'
import Login from './pages/Auth/Login'
import Registration from './pages/Auth/Registration'
import FilterProducts from './pages/FilterProducts'
import HomePage from './pages/HomePage'
import { ProductDetailInfo } from './pages/ProductDetailInfo'

import { registerAction } from './redux/slices/AuthSlice'
import { AuthService } from './Service'
import { getItem } from './Service/localData'

import './App.css'
import { ForgotPasswordPage } from './pages/Auth/ForgotPassword'
import { Checkout } from './pages/Checkout'
import { ProductsInBasket } from './pages/ProductsInBasket'

function App() {
	const dispatch = useDispatch()

	const checkUser = async () => {
		try {
			const response = await AuthService.authentication()
			console.log(response)
			dispatch(registerAction(response.user_info))
		} catch (e) {}
	}

	const token = getItem('token')

	useEffect(() => {
		checkUser()
	}, [token])

	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/sign-up' element={<Registration />} />
			<Route path='/sign-in' element={<Login />} />

			<Route path='/search/:slug' element={<SearchResult />} />
			<Route path='/products/category/:slug' element={<FilterProducts />} />

			<Route path='/products/view/:slug' element={<ProductDetailInfo />} />
			<Route path='/accounts/reset-password' element={<ForgotPasswordPage />} />
			<Route path='/customer/cart/' element={<ProductsInBasket />} />
			<Route path='/customer/checkout/' element={<Checkout />} />
		</Routes>
	)
}

export default App
