import { t } from 'i18next'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getSuccessFullAsyncThunk } from '../../redux/asyncThunks/Transaction'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { TransactionCard } from '../../components/TransactionCard'

import userIcon from '../../assets/user.svg'

export const TransactionHistory = () => {
	const dispatch = useDispatch()
	const { userData } = useSelector(state => state.auth)
	const { bookedProducts } = useSelector(state => state.payment)

	useEffect(() => {
		dispatch(getSuccessFullAsyncThunk())
	}, [])
	return (
		<>
			<Header />
			<ul className='flex ml-7 mt-5'>
				<li className='checkout_direction'>
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				<li
					style={{ background: '#223869', marginLeft: '10px' }}
					className='checkout_direction'
				>
					Заказы
				</li>
			</ul>

			<div
				className='flex items-center column ml-7 mt-10 px-14 py-8'
				style={{ maxWidth: '1340px', background: '#D92E15' }}
			>
				<img
					src={userIcon}
					width={60}
					height={60}
					style={{ background: 'white', borderRadius: '50%' }}
				/>
				<p
					style={{
						color: '#fff',
						fontSize: '24px',
						marginLeft: '22px',
						fontWeight: 'bold'
					}}
				>
					{userData.email}
				</p>
			</div>

			<h2
				className='ml-7 mt-5'
				style={{
					fontSize: '24px',
					lineHeight: '20px',
					color: '#D92E15',
					fontWeight: 'bold',
					margin: '30px 30px'
				}}
			>
				Мои Заказы
			</h2>

			{Object.keys(bookedProducts).length > 0 &&
				Object.values(bookedProducts).map((item, index) => (
					<TransactionCard item={item} index={index} />
				))}

			<Footer />
		</>
	)
}
