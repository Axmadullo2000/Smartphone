import React from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NewProducts from '../../components/newProducts'
import PopularProducts from '../../components/PopularProducts'

const HomePage = () => {
	return (
		<div>
			<Header />
			<NewProducts />
			<PopularProducts />
			<Footer />
		</div>
	)
}

export default HomePage
