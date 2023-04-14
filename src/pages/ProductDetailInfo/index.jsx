import { useParams } from 'react-router-dom'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import CardDetail from '../../components/ProductsDetail/CardDetail'

export const ProductDetailInfo = () => {
	const { slug } = useParams()

	return (
		<>
			<Header />
			<CardDetail slug={slug} />
			<Footer />
		</>
	)
}
