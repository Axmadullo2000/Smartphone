import { Link } from 'react-router-dom'

import Footer from '../../components/Footer'
import Header from '../../components/Header'

import './Checkout.scss'

export const Checkout = () => {
	return (
		<>
			<Header />

			<div className='checkout_container ml-7'>
				<ul className='flex  mt-5'>
					<li className='checkout_direction'>
						<Link to='/'>Главная</Link>
					</li>
					<li className='checkout_direction mx-4'>
						<Link to='/customer/cart/'>Корзина</Link>
					</li>
					<li className='checkout_direction'>Оформить заказ</li>
				</ul>

				<h2 className='mt-5 get_offer_checkout'>Оформить заказ</h2>

				<div>
					<h3>Информация о покупателе</h3>
				</div>
			</div>

			<Footer />
		</>
	)
}
