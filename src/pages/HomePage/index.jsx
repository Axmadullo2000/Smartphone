import React from 'react'

import Header from '../../components/Header'
import NewProducts from '../../components/newProducts'
import PopularProducts from '../../components/PopularProducts'
import Footer from '../../components/Footer'

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
