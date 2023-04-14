import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import CardFilter from '../../components/CardFilter'
import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import PopularProducts from '../../components/Layouts/PopularProducts'

import './FilterProducts.scss'

const FilterProducts = () => {
	const { detailData } = useSelector(state => state.data)
	const { slug } = useParams()

	if (!!detailData.phone) {
		document.title = 'Купить Смартфоны в интернет магазине SMART SHOP'
	}

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
