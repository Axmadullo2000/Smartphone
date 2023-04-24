import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import NewProducts from '../../components/Layouts/NewProducts'
import PopularProducts from '../../components/Layouts/PopularProducts'

export default function HomePage() {
	const { t } = useTranslation()
	useEffect(() => {
		document.title = t('titlePage')
		// eslint-disable-next-line
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
