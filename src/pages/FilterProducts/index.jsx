import { useParams } from 'react-router-dom'

import CardFilter from '../../components/CardFilter'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import PopularProducts from '../../components/PopularProducts'

import './FilterProducts.scss'

const FilterProducts = () => {
	const { slug } = useParams()

	return (
		<>
			<Header />
			<CardFilter slug={slug} />
			<PopularProducts />
			<Footer />
		</>
	)
}

export default FilterProducts
