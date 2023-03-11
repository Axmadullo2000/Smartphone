import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { filterByFewParams } from '../../redux/asyncThunks'
import { CardItem } from '../CardItem'
import TooltipSlider from '../TooltipSlider'

import closeElement from '../../assets/closeElement.svg'
import openElement from '../../assets/openElement.svg'
import up from '../../assets/up.svg'

import './CardFilter.scss'

const CardFilter = ({ slug }) => {
	const [sortType, setSorted] = useState('asc')

	const [showProducts, setShowProducts] = useState(true)

	const [isOpenMemoryFilter, setIsOpenMemoryFilter] = useState(false)
	const [isOpenOperateGiga, setIsOpenOperateGiga] = useState(false)
	const [isOpenFrontCamera, setIsOpenFrontCamera] = useState(false)
	const [isOpenAccumulator, setIsOpenAccumulator] = useState(false)
	const [isOpenYadro, setIsOpenYadro] = useState(false)
	const [isOpenCorpus, setIsOpenCorpus] = useState(false)

	const [count, setCount] = useState(0)

	const [selectedBaseMemory, setSelectedBaseMemory] = useState('')
	const [selectedFastMemory, setSelectedFastMemory] = useState('')
	const [selectedFrontCamera, setSelectedFrontCamera] = useState('')
	const [selectedAccumulator, setSelectedAccumulator] = useState('')
	const [selectedYadra, setSelectedYadra] = useState('')
	const [selectedCorpus, setSelectedCorpus] = useState('')

	const { pathname } = useLocation()

	const { allData, filteredData } = useSelector(data => data.data)

	const maxElementArr = []

	!!allData.results &&
		allData.results.map(item => maxElementArr.push(item.price))

	const maxExpensiveProduct = maxElementArr.sort((a, b) => b - a)[0]

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
				yadra: selectedYadra,
				front_kamera: selectedFrontCamera,
				giga_operate: selectedFastMemory,
				accumulator: selectedAccumulator,
				corpus: selectedCorpus,
				limit: 134,
				offset: 0
			})
		)

		resetFilter()
	}, [slug])

	const handleFilter = e => {
		e.preventDefault()

		setCount(0)

		return dispatch(
			filterByFewParams({
				brand: slug,
				giga_vstoeno: selectedBaseMemory,
				yadra: selectedYadra,
				front_kamera: selectedFrontCamera,
				giga_operate: selectedFastMemory,
				accumulator: selectedAccumulator,
				corpus: selectedCorpus,
				limit: 134,
				offset: 0
			})
		)
	}

	const resetSort = () => {
		setSorted('asc')
	}

	!!allData.results && allData.results.map(item => brand.push(item.brand))

	const filterItems = brand.filter((item, pos) => brand.indexOf(item) == pos)

	const FilterByMemory = () => {
		const dataList = []
		const allCategory = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.giga_vstoeno))

		const uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const FilterByOperativeMemory = () => {
		const dataList = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.giga_operate))

		const allCategory = []

		const uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const FilterByFrontCamera = () => {
		const dataList = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.front_kamera))

		const allCategory = []

		const uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const FilterByAccumulator = () => {
		const dataList = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.accumulator))

		const allCategory = []

		const uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const FilterByYadra = () => {
		const dataList = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.yadra))

		const allCategory = []
		let uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const FilterByCorpus = () => {
		const dataList = []

		allData.results != undefined &&
			allData.results.map(item => dataList.push(item.corpus))

		const allCategory = []
		let uniqueData = dataList
			.filter((item, index) => {
				return dataList.indexOf(item) === index
			})
			.sort((a, b) => a - b)

		uniqueData.map(item => allCategory.push(item))
		return uniqueData
	}

	const resetFilter = () => {
		setSelectedBaseMemory('')
		setSelectedFastMemory('')
		setSelectedFrontCamera('')
		setSelectedAccumulator('')
		setSelectedYadra('')
		setSelectedCorpus('')
	}

	return (
		<div style={{ display: 'flex', marginTop: '13px' }}>
			{showProducts && (
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
										<span>{maxExpensiveProduct}</span>
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
								<img src={openElement} alt='Open element' />
							) : (
								<img src={closeElement} alt='Close element' />
							)}
						</div>
						<form onSubmit={handleFilter}>
							{isOpenMemoryFilter && (
								<div
									className='m-0 p-2'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByMemory().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedBaseMemory === item}
													onChange={e => setSelectedBaseMemory(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} Гб
											</label>
										</div>
									))}
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
										isOpenOperateGiga
											? { color: 'white' }
											: { color: '#D92E15' }
									}
								>
									Оперативная память
								</span>
								{isOpenOperateGiga ? (
									<img src={openElement} alt='Open element' />
								) : (
									<img src={closeElement} alt='Close element' />
								)}
							</div>

							{isOpenOperateGiga && (
								<div
									className='m-0 p-3'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByOperativeMemory().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedFastMemory === item}
													onChange={e => setSelectedFastMemory(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} Гб
											</label>
										</div>
									))}
								</div>
							)}

							<div
								onClick={() => setIsOpenFrontCamera(!isOpenFrontCamera)}
								className='cursor-pointer flex items-center justify-between mt-6 p-4'
								style={
									isOpenFrontCamera
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
										isOpenFrontCamera
											? { color: 'white' }
											: { color: '#D92E15' }
									}
								>
									Фронтальная камера
								</span>
								{isOpenFrontCamera ? (
									<img src={openElement} alt='Open element' />
								) : (
									<img src={closeElement} alt='Close element' />
								)}
							</div>

							{isOpenFrontCamera && (
								<div
									className='m-0 p-2'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByFrontCamera().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedFrontCamera == item}
													onChange={e => setSelectedFrontCamera(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} Мп
											</label>
										</div>
									))}
								</div>
							)}

							<div
								onClick={() => setIsOpenAccumulator(!isOpenAccumulator)}
								className='cursor-pointer flex items-center justify-between mt-6 p-4'
								style={
									isOpenAccumulator
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
										isOpenAccumulator
											? { color: 'white' }
											: { color: '#D92E15' }
									}
								>
									Емкость аккумулятора
								</span>
								{isOpenAccumulator ? (
									<img src={openElement} alt='Open element' />
								) : (
									<img src={closeElement} alt='Close element' />
								)}
							</div>

							{isOpenAccumulator && (
								<div
									className='m-0 p-2'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByAccumulator().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedAccumulator == item}
													onChange={e => setSelectedAccumulator(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} мАч
											</label>
										</div>
									))}
								</div>
							)}

							<div
								onClick={() => setIsOpenYadro(!isOpenYadro)}
								className='cursor-pointer flex items-center justify-between mt-6 p-4'
								style={
									isOpenYadro
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
										isOpenYadro ? { color: 'white' } : { color: '#D92E15' }
									}
								>
									Количество ядер процессора
								</span>
								{isOpenYadro ? (
									<img src={openElement} alt='Open element' />
								) : (
									<img src={closeElement} alt='Close element' />
								)}
							</div>

							{isOpenYadro && (
								<div
									className='m-0 p-2'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByYadra().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedYadra == item}
													onChange={e => setSelectedYadra(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} ядра
											</label>
										</div>
									))}
								</div>
							)}

							<div
								onClick={() => setIsOpenCorpus(!isOpenCorpus)}
								className='cursor-pointer flex items-center justify-between mt-6 p-4'
								style={
									isOpenCorpus
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
										isOpenCorpus ? { color: 'white' } : { color: '#D92E15' }
									}
								>
									Материал корпуса
								</span>
								{isOpenCorpus ? (
									<img src={openElement} alt='Open element' />
								) : (
									<img src={closeElement} alt='Close element' />
								)}
							</div>

							{isOpenCorpus && (
								<div
									className='m-0 p-2'
									style={{ border: '1px solid #D92E15' }}
								>
									{FilterByCorpus().map(item => (
										<div className='radio' style={{ width: '100%' }}>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedCorpus == item}
													onChange={e => setSelectedCorpus(e.target.value)}
													className='hover:text-red-300'
												/>
												{item}
											</label>
										</div>
									))}
								</div>
							)}

							<div className='flex' style={{ flexDirection: 'column' }}>
								<button className='p-2 bg-red-600 text-slate-200 hover:text-white hover:bg-red-800 mt-4'>
									Искать по фильтрам
								</button>
								<button
									onClick={resetFilter}
									className='p-2 bg-white mt-4 resetFilter'
									style={{
										border: '2px solid rgb(217, 46, 21)',
										color: 'rgb(217, 46, 21)'
									}}
								>
									Сбросить Фильтр
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div style={{ width: '100%' }}>
				<div
					className='bg-white flex justify-between rounded items-center mb-10'
					style={{
						width: 'calc(100%-25px)',
						margin: '30px auto',
						padding: '10px',
						boxShadow: '5px 5px 5px red'
					}}
				>
					<div className='flex items-center'>
						<div
							onClick={() => setShowProducts(!showProducts)}
							style={
								showProducts
									? {
											cursor: 'pointer',
											background: '#D92E15',
											border: '2px solid #D92E15',
											color: 'white',
											padding: '10px',
											borderRadius: '5px',
											paddingBottom: '19px',
											paddingTop: '12px'
									  }
									: {
											display: 'flex',
											justifyContent: 'center',
											alignItems: 'center',
											cursor: 'pointer',
											background: '#D92E15',
											border: '2px solid #D92E15',
											padding: '20px',
											borderRadius: '5px',
											paddingBottom: '20px',
											paddingTop: '12px'
									  }
							}
						>
							{showProducts ? (
								<div
									className='flex flex-col'
									style={{
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										width: '22px',
										height: '14px',
										position: 'relative',
										margin: '-5px 8px'
									}}
								>
									<span
										style={{
											width: '20px',
											height: '3px',
											margin: '3px 0',
											background: 'white',
											position: 'absolute',
											top: '49%',
											transform: 'rotate(45deg)'
										}}
									></span>
									<span
										style={{
											width: '20px',
											height: '3px',
											margin: '3px 0',
											background: 'white',
											position: 'absolute',
											top: '49%',
											transform: 'rotate(-45deg)'
										}}
									></span>
								</div>
							) : (
								<div
									className='flex flex-col absolute'
									style={{ width: '22px', height: '14px', margin: '0px 8px' }}
								>
									<span
										style={{
											width: '100%',
											height: '3px',
											margin: '3px 0',
											background: 'white',
											position: 'absolute',
											top: 0
										}}
									></span>
									<span
										style={{
											width: '100%',
											height: '3px',
											margin: '3px 0',
											background: 'white',
											position: 'absolute',
											top: '50%'
										}}
									></span>
									<span
										style={{
											width: '100%',
											height: '3px',
											margin: '3px 0',
											background: 'white',
											position: 'absolute',
											top: '100%'
										}}
									></span>
								</div>
							)}
						</div>
						<h3
							className='text-xl'
							style={{ color: '#223869', marginLeft: '20px' }}
						>
							Сортировать по
						</h3>
					</div>
					<form className='flex' onSubmit={e => e.preventDefault()}>
						<div onClick={() => setSorted('asc')} className='mx-2'>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType == 'asc'
										? {
												background: '#D92E15',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15'
										  }
										: {
												background: 'white',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15',
												color: '#D92E15'
										  }
								}
							>
								Цене ниже
							</button>
						</div>
						<div onClick={() => setSorted('desc')} className='mx-2'>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType == 'desc'
										? {
												background: '#D92E15',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15'
										  }
										: {
												background: 'white',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15',
												color: '#D92E15'
										  }
								}
							>
								Цене выше
							</button>
						</div>
						<div className='mx-2' onClick={resetSort}>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType == 'asc'
										? {
												background: '#D92E15',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15'
										  }
										: {
												background: 'white',
												padding: '5px 10px',
												height: '40px',
												border: '2px solid #D92E15',
												color: '#D92E15'
										  }
								}
							>
								Сбросить
							</button>
						</div>
					</form>
				</div>
				<div>
					<button
						style={{
							position: 'fixed',
							right: '30px',
							bottom: '20px',
							zIndex: 999
						}}
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: 'smooth'
							})
						}}
					>
						<img src={up} alt='up' />
					</button>
				</div>
				<div
					className='flex'
					style={{ flexWrap: 'wrap', justifyContent: 'center' }}
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
