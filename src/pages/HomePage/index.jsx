import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NewProducts from '../../components/NewProducts'
import PopularProducts from '../../components/PopularProducts'

export default function HomePage() {
	const { t } = useTranslation()
	useEffect(() => {
		document.title = t('titlePage')
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
