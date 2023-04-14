import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'

import {
	deleteProductFromBasket,
	updateBasketItem
} from '../../redux/asyncThunks/Basket'

import close from '../../assets/close.svg'
import up from '../../assets/up.svg'

import './ProductsInBasket.scss'

export const ProductsInBasket = () => {
	const [emptyBasket, setEmptyBasket] = useState(false)
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
			<div className='basketWrapper'>
				<ul className='flex mt-5 basket_direction'>
					<li className='basket_link'>
						<Link to='/'>{t('cardDetail.main')}</Link>
					</li>
					<li className='basket_link'>{t('productsInCart.cart')}</li>
				</ul>
				<h2 className='productsInYourCart'>{t('productsInCart.yourCart')}</h2>

				<div
					className='flex basketContainer'
					style={
						!basketData.length && basketData.length == 0
							? { justifyContent: 'space-between' }
							: { width: '95%', justifyContent: 'space-between' }
					}
				>
					{!basketData.length ? (
						<h2 className='emptyBasketTitle ml-4'>
							{t('productsInCart.emptyCart')}
						</h2>
					) : (
						<div className='basketProductsMenu'>
							{basketData.length > 0 &&
								basketData.map(item => (
									<div key={item.id} className='flex items-center inBasketItem'>
										<div
											className='flex'
											onClick={() => navigate(`/products/view/${item.slug}`)}
										>
											<img
												className='product_image cursor-pointer'
												src={item.image}
												alt={item.slug}
											/>
										</div>
										<div
											onClick={() => navigate(`/products/view/${item.slug}`)}
											className='product_name'
										>
											<p>{item.name}</p>
										</div>
										<div className='flex'>
											<div>
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
														className='manipulation_btn hover:text-red-400'
													>
														-
													</button>
												) : (
													<button className='manipulation_btn hover:text-red-400'>
														-
													</button>
												)}
											</div>
											<div className='products_count'>{item.count}</div>
											<div>
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
													className='manipulation_btn hover:text-red-400'
												>
													+
												</button>
											</div>
										</div>
										<div>
											<p className='product_price'>
												{item.price} {t('basketCard.soum')}
											</p>
										</div>

										<div className='removeItem'>
											<button
												onClick={() =>
													dispatch(deleteProductFromBasket(item.id))
												}
												className='removeProduct'
											>
												<img src={close} alt='close' />
											</button>
										</div>
									</div>
								))}
						</div>
					)}

					<div
						className={`${
							!basketData.length ? 'emptyBasket' : 'dataInBasket'
						}   `}
					>
						<div
							className={
								!!basketData && !basketData.length
									? `inBasketProducts`
									: `outOfBasket`
							}
						>
							<h2 className='price_of_product'>
								{t('productsInCart.orderPrice')}
							</h2>
							<ul>
								<li className='flex justify-between items-center mt-4'>
									<span className='basket_textKey_color text-color'>
										{t('productsInCart.orderCount')}:
									</span>
									<span className='basket_textValue_color'>
										{totalCount > 0 ? totalCount : 0} {t('basket.countItems')}.
									</span>
								</li>
								<li className='flex justify-between items-center price_product ml-1 mt-4'>
									<span className='basket_textKey_color text-color'>
										{t('productsInCart.cost')}:
									</span>
									<span className='basket_textValue_color'>
										{!basketData.length ? 0 : totalPrice} {t('basketCard.soum')}
										.
									</span>
								</li>
								<div className='line'></div>
								<li className='flex justify-between items-center totalPrice'>
									<span className='basket_textKey_color text-color'>
										{t('productsInCart.totalPay')}:
									</span>
									{'  '}
									<span className='text-color-red-900 basket_textValue_color'>
										{!basketData.length ? 0 : totalPrice} {t('basketCard.soum')}
										.
									</span>
								</li>
							</ul>
							<button
								className='get_offer'
								onClick={() => {
									if (!!basketData.length && basketData.length > 0) {
										navigate('/customer/checkout/')
									}
									if (
										basketData.length === 0 ||
										basketData.Error == 'wrong id user'
									) {
										setEmptyBasket(true)
									}
								}}
							>
								{t('checkout.order')}
							</button>
							{emptyBasket && (
								<h2 className='emptyProduct'>{t('basket.empty')}</h2>
							)}
						</div>
					</div>
				</div>

				<div>
					<button
						className='gotoUpper'
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
			</div>

			<Footer />
		</>
	)
}
