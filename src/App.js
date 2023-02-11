import React from 'react'
import { Routes, Route } from 'react-router-dom'

import 'swiper/css'
import 'rc-tooltip/assets/bootstrap.css';
import 'rc-slider/assets/index.css';

import HomePage from './pages/HomePage'
import Registration from './pages/Auth/Registration'
import Login from './pages/Auth/Login'
import { SearchResult } from './components/SearchResult'
import FilterProducts from './pages/FilterProducts'

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
