import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { filterByFewParams } from '../../redux/asyncThunks'
import { CardItem } from '../CardItem'
import TooltipSlider from '../TooltipSlider'

import './CardFilter.scss'

const CardFilter = ({ slug }) => {
	const [sortType, setSorted] = useState('asc')
	const [isOpenMemoryFilter, setIsOpenMemoryFilter] = useState(false)
	const [isOpenOperateGiga, setIsOpenOperateGiga] = useState(false)
	const [count, setCount] = useState(0)
	const [selectedBaseMemory, setSelectedBaseMemory] = useState('')
	const [selectedFastMemory, setSelectedFastMemory] = useState('')
	const { pathname } = useLocation()
	const { allData, filteredData } = useSelector(data => data.data)
	const dispatch = useDispatch()

	let array = []
	const productData = []
	let brand = []

	const fetchData = (products = allData) => {
		let data = []
		if (products.results != undefined) {
			array = [...products.results]
			// filtering with range
			array.filter(product => {
				if (count == 0) {
					productData.push(product)
				} else {
					if (product.price > count[0] && product.price < count[1]) {
						productData.push(product)
					}
				}
			})
			// Asc/Desc filtering
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
		dispatch(
			filterByFewParams({
				brand: slug,
				giga_vstoeno: selectedBaseMemory,
				yadra: '',
				front_kamera: '',
				giga_operate: selectedFastMemory,
				accumulator: '',
				corpus: '',
				limit: 134,
				offset: 0
			})
		)
	}, [slug])

	const handleFilter = e => {
		e.preventDefault()

		return dispatch(
			filterByFewParams({
				brand: slug,
				giga_vstoeno: selectedBaseMemory,
				yadra: '',
				front_kamera: '',
				giga_operate: selectedFastMemory,
				accumulator: '',
				corpus: '',
				limit: 134,
				offset: 0
			})
		)
	}

	const onSort = () => {
		const sortOrder = sortType === 'asc' ? 'desc' : 'asc'
		setSorted(sortOrder)
	}

	const resetSort = () => {
		setSorted('asc')
	}

	!!allData.results && allData.results.map(item => brand.push(item.brand))

	const filterItems = brand.filter((item, pos) => brand.indexOf(item) == pos)

	return (
		<div style={{ display: 'flex', marginTop: '13px' }}>
			<div
				style={{
					width: '400px',
					background: '#f6f6f6',
					padding: '20px 35px',
					lineHeight: '30px'
				}}
			>
				<h3 className='text-xl text-red-700'>
					<span className='capitalize'>
						{slug != 'all' ? slug : 'Все '} Смартфоны
					</span>
				</h3>
				<div>
					{pathname == '/products/category/all' ? (
						<Link to='/products/category/all' className='text-red-700'>
							Все Смартфоны
						</Link>
					) : (
						<Link to='/products/category/all' className='text-red-450'>
							Все Смартфоны
						</Link>
					)}

					{filterItems.map(item => (
						<p key={item} className='capitalize'>
							{pathname == `/products/category/${item}` ? (
								<Link
									to={`/products/category/${item}`}
									style={{ color: 'red' }}
								>
									{item}
								</Link>
							) : (
								<Link to={`/products/category/${item}`}>{item}</Link>
							)}
						</p>
					))}
				</div>

				<div style={{ width: '100%' }}>
					<h3
						className='text-xl py-2'
						style={{
							color: '#223869'
						}}
					>
						Стоимость
					</h3>
					{
						<>
							{count == 0 ? (
								<div className='flex justify-between text-red-500 text-xl'>
									<span>{count}</span>
									<span>{2300000}</span>
								</div>
							) : (
								<div className='flex justify-between text-xl text-red-500'>
									<span>{count[0]}</span>
									<span>{count[1]}</span>
								</div>
							)}
						</>
					}

					<div style={{ width: 320, margin: '20px 0px' }}>
						<TooltipSlider
							onChange={value => setCount(value)}
							range
							min={0}
							max={23000000}
							defaultValue={[0, 23000000]}
							tipFormatter={value => `${value} сум`}
						/>
					</div>
				</div>
				<div>
					Filter items
					<div
						onClick={() => setIsOpenMemoryFilter(!isOpenMemoryFilter)}
						className='cursor-pointer flex items-center justify-between mt-6 p-4'
						style={
							isOpenMemoryFilter
								? { border: '2px solid D92E15', background: '#D92E15' }
								: {
										border: '2px solid #D92E15',
										background: 'white'
								  }
						}
					>
						<span
							id='operative_memory'
							style={
								isOpenMemoryFilter ? { color: 'white' } : { color: '#D92E15' }
							}
						>
							Встроенная память
						</span>
						{isOpenMemoryFilter ? (
							<svg
								style={{ transform: 'rotate(90deg)', transition: '.5s ease' }}
								width='12'
								height='20'
								viewBox='0 0 12 20'
								fill='white'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M0.444197 10.7804L9.34445 19.6805C9.5503 19.8865 9.8251 20 10.1181 20C10.4111 20 10.6859 19.8865 10.8918 19.6805L11.5472 19.0252C11.9737 18.5982 11.9737 17.9042 11.5472 17.4779L4.07344 10.0041L11.5555 2.52209C11.7613 2.31608 11.875 2.04144 11.875 1.7486C11.875 1.45543 11.7613 1.1808 11.5555 0.974623L10.9 0.319508C10.694 0.113493 10.4194 -1.7801e-06 10.1264 -1.75448e-06C9.83339 -1.72887e-06 9.55859 0.113493 9.35274 0.319508L0.444197 9.22773C0.237857 9.43439 0.124525 9.71033 0.125176 10.0037C0.124525 10.2981 0.237857 10.5739 0.444197 10.7804Z'
									fill='white'
								/>
							</svg>
						) : (
							<svg
								style={{ transform: 'rotate(270deg)', transition: '.5s ease' }}
								width='12'
								height='20'
								viewBox='0 0 12 20'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M0.444197 10.7804L9.34445 19.6805C9.5503 19.8865 9.8251 20 10.1181 20C10.4111 20 10.6859 19.8865 10.8918 19.6805L11.5472 19.0252C11.9737 18.5982 11.9737 17.9042 11.5472 17.4779L4.07344 10.0041L11.5555 2.52209C11.7613 2.31608 11.875 2.04144 11.875 1.7486C11.875 1.45543 11.7613 1.1808 11.5555 0.974623L10.9 0.319508C10.694 0.113493 10.4194 -1.7801e-06 10.1264 -1.75448e-06C9.83339 -1.72887e-06 9.55859 0.113493 9.35274 0.319508L0.444197 9.22773C0.237857 9.43439 0.124525 9.71033 0.125176 10.0037C0.124525 10.2981 0.237857 10.5739 0.444197 10.7804Z'
									fill='#D92E15'
								/>
							</svg>
						)}
					</div>
					<form onSubmit={handleFilter}>
						{isOpenMemoryFilter && (
							<div className='m-0 p-2' style={{border: '1px solid #D92E15'}}>
								<div className='radio' style={{ width: '100%' }}>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='32'
											checked={selectedBaseMemory === '32'}
											onChange={e => setSelectedBaseMemory(e.target.value)}
											className='hover:text-red-300'
										/>
										32
									</label>
								</div>
								<div className='radio'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='64'
											checked={selectedBaseMemory === '64'}
											onChange={e => setSelectedBaseMemory(e.target.value)}
										/>
										64
									</label>
								</div>
								<div className='radio'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='128'
											checked={selectedBaseMemory === '128'}
											onChange={e => setSelectedBaseMemory(e.target.value)}
										/>
										128
									</label>
								</div>
								<div className='radio cursor-pointer'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											className='required:border-red-500 indeterminate:bg-gray-300 p-12'
											type='radio'
											value={'256'}
											checked={selectedBaseMemory === '256'}
											onChange={e => setSelectedBaseMemory(e.target.value)}
										/>
										256
									</label>
								</div>
							</div>
						)}

						<div
							onClick={() => setIsOpenOperateGiga(!isOpenOperateGiga)}
							className='cursor-pointer flex items-center justify-between mt-6 p-4'
							style={
								isOpenOperateGiga
									? { border: '2px solid #D92E15', background: '#D92E15' }
									: {
											border: '2px solid #D92E15',
											background: 'white'
									  }
							}
						>
							<span
								id='operative_memory'
								style={
									isOpenOperateGiga ? { color: 'white' } : { color: '#D92E15' }
								}
							>
								Оперативная память
							</span>
							{isOpenOperateGiga ? (
								<svg
									style={{ transform: 'rotate(90deg)', transition: '.5s ease' }}
									width='12'
									height='20'
									viewBox='0 0 12 20'
									fill='white'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M0.444197 10.7804L9.34445 19.6805C9.5503 19.8865 9.8251 20 10.1181 20C10.4111 20 10.6859 19.8865 10.8918 19.6805L11.5472 19.0252C11.9737 18.5982 11.9737 17.9042 11.5472 17.4779L4.07344 10.0041L11.5555 2.52209C11.7613 2.31608 11.875 2.04144 11.875 1.7486C11.875 1.45543 11.7613 1.1808 11.5555 0.974623L10.9 0.319508C10.694 0.113493 10.4194 -1.7801e-06 10.1264 -1.75448e-06C9.83339 -1.72887e-06 9.55859 0.113493 9.35274 0.319508L0.444197 9.22773C0.237857 9.43439 0.124525 9.71033 0.125176 10.0037C0.124525 10.2981 0.237857 10.5739 0.444197 10.7804Z'
										fill='white'
									/>
								</svg>
							) : (
								<svg
									style={{
										transform: 'rotate(270deg)',
										transition: '.5s ease'
									}}
									width='12'
									height='20'
									viewBox='0 0 12 20'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M0.444197 10.7804L9.34445 19.6805C9.5503 19.8865 9.8251 20 10.1181 20C10.4111 20 10.6859 19.8865 10.8918 19.6805L11.5472 19.0252C11.9737 18.5982 11.9737 17.9042 11.5472 17.4779L4.07344 10.0041L11.5555 2.52209C11.7613 2.31608 11.875 2.04144 11.875 1.7486C11.875 1.45543 11.7613 1.1808 11.5555 0.974623L10.9 0.319508C10.694 0.113493 10.4194 -1.7801e-06 10.1264 -1.75448e-06C9.83339 -1.72887e-06 9.55859 0.113493 9.35274 0.319508L0.444197 9.22773C0.237857 9.43439 0.124525 9.71033 0.125176 10.0037C0.124525 10.2981 0.237857 10.5739 0.444197 10.7804Z'
										fill='red'
									/>
								</svg>
							)}
						</div>

						{isOpenOperateGiga && (
							<div className='m-0 p-3' style={{border: '1px solid #D92E15', }}>
								<div className='radio' style={{ width: '100%' }}>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='2'
											checked={selectedFastMemory === '2'}
											onChange={e => setSelectedFastMemory(e.target.value)}
											className='hover:text-red-300'
										/>
										2
									</label>
								</div>
								<div className='radio'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='3'
											checked={selectedFastMemory === '3'}
											onChange={e => setSelectedFastMemory(e.target.value)}
										/>
										3
									</label>
								</div>
								<div className='radio'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											type='radio'
											value='4'
											checked={selectedFastMemory === '4'}
											onChange={e => setSelectedFastMemory(e.target.value)}
										/>
										4
									</label>
								</div>
								<div className='radio cursor-pointer'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											className='required:border-red-500 indeterminate:bg-gray-300 p-12'
											type='radio'
											value={'6'}
											checked={selectedFastMemory === '6'}
											onChange={e => setSelectedFastMemory(e.target.value)}
										/>
										6
									</label>
								</div>
								<div className='radio cursor-pointer'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											className='required:border-red-500 indeterminate:bg-gray-300 p-12'
											type='radio'
											value={'8'}
											checked={selectedFastMemory === '8'}
											onChange={e => setSelectedFastMemory(e.target.value)}
										/>
										8
									</label>
								</div>
								<div className='radio cursor-pointer'>
									<label className='block w-full cursor-pointer'>
										<input
											style={{ margin: '0 12px 0 0' }}
											className='required:border-red-500 indeterminate:bg-gray-300 p-12'
											type='radio'
											value={'12'}
											checked={selectedFastMemory === '12'}
											onChange={e => setSelectedFastMemory(e.target.value)}
										/>
										12
									</label>
								</div>
							</div>
						)}

						<button className='p-2 bg-red-600 text-slate-200 hover:text-white hover:bg-red-800 mt-4'>
							Искать по фильтрам
						</button>
					</form>
				</div>
			</div>
			<div>
				<div
					className='bg-white flex justify-between rounded items-center mb-10'
					style={{
						width: 'calc(100%-25px)',
						margin: '30px auto',
						padding: '10px',
						boxShadow: '5px 5px 5px red'
					}}
				>
					<h3 className='text-xl' style={{ color: '#223869' }}>
						Сортировать по
					</h3>
					<form className='flex' onSubmit={e => e.preventDefault()}>
						<div onClick={onSort} className='mx-2'>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={{
									background: '#D92E15',
									padding: '5px 10px',
									height: '40px'
								}}
							>
								Цене ниже
							</button>
						</div>
						<div onClick={onSort} className='mx-2'>
							<button
								className='rounded p-2 text-slate-200 hover:text-red-600 hover:bg-yellow-500 ease-in duration-300'
								style={{
									background: 'white',
									border: '2px solid #D92E15',
									color: '#D92E15',
									padding: '5px 10px',
									height: '40px'
								}}
							>
								Цене выше
							</button>
						</div>
						<div className='mx-2' onClick={resetSort}>
							<button
								className='rounded p-2 text-slate-200 ease-in duration-300'
								style={{
									background: '#D92E15',
									padding: '5px 10px',
									height: '40px'
								}}
							>
								Сбросить
							</button>
						</div>
					</form>
				</div>
				<div
					className='flex'
					style={{ flexWrap: 'wrap', justifyContent: 'start' }}
				>
					{slug == 'all'
						? !!fetchData() &&
						  fetchData()
								.filter(function (elem, index, self) {
									return index === self.indexOf(elem)
								})
								.map((item, index) => <CardItem key={index} {...item} />)
						: !!fetchData(filteredData) &&
						  fetchData(filteredData)
								.filter(brand => brand.brand == slug)
								.filter(function (elem, index, self) {
									return index === self.indexOf(elem)
								})
								.map(item => {
									return <CardItem key={item.id} {...item} />
								})}
				</div>
			</div>
		</div>
	)
}

export default CardFilter
