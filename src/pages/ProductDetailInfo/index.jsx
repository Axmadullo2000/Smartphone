import { useParams } from 'react-router-dom'

import CardDetail from '../../components/CardDetail'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

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
