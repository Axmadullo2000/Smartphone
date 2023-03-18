import React, { useEffect } from 'react'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PopularProducts from '../../components/PopularProducts'

export default function HomePage() {
	useEffect(() => {
		document.title =
			'Интернет магазин SMARTSHOP.UZ | смартфоны, доставка по Ташкенту и всей Республики Узбекистан'
	}, [])

	return (
		<div>
			<Header />
			<PopularProducts />
			<Footer />
		</div>
	)
}
