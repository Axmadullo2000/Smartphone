import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Basket from '../Basket'

import { logoutAction } from '../../redux/slices/AuthSlice'
import { AuthService } from '../../Service'

import basket from '../../assets/basket.svg'
import headphone from '../../assets/headphone.svg'
import loggedinUser from '../../assets/loggedinUser.svg'
import user from '../../assets/user.svg'

import { getAllData } from '../../redux/asyncThunks'
import './Header.scss'

const Header = () => {
	const { allData } = useSelector(state => state.data)
	const { userData, loggednIn } = useSelector(auth => auth.auth)
	const ref = useRef()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [basketModalOpen, setBasketModalOpen] = useState(false)
	const [searchItem, setSearchItem] = useState('')
	const { pathname } = useLocation()
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

	const brands = brand.filter(function (item, pos) {
		return brand.indexOf(item) == pos
	})

	useEffect(() => {
		document.addEventListener('click', checkOpening)
	}, [isMenuOpen])

	const logoutUser = async () => {
		try {
			const response = await AuthService.logout()
			dispatch(logoutAction(response))
		} catch (e) {}
	}

	console.log(loggednIn)
	useEffect(() => {
		dispatch(getAllData())
	}, [])
	return (
		<>
			<div
				className='p-2 flex items-center'
				style={{ boxShadow: '2px 5px 2px red', background: '#D92E15' }}
			>
				<div className=''>
					<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-slate-500/50 rounded-lg cursor-pointer'>
						<Link to='/' className='opacity-75 hover:opacity-100'>
							<span className='text-red-700'>Smart</span>{' '}
							<span className='text-blue-700'>Shop</span>
						</Link>
					</p>
				</div>
				{isMenuOpen ? (
					<div
						onClick={() => setIsMenuOpen(oldState => !oldState)}
						ref={ref}
						className='flex items-center bg-slate-200	rounded-lg cursor-pointer hover:bg-slate-100'
						style={{ width: '130px', padding: '10px' }}
					>
						<div
							className='flex flex-col'
							style={{
								width: '22px',
								height: '14px',
								position: 'relative'
							}}
						>
							<span
								style={{
									width: '20px',
									height: '3px',
									background: '#585858',
									position: 'absolute',
									top: '49%',
									transform: 'rotate(45deg)'
								}}
							></span>
							<span
								style={{
									width: '20px',
									height: '3px',
									background: '#585858',
									position: 'absolute',
									top: '49%',
									transform: 'rotate(-45deg)'
								}}
							></span>
						</div>
						<div className='text-xl opacity-60'>Каталог</div>
					</div>
				) : (
					<div
						onClick={() => setIsMenuOpen(oldState => !oldState)}
						className='flex items-center bg-slate-100 rounded-lg cursor-pointer hover:bg-red-600'
						style={{ padding: '15px ' }}
					>
						<div
							className='relative'
							style={{
								width: '22px',
								height: '14px',
								margin: '0px 8px'
							}}
						>
							<span
								style={{
									width: '100%',
									height: '3px',
									background: '#585858',
									position: 'absolute',
									top: '0'
								}}
							></span>
							<span
								style={{
									width: '100%',
									height: '3px',
									background: '#585858',
									position: 'absolute',
									top: '50%',
									transform: 'translateY(-50%)'
								}}
							></span>
							<span
								style={{
									width: '100%',
									height: '3px',
									background: '#585858',
									position: 'absolute',
									bottom: '0'
								}}
							></span>
						</div>
						<div
							className='text-xl opacity-60'
							style={{
								fontSize: '18px'
							}}
						>
							Каталог
						</div>
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
							className='search_panel ml-5 mt-1 block px-3 p-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
						/>
						<button className='p-3 bg-red-900 text-slate-200 absolute rounded-lg top-6 right-5 hover:bg-red-600'>
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

				{!loggednIn ? (
					<button
						className='w-40 flex hover:bg-red-600'
						onClick={() => {
							if (pathname == '/') {
								navigate('/sign-up')
							} else if (pathname == '/sign-up') {
								navigate('/sign-in')
							} else {
								navigate('/sign-up')
							}
						}}
					>
						<img
							src={user}
							alt=''
							className='bg-slate-100 hover:bg-red-900 p-3 rounded-lg'
						/>
						<p className='text-white text-sm ml-2'>Вход /Регистрация</p>
					</button>
				) : (
					<div className='w-40 flex hover:bg-red-600'>
						<img
							src={loggedinUser}
							alt=''
							className='bg-slate-100 p-3 rounded-lg'
						/>
						<div className=''>
							<p className='text-white text-sm ml-2'>
								{!!userData.username && userData.username}
							</p>
							<button onClick={logoutUser} className='ml-2 mt-2'>
								Выход
							</button>
						</div>
					</div>
				)}

				<button
					className='w-40 flex items-center ml-4 hover:bg-red-600'
					onClick={() => setBasketModalOpen(old => !old)}
				>
					<img
						src={basket}
						width={34}
						height={34}
						alt=''
						className='bg-slate-100 hover:bg-red-100 p-1 ml-5 rounded-lg'
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
								<Link to='/products/category/all'>Все Смартфоны</Link>
							</li>
							{brands.map(item => {
								return (
									<li
										key={item}
										className='capitalize text-slate-500 hover:text-black'
									>
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
