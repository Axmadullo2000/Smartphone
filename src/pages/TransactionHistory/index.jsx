import { t } from 'i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSuccessFullAsyncThunk } from '../../redux/asyncThunks/Transaction'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { TransactionCard } from '../../components/TransactionCard'

import userIcon from '../../assets/user.svg'

import './TransactionHistory.scss'

export const TransactionHistory = () => {
	const { userData } = useSelector(state => state.auth)
	const { bookedProducts } = useSelector(state => state.payment)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSuccessFullAsyncThunk())
	}, [dispatch])

	return (
		<>
			<Header />
			<ul className='flex mt-5 position_to_left'>
				<li className='checkout_direction'>
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				<li
					style={{ background: '#223869', marginLeft: '10px' }}
					className='checkout_direction'
				>
					{t('buyedProducts.order')}
				</li>
			</ul>

			<div
				className='flex items-center column mt-10 position_to_left'
				style={{ maxWidth: '95%', background: '#D92E15', padding: '20px 30px' }}
			>
				<img
					src={userIcon}
					width={60}
					height={60}
					alt='user'
					style={{ background: 'white', borderRadius: '50%' }}
				/>
				<p className='history_email'>{userData.email}</p>
			</div>

			<h2
				className='mt-5'
				style={{
					fontSize: '24px',
					lineHeight: '20px',
					color: '#D92E15',
					fontWeight: 'bold',
					margin: '30px 30px'
				}}
			>
				{t('buyedProducts.myOrders')}
			</h2>

			{Object.keys(bookedProducts).length > 0 &&
				Object.values(bookedProducts).map((item, index) => (
					<TransactionCard item={item} index={index} />
				))}

			<Footer />
		</>
	)
}
