import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { BasketCard } from '../BasketCard'

import close from '../../assets/close.svg'

import './Basket.scss'

const Basket = ({ basketModalOpen, setBasketModalOpen }) => {
	const { t } = useTranslation()
	const { basketData } = useSelector(state => state.basket)
	const ref = useRef()
	const checkIfClickedOutside = e => {
		if (basketModalOpen && ref.current && !ref.current.contains(e.target)) {
			setBasketModalOpen(false)
		}
	}

	const navigate = useNavigate()

	const totalPrice =
		!!basketData.length && basketData.reduce((acc, item) => acc + item.price, 0)

	useEffect(() => {
		document.addEventListener('mousedown', checkIfClickedOutside)
	}, [basketModalOpen])

	return (
		<>
			{basketModalOpen && (
				<div
					className='p-10 fixed right-0 h-full'
					style={{
						width: '700px',
						zIndex: 999,
						background: 'white',
						height: '100vh',
						overflow: 'scroll'
					}}
					ref={ref}
				>
					{!!basketData.length && basketData.length > 0 ? (
						<div>
							<div>
								<button
									onClick={() => setBasketModalOpen(old => !old)}
									style={{ position: 'absolute', right: '0px', top: '35px' }}
								>
									<img src={close} alt='close button' />
								</button>
								<div className='flex justify-between'>
									<h2
										style={{
											color: '#223869',
											fontSize: '24px',
											lineHeight: '30px',
											fontWeight: 'bold',
											fontStyle: 'normal'
										}}
									>
										<p>{t('basket.yourCart')}</p>
									</h2>
									<Link
										to='/customer/cart/'
										style={{
											padding: '8px 50px 8px 32px',
											background: '#F0F0F0',
											marginRight: '22px',
											color: '#223869'
										}}
									>
										{t('basket.cartPage')}
									</Link>
								</div>
							</div>
							<div
								className='basket-body'
								style={{ marginTop: '40px', overflow: 'scroll' }}
							>
								<ul className='basket-list'>
									{basketData.length > 0 &&
										basketData.map((item, index) => (
											<BasketCard key={index} item={item} />
										))}
								</ul>
								<div className='cart-bottom'>
									{
										<div className='total-box'>
											<p className='total-counts'>
												{t('basket.totalItems')}: {basketData.length}{' '}
												{t('basket.countItems')}.
											</p>
											<p className='total-price'>
												{t('basket.totalPrice')}: {totalPrice}
												{t('basket.soum')}
											</p>
										</div>
									}
									<div>
										<button
											onClick={() => navigate('/customer/cart/')}
											className='basket-btn'
										>
											{t('basket.cart')}
										</button>

										<button
											onClick={() => navigate('/customer/checkout/')}
											className='order-btn'
										>
											{t('basket.order')}
										</button>
									</div>
								</div>
							</div>
						</div>
					) : (
						<h2
							style={{
								color: '#223869',
								fontSize: '24px',
								lineHeight: '30px',
								fontWeight: 'bold',
								fontStyle: 'normal'
							}}
						>
							<p>{t('basket.emptyCart')}</p>
						</h2>
					)}
				</div>
			)}
		</>
	)
}

export default Basket
