import React from 'react'
import { Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'

import './App.css'
import Registration from './pages/Auth/Registration'
import Login from './pages/Auth/Login'
import { SearchResult } from './components/SearchResult'

import 'swiper/css'

function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/sign-up' element={<Registration />} />
			<Route path='/sign-in' element={<Login />} />

			<Route path='/search/:slug' element={<SearchResult />} />
		</Routes>
	)
}

export default App
