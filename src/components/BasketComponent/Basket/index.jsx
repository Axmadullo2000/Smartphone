import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { BasketCard } from '../BasketCard'

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

	const totalCount =
		!!basketData.length && basketData.reduce((acc, item) => acc + item.count, 0)

	useEffect(() => {
		document.addEventListener('mousedown', checkIfClickedOutside)
		// eslint-disable-next-line
	}, [checkIfClickedOutside])

	return (
		<>
			{basketModalOpen && (
				<div className='basketCard p-10 ' ref={ref}>
					{!!basketData.length && basketData.length > 0 ? (
						<div>
							<div>
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
										style={{}}
										className='redirectToCart'
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
												{t('basket.totalItems')}: {totalCount}{' '}
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
