import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'

import { BasketCard } from '../BasketCard'

import close from '../../assets/close.svg'

import { useTranslation } from 'react-i18next'
import './Basket.scss'

const Basket = ({ basketModalOpen, setBasketModalOpen }) => {
	const { t } = useTranslation()
	const ref = useRef()
	const checkIfClickedOutside = e => {
		if (basketModalOpen && ref.current && !ref.current.contains(e.target)) {
			setBasketModalOpen(false)
		}
	}

	const navigate = useNavigate()

	const { isEmpty, items, cartTotal, totalItems } = useCart()

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
									{isEmpty ? (
										<p>{t('basket.emptyCart')}</p>
									) : (
										<p>{t('basket.yourCart')}</p>
									)}
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
								{items.map((item, index) => (
									<BasketCard key={index} item={item} />
								))}
							</ul>
							<div className='cart-bottom'>
								{totalItems != 0 && (
									<div className='total-box'>
										<p className='total-counts'>
											{t('basket.totalItems')}: {totalItems}{' '}
											{t('basket.countItems')}.
										</p>
										<p className='total-price'>
											{t('basket.totalPrice')}:{' '}
											<span>
												{cartTotal} {t('basket.soum')}
											</span>
										</p>
									</div>
								)}
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
				</div>
			)}
		</>
	)
}

export default Basket
