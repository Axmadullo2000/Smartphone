import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { getAllData } from '../../redux/asyncThunks'
import { CardItem } from '../../components/CardItem'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import PopularProducts from '../../components/PopularProducts'

const FilterProducts = () => {
	const dispatch = useDispatch()
	const { allData } = useSelector(data => data.data)
	const { slug } = useParams()

	useEffect(() => {
		dispatch(getAllData())
	}, [slug])

	return (
		<>
			<Header />
			<div className='flex flex-wrap justify-center'>
				{!!allData.results &&
					allData.results
						.filter(brand => brand.brand == slug)
						.map(item => (
							<>
								<div key={item.id} className='my-2'>
									<CardItem {...item} />
								</div>
							</>
						))}
			</div>

			<PopularProducts />

			<Footer />
		</>
	)
}

export default FilterProducts
