import { Badge } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import Basket from '../../BasketComponent/Basket'

import { getAllData } from '../../../redux/asyncThunks'
import { productsInBasket } from '../../../redux/asyncThunks/Basket'
import { logoutAction } from '../../../redux/slices/AuthSlice'
import { AuthService } from '../../../Service'

import openElement from '../../../assets/bars.svg'
import basket from '../../../assets/basket.svg'
import closeElement from '../../../assets/close.svg'
import loggedinUser from '../../../assets/loggedinUser.svg'
import search from '../../../assets/search.svg'
import user from '../../../assets/user.svg'

import './Header.scss'

const Header = () => {
	const { allData } = useSelector(state => state.data)
	const { userData, loggednIn } = useSelector(auth => auth.auth)
	const { basketData } = useSelector(state => state.basket)
	const ref = useRef(null)
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [basketModalOpen, setBasketModalOpen] = useState(false)
	const [searchItem, setSearchItem] = useState('')
	const [showHistoryTransaction, setShowHistoryTransaction] = useState(false)

	const { pathname } = useLocation()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { t, i18n } = useTranslation()

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
		return brand.indexOf(item) === pos
	})

	useEffect(() => {
		document.addEventListener('click', checkOpening)

		// eslint-disable-next-line
	}, [isMenuOpen])

	const logoutUser = async () => {
		try {
			const response = await AuthService.logout()
			dispatch(logoutAction(response))
		} catch (e) {}
	}

	const name = sessionStorage.getItem('user')

	useEffect(() => {
		if (userData.id !== undefined) {
			dispatch(productsInBasket(userData.id))
		}
	})

	useEffect(() => {
		dispatch(getAllData())
		// eslint-disable-next-line
	}, [dispatch])

	return (
		<>
			<div className='p-2 flex items-center headerComponent'>
				<p className='logo'>
					<Link to='/' className='hover:text-color-red'>
						<span className='text-red-700'>Smart</span>{' '}
						<span className='text-blue-700'>Shop</span>
					</Link>
				</p>

				<div
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					ref={ref}
					className='show_hide__element phoneModelShow flex items-center rounded-lg cursor-pointer'
				>
					{isMenuOpen ? (
						<>
							<img alt='close' width={30} src={closeElement} />
						</>
					) : (
						<>
							<img alt='open' width={30} src={openElement} />
						</>
					)}
					<span className='text-xl text-white'>{t('header.catalog')}</span>
				</div>

				<form onSubmit={searchHandleSubmit}>
					<label htmlFor='search' className='flex relative p-4'>
						<input
							id='search'
							required
							value={searchItem}
							onChange={e => setSearchItem(e.target.value)}
							placeholder={t('header.searchFavourite')}
							type='text'
							className='search_panel ml-5 mt-1 block px-3 p-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm
    '
						/>
						<button className='searchBtn p-3 bg-red-900 text-slate-200 absolute rounded-lg top-6 right-5 hover:bg-red-600'>
							<img src={search} alt='search' />
						</button>
					</label>
				</form>

				<div className='flex items-center header_mainContents'>
					{!loggednIn ? (
						<>
							<button
								className='w-40 flex items-center hover:bg-red-600'
								onClick={() => {
									if (pathname === '/') {
										navigate('/sign-up')
									} else if (pathname === '/sign-up') {
										navigate('/sign-in')
									} else {
										navigate('/sign-up')
									}
								}}
							>
								<img
									width={60}
									height={60}
									src={user}
									alt='user'
									className='bg-slate-100 p-3 rounded-lg'
								/>
								<p className='text-white text-sm ml-2'>
									{t('header.login')} /{t('header.register')}
								</p>
							</button>
						</>
					) : (
						<div className='loggedInUser flex hover:bg-red-600'>
							<img
								src={loggedinUser}
								onClick={() =>
									setShowHistoryTransaction(!showHistoryTransaction)
								}
								className='bg-slate-100 p-3 rounded-lg'
								alt='userLogged'
							/>
							<div className='flex'>
								<p
									className='capitalize text-white ml-2 items-center mt-4'
									onClick={() =>
										setShowHistoryTransaction(!showHistoryTransaction)
									}
								>
									{!!userData.username && userData.username}
									{name}
								</p>
							</div>
						</div>
					)}

					<button
						className='basketBtn flex items-center hover:bg-red-600 ml-4'
						onClick={() => setBasketModalOpen(!basketModalOpen)}
					>
						<Badge
							badgeContent={basketData.length}
							sx={{
								'&.MuiBadge-badge': {
									backgroundColor: 'white',
									color: 'red'
								}
							}}
							color='secondary'
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'right'
							}}
						>
							<img
								src={basket}
								width={34}
								height={34}
								alt='basket'
								className='bg-slate-100 hover:bg-red-100 p-1 ml-5 rounded-lg'
							/>
						</Badge>

						<span className='text-white text-sm ml-2'>
							{t('header.cart')} / {t('header.order')}
						</span>
					</button>
					<select
						defaultValue={i18n.language}
						onChange={e => {
							i18n.changeLanguage(e.target.value)
							localStorage.setItem('lang', e.target.value)
						}}
						className='languageOptions'
					>
						<option value='ru'>{t('header.ru')}</option>
						<option value='uz'>{t('header.uz')}</option>
						<option value='uk'>{t('header.ukr')}</option>
					</select>
				</div>
			</div>

			{isMenuOpen && (
				<div className='show_hide__element catalogItems flex mx-auto p-5'>
					<div>
						<h2 className='text-black mb-2'>{t('header.catalogTitle')}</h2>
						<ul>
							<li className='text-slate-250 opacity-70 hover:opacity-100'>
								<Link to='/products/category/all'>
									{t('header.catalogAll')}
								</Link>
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

			{loggednIn && showHistoryTransaction && (
				<div className='historyTransactions flex mx-auto p-5'>
					<h2 className='history_title'>{t('header.history')}</h2>
					<ul className='flex flex-col'>
						<li className='mt-4'>
							<Link to='/customer/orders/' className='all_transactions'>
								{t('header.allTransactions')}
							</Link>
						</li>
						<li>
							<button onClick={logoutUser} className='logout mt-4 mr-1'>
								{t('header.logout')}
							</button>
						</li>
						<li className='deleteUser_list'>
							<button
								onClick={() => navigate('/remove-account')}
								className='deleteUser'
							>
								{t('header.deleteUser')}
							</button>
						</li>
					</ul>
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
