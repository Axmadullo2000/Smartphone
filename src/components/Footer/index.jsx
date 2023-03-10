import React from 'react'
import { Link } from 'react-router-dom'

import facebook from '../../assets/facebook.svg'
import headphone from '../../assets/headphone.svg'
import instagram from '../../assets/instagram.svg'
import telegram from '../../assets/telegram.svg'

import './Footer.scss'

const Footer = () => {
	return (
		<footer
			className='footer flex text-slate-100 justify-between'
			style={{ paddingBottom: '40px' }}
		>
			<div className='flex items-start'>
				<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
					<Link to='/' className='opacity-75 hover:opacity-100'>
						<span className='text-red-700'>Smart</span>{' '}
						<span className='text-blue-700'>Shop</span>
					</Link>
				</p>
			</div>

			<div>
				<h5>О нас</h5>
				<ul style={{ lineHeight: '30px' }}>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							О нас
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Новости
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Гарантия
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Акции
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Адреса магазинов
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h5>Покупателям</h5>
				<ul style={{ lineHeight: '30px' }}>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Доставка
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Контакты
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Сервис центр
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Оставить отзыв
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Вакансии
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							Корпоративным покупателям
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h5>Услуги</h5>
				<ul style={{ lineHeight: '30px' }}>
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
						className='bg-slate-10'
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
