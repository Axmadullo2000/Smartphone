import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import Header from '../../components/Header'
import { CardItem } from '../../components/CardItem'
import { getAllData } from '../../redux/asyncThunks'
import PopularProducts from '../../components/PopularProducts'
import Footer from '../../components/Footer'
import TooltipSlider from '../../components/TooltipSlider.jsx/index.jsx'


const FilterProducts = () => {
	const [count, setCount] = useState(0)
	const dispatch = useDispatch()
	const { allData } = useSelector(data => data.data)
	const { slug } = useParams()
	const [sortType, setSorted] = useState('asc');
	let array = []
	let brand = []
	const productData = []

	const onSort = () => {
		const sortOrder = sortType === 'asc' ? 'desc' : 'asc';
		setSorted(sortOrder);
	}

	const resetSort = () => {
		setSorted('asc')
	}


	const fetchAllData = () => {
		let data = []
		if (allData.results != undefined) {
			array = [...allData.results]

			array.filter((product) => {
				// До фильтра с ренджем

				if (count == 0) {
					productData.push(product)
				}
				// После фильтра с ренжем
				else {
					if (product.price > count[0] && product.price < count[1]) {
						productData.push(product)
					}
				}

			})

			if (sortType == 'asc') {
				data = productData.sort((a, b) => a.price - b.price)
				return data
			} else {
				data = productData.sort((a, b) => b.price - a.price)
				return data
			}

		}

		return data

	}


	useEffect(() => {
		dispatch(getAllData())
	}, [slug])

	!!allData.results && allData.results.map(item => brand.push(item.brand))

	const filterItems = brand.filter((item, pos) => brand.indexOf(item) == pos)

	return (
		<>
			<Header />
			<div className='flex justify-between'>
				<div style={{
					width: '400px', background: 'purple', padding: '20px 35px', lineHeight: '30px'
				}}>
					<h3 className='text-xl text-red-700'>Смартфоны <span className='capitalize'>{slug}</span></h3>
					<div>
						{filterItems.map((item) => <p key={item} className='capitalize'>
							<Link to={`/products/category/${item}`} className="text-slate-300 border-3 border-b-current hover:text-red-400 hover:border-b-current"
							>{item}</Link>
						</p>)}
					</div>

					<div style={{ width: '100%' }}>
						<h3 className='text-indigo-800 text-xl py-2'>Стоимость</h3>
						{<p>Товары в промежутке {count == 0 ? '0-23000000' : <span className='text-blue-500'>{count[0]} - {count[1]}</span>} сумов</p>}

						<div style={{ width: 200, margin: 20 }}>
							<TooltipSlider
								onChange={(value) => setCount(value)}
								range
								min={0}
								max={23000000}
								defaultValue={[0, 23000000]}
								tipFormatter={(value) => `${value} сум`}
							/>
						</div>
					</div>
				</div>
				<div className=''>
					<div className='shadow-xl	bg-slate-100 bg-cyan-500 shadow-lg shadow-cyan-500/50 flex justify-between rounded items-center mb-10' style={{ width: '900px', margin: '30px auto', padding: '10px' }}>
						<h3 className='text-xl text-violet-800'>Сортировать по</h3>
						<form className='flex' onSubmit={(e) => e.preventDefault()}>
							<div onClick={onSort} className="mx-2">
								<button className='rounded bg-blue-700 text-slate-200 hover:text-red-600 hover:bg-yellow-500 ease-in duration-300' style={{ padding: '5px 10px', height: '40px' }}>Цене ниже</button>
							</div>
							<div onClick={onSort} className="mx-2">
								<button className='rounded p-2 bg-blue-700 text-slate-200 hover:text-red-600 hover:bg-yellow-500 ease-in duration-300' style={{ padding: '5px 10px', height: '40px' }}>Цене выше</button>
							</div>
							<div className="mx-2" onClick={resetSort}>
								<button className='rounded p-2 bg-blue-700 text-slate-200 hover:text-red-600 hover:bg-yellow-500 ease-in duration-300' style={{ padding: '5px 10px', height: '40px' }}>Сбросить</button>
							</div>
						</form>
					</div>
					{
						(!!fetchAllData() && fetchAllData().filter(brand => brand.brand == slug).length) == 0 ? 'No products' : ''
					}
					<div className='flex' style={{ flexWrap: 'wrap', justifyContent: 'center' }}>


						{!!fetchAllData() && fetchAllData()
							.filter(brand => brand.brand == slug)
							.filter(function (elem, index, self) {
								return index === self.indexOf(elem);
							})
							.map(item => {
								return <CardItem key={item.id} {...item} />
							})

						}
					</div>
				</div>
			</div>

			<PopularProducts />

			<Footer />
		</>
	)
}

export default FilterProducts
