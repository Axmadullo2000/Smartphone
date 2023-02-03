import React from 'react'
import { Link } from 'react-router-dom'

import telegram from '../../assets/telegram.svg'
import instagram from '../../assets/instagram.svg'
import facebook from '../../assets/facebook.svg'
import headphone from '../../assets/headphone.svg'

import './Footer.scss'

const Footer = () => {
	return (
		<footer className='footer flex text-slate-100 justify-between'>
			<div className='flex items-start'>
				<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
					<Link to='/'>
						<span className='text-red-700 hover:text-red-900'>Smart</span>{' '}
						<span className='text-blue-700 hover:text-blue-900'>Shop</span>
					</Link>
				</p>
			</div>

			<div>
				<h5>О нас</h5>
				<ul>
					<li>О нас</li>
					<li>Новости</li>
					<li>Гарантия</li>
					<li>Акции</li>
					<li>Адреса магазинов</li>
				</ul>
			</div>

			<div>
				<h5>Покупателям</h5>
				<ul>
					<li>Доставка</li>
					<li>Контакты</li>
					<li>Сервис центр</li>
					<li>Оставить отзыв</li>
					<li>Вакансии</li>
					<li>Корпоративным покупателям</li>
				</ul>
			</div>

			<div>
				<h5>Услуги</h5>
				<ul>
					<li>Как сделать покупку?</li>
					<li>Способы оплаты</li>
					<li>Рассрочка UNIRED</li>
					<li>Сотрудничество</li>
					<li>Рассрочка zMARKET</li>
				</ul>
			</div>

			<div className='mr-5'>
				<h5>Контакты</h5>
				<div className='flex'>
					<button>
						<img src={facebook} alt='' width={44} height={44} />
					</button>
					<button className='mx-4'>
						<img src={instagram} alt='' width={44} height={44} />
					</button>
					<button>
						<img src={telegram} alt='' width={44} height={44} />
					</button>
				</div>
				<button className='flex ml-1 mt-5'>
					<img
						className='bg-slate-10 hover:bg-red-400'
						src={headphone}
						width={36}
						height={36}
						alt=''
					/>
					<p className='text-white text-2xl ml-2'>(91) 792 12 32</p>
				</button>
			</div>
		</footer>
	)
}

export default Footer
