import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import {
	deleteProductFromBasket,
	updateBasketItem
} from '../../redux/asyncThunks/Basket'

import close from '../../assets/close.svg'
import up from '../../assets/up.svg'

import './ProductsInBasket.scss'

export const ProductsInBasket = () => {
	const dispatch = useDispatch()

	const { basketData } = useSelector(state => state.basket)

	const navigate = useNavigate()
	const { t } = useTranslation()

	const totalPrice =
		!!basketData.length && basketData.reduce((acc, item) => acc + item.price, 0)

	const totalCount =
		!!basketData.length && basketData.reduce((acc, item) => acc + item.count, 0)

	return (
		<>
			<Header />
			<ul className='flex ml-8 mt-5 basket_direction'>
				<li className='basket_link'>
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				<li
					style={{ background: '#223869', color: '#fff' }}
					className='basket_link ml-3'
				>
					{t('productsInCart.cart')}
				</li>
			</ul>
			<h2
				style={{
					fontSize: '22px',
					color: '#223869',
					fontWeight: '600',
					marginTop: '22px',
					marginBottom: '22px',
					marginLeft: '32px'
				}}
			>
				{t('productsInCart.yourCart')}
			</h2>
			<div
				className='flex'
				style={
					!basketData.length && basketData.length == 0
						? {
								justifyContent: 'space-between'
						  }
						: { width: '100%', justifyContent: 'space-between' }
				}
			>
				<div style={{ marginLeft: '32px' }}>
					{!basketData.length ? (
						<h2
							style={{
								fontSize: '18px',
								color: '#000',
								fontWeight: '600',
								marginTop: '22px'
							}}
						>
							{t('productsInCart.emptyCart')}
						</h2>
					) : (
						basketData.length > 0 &&
						basketData.map(item => (
							<div
								key={item.id}
								className='flex space-x-36 inBasketItem'
								style={{
									background: 'white',
									marginBottom: '10px',
									width: '95%'
								}}
							>
								<div
									className='flex'
									onClick={() => navigate(`/products/view/${item.slug}`)}
									style={{ marginLeft: '22px' }}
								>
									<img
										style={{
											maxWidth: '150px',
											minHeight: '150px'
										}}
										className='cursor-pointer'
										src={item.image}
										alt={item.slug}
									/>
								</div>
								<div
									onClick={() => navigate(`/products/view/${item.slug}`)}
									className='product_name'
								>
									<p style={{ marginTop: '20px' }}>{item.name}</p>
								</div>
								<div
									className='flex'
									style={{
										height: '40px',
										marginTop: '65px'
									}}
								>
									<div style={{ fontSize: '22px' }}>
										{item.count > 1 ? (
											<button
												onClick={() =>
													dispatch(
														updateBasketItem({
															id: item.id,
															data: {
																count: item.count - 1
															}
														})
													)
												}
												className='hover:text-red-400'
											>
												-
											</button>
										) : (
											<button className='hover:text-red-400'>-</button>
										)}
									</div>
									<div style={{ fontSize: '22px', margin: '0 20px' }}>
										{item.count}
									</div>
									<div style={{ fontSize: '22px' }}>
										<button
											onClick={() =>
												dispatch(
													updateBasketItem({
														id: item.id,
														data: {
															count: item.count + 1
														}
													})
												)
											}
											className='hover:text-red-400'
										>
											+
										</button>
									</div>
								</div>
								<div>
									<p style={{ marginTop: '65px', fontSize: '22px' }}>
										{item.price} {t('basketCard.soum')}
									</p>
								</div>

								<div style={{ marginTop: '60px', paddingRight: '22px' }}>
									<button
										onClick={() => dispatch(deleteProductFromBasket(item.id))}
										style={{ width: '36px', height: '36px' }}
									>
										<img src={close} alt='close' />
									</button>
								</div>
							</div>
						))
					)}
				</div>

				<div
					style={
						!basketData.length
							? {
									display: 'flex',
									justifyContent: 'center',
									height: '330px'
							  }
							: {
									display: 'flex',
									justifyContent: 'flex-end',
									height: '330px'
							  }
					}
				>
					<div
						style={
							!basketData.length
								? {
										display: 'block',
										background: '#fff',
										width: '336px',
										padding: '18px 13px',
										marginTop: '0px',
										marginRight: '22px'
								  }
								: {
										background: '#fff',
										width: '336px',
										padding: '18px 13px',
										marginTop: '0px',
										marginRight: '22px'
								  }
						}
					>
						<h2 className='price_of_product'>
							{t('productsInCart.orderPrice')}
						</h2>
						<ul className=''>
							<li
								className='flex items-center'
								style={{ marginTop: '17px', justifyContent: 'space-between' }}
							>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									{t('productsInCart.orderCount')}:
								</span>
								<span className='basket_textValue_color'>
									{totalCount > 0 ? totalCount : 0} {t('basket.countItems')}.
								</span>
							</li>
							<li
								className='flex items-center price_product ml-1'
								style={{ marginTop: '20px', justifyContent: 'space-between' }}
							>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									{t('productsInCart.cost')}:
								</span>
								<span className='basket_textValue_color'>
									{!basketData.length ? 0 : totalPrice} {t('basketCard.soum')}.
								</span>
							</li>
							<div
								style={{
									width: '100%',
									height: '2px',
									background: '#dfdfdf',
									marginTop: '17px'
								}}
							></div>
							<li
								style={{ justifyContent: 'space-between' }}
								className='flex items-center totalPrice'
							>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									{t('productsInCart.totalPay')}:
								</span>
								<span
									style={{ color: 'red' }}
									className='basket_textValue_color'
								>
									{!basketData.length ? 0 : totalPrice} {t('basketCard.soum')}.
								</span>
							</li>
						</ul>
						<button
							className='get_offer'
							onClick={() => navigate('/customer/checkout/')}
						>
							{t('checkout.order')}
						</button>
					</div>
				</div>
			</div>

			<div style={{ marginTop: '22px' }}>
				<button
					style={{
						border: '2px solid red',
						background: 'rgb(34, 56, 105)',
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

			<Footer />
		</>
	)
}
