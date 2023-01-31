import React, { useState } from 'react'

import user from '../../assets/user.svg'
import basket from '../../assets/basket.svg'
import headphone from '../../assets/headphone.svg'

import './Header.scss'

const Header = () => {
	const [state, setState] = useState(false)

	console.log(state)

	return (
		<div className='bg-red-500 p-2 flex items-center'>
			<div className=''>
				<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
					<span className='text-red-700 hover:text-red-900'>Smart</span>{' '}
					<span className='text-blue-700 hover:text-blue-900'>Shop</span>
				</p>
			</div>
			<div
				onClick={() => setState(!state)}
				className='flex items-center bg-slate-100 p-3.5 rounded-lg cursor-pointer hover:bg-red-500'
				style={{ width: '130px' }}
			>
				<div className='flex flex-col'>
					<span
						style={{
							width: '22px',
							height: '4px',
							margin: '3px 0',
							background: '#585858',
						}}
					></span>
					<span
						style={{
							width: '22px',
							height: '4px',
							margin: '3px 0',
							background: '#585858',
						}}
					></span>
					<span
						style={{
							width: '22px',
							height: '4px',
							margin: '3px 0',
							background: '#585858',
						}}
					></span>
				</div>
				<div className='ml-3 text-xl opacity-60'>Каталог</div>
			</div>

			<label htmlFor='' className='flex relative p-4'>
				<input
					placeholder={'Search your favourite smartphones'}
					style={{ width: '450px' }}
					type='text'
					className='ml-5 mt-1 block px-3 p-4 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500
    '
				/>
				<button className='p-3 bg-blue-900 text-slate-200 absolute rounded-lg top-6 right-5 hover:bg-red-900'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 50 50'
						width='50px'
						height='50px'
						style={{ width: '24px', height: '24px' }}
					>
						<path
							style={{ fill: 'white' }}
							d='M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z'
						/>
					</svg>
				</button>
			</label>

			<button className='w-40 flex hover:bg-red-900	'>
				<img
					src={user}
					alt=''
					className='bg-slate-100 hover:bg-slate-900 p-3 rounded-lg'
				/>
				<p className='text-white text-sm ml-2'>Вход / Регистрация</p>
			</button>
			<button className='w-40 flex ml-4 hover:bg-red-900'>
				<img
					src={basket}
					alt=''
					className='bg-slate-100 hover:bg-slate-700 p-1 ml-5 rounded-lg'
				/>
				<p className='text-white text-sm ml-2'>Корзина / Оформление заказа</p>
			</button>
			<button className='w-70 p-3 flex ml-5 hover:bg-red-500'>
				<img
					className='bg-slate-10 hover:bg-red-400'
					src={headphone}
					width={36}
					height={36}
					alt=''
				/>
				<p className='text-white text-2xl ml-2'>(99) 794 42 62</p>
			</button>
		</div>
	)
}

export default Header
