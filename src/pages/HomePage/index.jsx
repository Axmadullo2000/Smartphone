import React from 'react'
import { useSelector } from 'react-redux'
import { Carousel } from '../../components/Carousel'

import Header from '../../components/Header'

const HomePage = () => {
	const data = useSelector(data => data.example)

	return (
		<div>
			<Header />
			<Carousel />
		</div>
	)
}

export default HomePage
