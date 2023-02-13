import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'

import Basket from '../Basket'
import { getAllData } from '../../redux/asyncThunks'

import user from '../../assets/user.svg'
import basket from '../../assets/basket.svg'
import headphone from '../../assets/headphone.svg'

import './Header.scss'

const Header = () => {
	const { data, allData } = useSelector(state => state.data)
	const ref = useRef()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [basketModalOpen, setBasketModalOpen] = useState(false)
	const [searchItem, setSearchItem] = useState('')
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const brand = []

	const checkOpening = e => {
		if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
			setIsMenuOpen(false)
		}
	}

	const searchHandleSubmit = e => {
		e.preventDefault()
		navigate(`/search/${searchItem}`)
	}

	!!allData.results && allData.results.map(item => brand.push(item.brand))
	useEffect(() => {
		dispatch(getAllData())
	}, [])

	const brands = brand.filter(function (item, pos) {
		return brand.indexOf(item) == pos
	})

	useEffect(() => {
		document.addEventListener('click', checkOpening)
	}, [isMenuOpen])

	return (
		<>
			<div className='p-2 flex items-center' style={{ boxShadow: '2px 5px 2px red', background: '#D92E15' }}>
				<div className=''>
					<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-slate-500/50 rounded-lg cursor-pointer'>
						<Link to='/'>
							<span className='text-red-700 hover:text-red-900'>Smart</span>{' '}
							<span className='text-blue-700 hover:text-blue-900'>Shop</span>
						</Link>
					</p>
				</div>
				{isMenuOpen ? (
					<div
						onClick={() => setIsMenuOpen(oldState => !oldState)}
						ref={ref}
						className='flex items-center bg-white	 p-3.5 rounded-lg cursor-pointer hover:bg-white'
						style={{ width: '130px' }}
					>
						<div className='flex flex-col'>
							<svg
								width='40px'
								height='38px'
								viewBox='0 0 24 24'
								fill='black'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fillRule='evenodd'
									clipRule='evenodd'
									d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
									fill='black'
								/>
							</svg>
						</div>
						<div className='ml-0 text-xl opacity-60'>Каталог</div>
					</div>
				) : (
					<div
						onClick={() => setIsMenuOpen(oldState => !oldState)}
						className='flex items-center bg-slate-100 p-3.5 rounded-lg cursor-pointer hover:bg-red-500'
						style={{ width: '130px' }}
					>
						<div className='flex flex-col'>
							<span
								style={{
									width: '20px',
									height: '4px',
									margin: '3px 0',
									background: '#585858',
								}}
							></span>
							<span
								style={{
									width: '20px',
									height: '4px',
									margin: '3px 0',
									background: '#585858',
								}}
							></span>
							<span
								style={{
									width: '22px',
									height: '4px',
									margin: '3px 0',
									background: '#585858',
								}}
							></span>
						</div>
						<div className='ml-3 text-xl opacity-60'>Каталог</div>
					</div>
				)}

				<form onSubmit={searchHandleSubmit}>
					<label htmlFor='search' className='flex relative p-4'>
						<input
							id='search'
							required
							value={searchItem}
							onChange={e => setSearchItem(e.target.value)}
							placeholder={'Search your favourite smartphones'}
							style={{ width: '450px' }}
							type='text'
							className='ml-5 mt-1 block px-3 p-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
						/>
						<button className='p-3 bg-blue-900 text-slate-200 absolute rounded-lg top-6 right-5 hover:bg-red-900'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 50 50'
								width='50px'
								height='50px'
								style={{ width: '24px', height: '24px' }}
							>
								<path
									style={{ fill: 'white' }}
									d='M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z'
								/>
							</svg>
						</button>
					</label>
				</form>

				<button
					className='w-40 flex hover:bg-red-900	'
					onClick={() => navigate('/sign-up')}
				>
					<img
						src={user}
						alt=''
						className='bg-slate-100 hover:bg-red-900 p-3 rounded-lg'
					/>
					<p className='text-white text-sm ml-2'>Вход / Регистрация</p>
				</button>
				<button
					className='w-40 flex items-center ml-4 hover:bg-red-900'
					onClick={() => setBasketModalOpen(old => !old)}
				>
					<img
						src={basket}
						width={34}
						height={34}
						alt=''
						className='bg-slate-100 hover:bg-red-700 p-1 ml-5 rounded-lg'
					/>
					<span className='text-white text-sm ml-2'>
						Корзина / Оформление заказа
					</span>
				</button>
				<button className='w-70 p-3 flex ml-5'>
					<img
						className='bg-slate-10'
						src={headphone}
						width={36}
						height={36}
						alt=''
					/>
					<p className='text-white text-2xl ml-2'>(91) 792 12 32</p>
				</button>
			</div>

			{isMenuOpen && (
				<div
					className='flex mx-auto p-5'
					style={{ width: '750px', background: 'rgb(255, 254, 256)' }}
				>
					<div>
						<h2 className='text-black mb-2'>Средства связи</h2>
						<ul>
							<li className='text-slate-250 opacity-70 hover:opacity-100'>
								Все смартфоны
							</li>
							{brands.map(item => {
								return (
									<li className='capitalize hover:text-red-600'>
										<Link to={`/products/category/${item}`}>{item}</Link>{' '}
									</li>
								)
							})}
						</ul>
					</div>
				</div>
			)}

			<Basket
				basketModalOpen={basketModalOpen}
				setBasketModalOpen={setBasketModalOpen}
			/>
		</>
	)
}

export default Header
