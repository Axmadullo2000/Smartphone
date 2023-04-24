import { t } from 'i18next'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

import { filterByFewParams } from '../../redux/asyncThunks'
import { CardItem } from '../Layouts/CardItem'
import TooltipSlider from './TooltipSlider'

import bars from '../../assets/bars.svg'
import closeSidebar from '../../assets/close.svg'

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
		if (!!products.results) {
			array = [...products.results]
			// filtering with range
			array.filter(product => {
				if (count === 0) {
					productData.push(product)
				} else {
					if (product.price > count[0] && product.price < Number(count[1])) {
						productData.push(product)
					}
				}
				return productData
			})
			// Asc/Desc filtering
			if (sortType === 'asc') {
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
		// eslint-disable-next-line
	}, [dispatch, filterByFewParams])

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

	const filterItems = brand.filter((item, pos) => brand.indexOf(item) === pos)

	const FilterByMemory = () => {
		const dataList = []
		const allCategory = []

		!!allData.results &&
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

		!!allData.results &&
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

		!!allData.results &&
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

		!!allData.results &&
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

		!!allData.results && allData.results.map(item => dataList.push(item.yadra))

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

		!!allData.results && allData.results.map(item => dataList.push(item.corpus))

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

	const language = localStorage.getItem('lang')
		? localStorage.getItem('lang')
		: 'uz'

	return (
		<div className='cardFilterContainer'>
			{showProducts && (
				<div className='filterByBrand'>
					<h3 className='text-xl text-red-700'>
						<span className='capitalize'>
							{slug !== 'all' ? slug : 'Все '} {t('cardFilter.smartPhone')}
						</span>
					</h3>
					<div>
						{pathname === '/products/category/all' ? (
							<Link
								to='/products/category/all'
								className='brandLink text-red-700 hover:text-red-450'
							>
								{t('header.catalogAll')}
							</Link>
						) : (
							<Link
								to='/products/category/all'
								className='brandLink text-red-450 hover:text-red-450'
							>
								{t('header.catalogAll')}
							</Link>
						)}

						{filterItems.map(item => (
							<p key={item} className='capitalize'>
								{pathname === `/products/category/${item}` ? (
									<Link
										className='brandLink hover:text-red-450'
										to={`/products/category/${item}`}
										style={{ color: '#d92e15' }}
									>
										{item}
									</Link>
								) : (
									<Link
										className='brandLink hover:text-red-450'
										to={`/products/category/${item}`}
									>
										{item}
									</Link>
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
							{t('cardFilter.price')}
						</h3>
						{
							<>
								{count === 0 ? (
									<div className='flex justify-between text-red-500 text-xl'>
										{language === 'uz' && (
											<span className='price'>{count} so'm</span>
										)}
										{language === 'ru' && (
											<span className='price'>
												{Number(count / 140.25).toFixed(1)} рублей
											</span>
										)}
										{language === 'uk' && (
											<>
												<span className='price'>
													{Number(count / 309.98).toFixed(0)} гривень
												</span>
											</>
										)}
										<>
											{!!allData.results && language === 'uz' && (
												<span className='price'>
													{maxExpensiveProduct} so'm
												</span>
											)}
											{!!allData.results && language === 'ru' && (
												<span className='price'>
													{Number(maxExpensiveProduct / 140.25).toFixed(1)}{' '}
													рублей
												</span>
											)}
											{!!allData.results && language === 'uk' && (
												<span className='price'>
													{Number(maxExpensiveProduct / 309.98).toFixed(1)}{' '}
													гривень
												</span>
											)}
										</>
									</div>
								) : (
									<div className='flex justify-between text-xl text-red-500'>
										{language === 'uz' && (
											<>
												{' '}
												<span className='price'>{count[0]} so'm</span>
												<span className='price'>{count[1]} so'm</span>
											</>
										)}
										{language === 'ru' && (
											<>
												<span className='price'>
													{Number(count[0] / 140.25).toFixed(0)} рублей
												</span>
												<span className='price'>
													{Number(count[1] / 140.25).toFixed(0)} рублей
												</span>
											</>
										)}
										{language === 'uk' && (
											<>
												{' '}
												<span className='price'>
													{Number(count[0] / 309.98).toFixed(0)} гривень
												</span>
												<span className='price'>
													{Number(count[1] / 309.98).toFixed(0)} гривень
												</span>
											</>
										)}
									</div>
								)}
							</>
						}

						<div
							className='price_filter'
							style={{ width: 320, margin: '20px 0px' }}
						>
							{language === 'uz' && (
								<TooltipSlider
									onChange={value => setCount(value)}
									range
									min={0}
									max={maxExpensiveProduct}
									defaultValue={[0, maxExpensiveProduct]}
									tipFormatter={value => `${value} so'm`}
								/>
							)}
							{language === 'ru' && (
								<TooltipSlider
									onChange={value => setCount(value)}
									range
									min={0}
									max={maxExpensiveProduct}
									defaultValue={[0, maxExpensiveProduct]}
									tipFormatter={value =>
										`${Number(value / 140.25).toFixed(1)} рублей`
									}
								/>
							)}
							{language === 'uk' && (
								<TooltipSlider
									onChange={value => setCount(value)}
									range
									min={0}
									max={maxExpensiveProduct}
									defaultValue={[0, maxExpensiveProduct]}
									tipFormatter={value =>
										`${Number(value / 309.98).toFixed(1)} гривень`
									}
								/>
							)}
						</div>
					</div>
					<div>
						{t('cardFilter.filterItem')}
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
								{t('cardFilter.memory')}
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
									{FilterByMemory().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedBaseMemory === item}
													onChange={e => setSelectedBaseMemory(e.target.value)}
													className='hover:text-red-300'
												/>
												{item}
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
									{t('cardFilter.operativeMemory')}
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
									{FilterByOperativeMemory().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedFastMemory === item}
													onChange={e => setSelectedFastMemory(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} {t('cardFilter.gb')}
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
									{t('cardFilter.camera')}
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
									{FilterByFrontCamera().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedFrontCamera === item}
													onChange={e => setSelectedFrontCamera(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} {t('cardFilter.mp')}
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
									{t('cardFilter.acumlator')}
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
									{FilterByAccumulator().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedAccumulator === item}
													onChange={e => setSelectedAccumulator(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} {t('cardFilter.amper')}
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
									{t('cardFilter.protsessor')}
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
									{FilterByYadra().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedYadra === item}
													onChange={e => setSelectedYadra(e.target.value)}
													className='hover:text-red-300'
												/>
												{item} {t('cardFilter.yadr')}
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
									{t('cardFilter.copus')}
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
									{FilterByCorpus().map((item, index) => (
										<div
											key={index}
											className='radio'
											style={{ width: '100%' }}
										>
											<label className='block w-full cursor-pointer'>
												<input
													style={{ margin: '0 12px 0 0' }}
													type='radio'
													value={item}
													checked={selectedCorpus === item}
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
									{t('cardFilter.searchByFilter')}
								</button>
								<button
									onClick={resetFilter}
									className='p-2 bg-white mt-4 resetFilter'
									style={{
										border: '2px solid rgb(217, 46, 21)',
										color: 'rgb(217, 46, 21)'
									}}
								>
									{t('cardFilter.clearFilter')}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}

			<div style={{ width: '100%' }}>
				<div className='bg-white flex justify-between rounded items-center mb-10 filterByPrice'>
					<div className='flex items-center'>
						<div
							onClick={() => setShowProducts(!showProducts)}
							className={
								showProducts ? 'show_sidebar_filter' : 'hide_sidebar_filter'
							}
						>
							{showProducts ? (
								<div className=''>
									<img
										src={closeSidebar}
										width={35}
										height={35}
										alt={'close'}
									/>
								</div>
							) : (
								<div className=''>
									<img src={bars} width={35} height={35} alt={'open'} />
								</div>
							)}
						</div>
						<h3
							className='text-xl'
							style={{ color: '#223869', marginLeft: '20px' }}
						>
							{t('cardFilter.sort')}
						</h3>
					</div>
					<form
						className='flex priceFilterForm'
						onSubmit={e => e.preventDefault()}
					>
						<div onClick={() => setSorted('asc')} className='mx-2'>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType === 'asc'
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
								{t('cardFilter.priceBelow')}
							</button>
						</div>
						<div onClick={() => setSorted('desc')} className='mx-2'>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType === 'desc'
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
								{t('cardFilter.priceHigher')}
							</button>
						</div>
						<div className='mx-2' onClick={resetSort}>
							<button
								className='rounded text-slate-200 ease-in duration-300'
								style={
									sortType === 'asc'
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
								{t('cardFilter.clear')}
							</button>
						</div>
					</form>
				</div>
				<div>
					<button
						className='fixedDirectUp'
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: 'smooth'
							})
						}}
					>
						<img src={up} alt='up' width={50} />
					</button>
				</div>
				<div className='cardFilter'>
					{slug === 'all'
						? !!fetchData() &&
						  fetchData()
								.filter(function (elem, index, self) {
									return index === self.indexOf(elem)
								})
								.map((item, index) => <CardItem key={index} {...item} />)
						: !!fetchData(filteredData) &&
						  fetchData(filteredData)
								.filter(brand => brand.brand === slug)
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
