import i18n from 'i18next'
import React, { useEffect } from 'react'
import { initReactI18next } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import 'swiper/css'

import { SearchResult } from './components/SearchResult'
import { ForgotPasswordPage } from './pages/Auth/ForgotPassword'
import Login from './pages/Auth/Login'
import Registration from './pages/Auth/Registration'
import { Checkout } from './pages/Checkout'
import FilterProducts from './pages/FilterProducts'
import HomePage from './pages/HomePage'
import { ProductDetailInfo } from './pages/ProductDetailInfo'
import { ProductsInBasket } from './pages/ProductsInBasket'

import { registerAction } from './redux/slices/AuthSlice'
import { AuthService } from './Service'
import { getItem } from './Service/localData'

import { lang } from './lang/lang'

import './App.css'
import { ResultShopping } from './pages/ResultShopping'

function App() {
	const dispatch = useDispatch()

	const checkUser = async () => {
		try {
			const response = await AuthService.authentication()
			dispatch(registerAction(response.user_info))
		} catch (e) {}
	}

	const token = getItem('token')

	useEffect(() => {
		checkUser()
		// eslint-disable-next-line
	}, [token])

	i18n.use(initReactI18next).init({
		debug: true,
		fallbackLng: localStorage.getItem('lang') || 'ru',
		interpolation: {
			escapeValue: false
		},
		resources: {
			uz: { translation: lang.uz },
			ru: { translation: lang.ru },
			uk: { translation: lang.uk }
		}
	})

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
			<Route path='/customer/message/' element={<ResultShopping />} />
		</Routes>
	)
}

export default App
