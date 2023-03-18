import React, { useEffect } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NewProducts from '../../components/NewProducts'
import PopularProducts from '../../components/PopularProducts'

const HomePage = () => {
	useEffect(() => {
		document.title =
			'Интернет магазин SMARTSHOP.UZ | смартфоны, доставка по Ташкенту и всей Республики Узбекистан'
	}, [])
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
