import React from 'react'
import { Route, Routes } from 'react-router-dom'

import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css'
import 'swiper/css'

import { SearchResult } from './components/SearchResult'
import Login from './pages/Auth/Login'
import Registration from './pages/Auth/Registration'
import FilterProducts from './pages/FilterProducts'
import HomePage from './pages/HomePage'

import './App.css'

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/sign-up' element={<Registration />} />
			<Route path='/sign-in' element={<Login />} />

			<Route path='/search/:slug' element={<SearchResult />} />
			<Route path='/products/category/:slug' element={<FilterProducts />} />
		</Routes>
	)
}

export default App
