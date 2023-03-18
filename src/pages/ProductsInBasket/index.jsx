import { Link, useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import close from '../../assets/close.svg'
import up from '../../assets/up.svg'

import './ProductsInBasket.scss'

export const ProductsInBasket = () => {
	const {
		items,
		isEmpty,
		updateItemQuantity,
		removeItem,
		totalItems,
		cartTotal
	} = useCart()
	const navigate = useNavigate()

	return (
		<>
			<Header />
			<ul className='flex ml-8 mt-5 basket_direction'>
				<li className='basket_link'>
					<Link to='/'>Главная</Link>
				</li>
				<li
					style={{ background: '#223869', color: '#fff' }}
					className='basket_link ml-3'
				>
					Корзина
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
				Ваша Корзина
			</h2>
			<div
				className='flex'
				style={
					totalItems == 0
						? {
								justifyContent: 'space-between'
						  }
						: { width: '100%' }
				}
			>
				<div style={{ marginLeft: '32px' }}>
					{isEmpty ? (
						<h2
							style={{
								fontSize: '18px',
								color: '#000',
								fontWeight: '600',
								marginTop: '22px'
							}}
						>
							Ваша корзина для покупок пуста
						</h2>
					) : (
						<>
							{items.map(item => (
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
												width: '150px',
												height: '150px'
											}}
											className='cursor-pointer'
											src={item.photo1}
											alt={item.slug}
										/>
									</div>
									<div
										onClick={() => navigate(`/products/view/${item.slug}`)}
										className='product_name'
									>
										<p style={{ marginTop: '50px' }}>{item.name}</p>
									</div>
									<div
										className='flex'
										style={{
											height: '40px',
											marginTop: '65px'
										}}
									>
										<div style={{ fontSize: '22px' }}>
											{item.quantity > 1 ? (
												<button
													onClick={() =>
														updateItemQuantity(item.id, item.quantity - 1)
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
											{item.quantity}
										</div>
										<div style={{ fontSize: '22px' }}>
											<button
												onClick={() =>
													updateItemQuantity(item.id, item.quantity + 1)
												}
												className='hover:text-red-400'
											>
												+
											</button>
										</div>
									</div>
									<div>
										<p style={{ marginTop: '65px', fontSize: '22px' }}>
											{item.price * item.quantity}
										</p>
									</div>

									<div style={{ marginTop: '60px', paddingRight: '22px' }}>
										<button
											style={{ width: '36px', height: '36px' }}
											onClick={() => removeItem(item.id)}
										>
											<img src={close} />
										</button>
									</div>
								</div>
							))}
						</>
					)}
				</div>

				<div
					style={
						totalItems == 0
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
							totalItems == 0
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
						<h2 className='price_of_product'>Сумма заказа</h2>
						<ul className=''>
							<li
								className='flex space-x-28 items-center'
								style={{ marginTop: '17px' }}
							>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									Кол-во товаров:
								</span>
								<span className='basket_textValue_color'>{totalItems} шт.</span>
							</li>
							<li
								className='flex space-x-16 items-center price_product ml-1'
								style={{ marginTop: '20px' }}
							>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									Стоимость:
								</span>
								<span className='basket_textValue_color'>{cartTotal} сум.</span>
							</li>
							<div
								style={{
									width: '100%',
									height: '2px',
									background: '#dfdfdf',
									marginTop: '17px'
								}}
							></div>
							<li className='flex space-x-8 items-center totalPrice'>
								<span
									className='basket_textKey_color'
									style={{ fontSize: '14px', color: '#717171' }}
								>
									Всего к оплате:
								</span>
								<span
									style={{ color: 'red' }}
									className='basket_textValue_color'
								>
									{cartTotal} сум.
								</span>
							</li>
						</ul>
						<button
							className='get_offer'
							onClick={() => navigate('/customer/checkout/')}
						>
							Оформить заказ
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