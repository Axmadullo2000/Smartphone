import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import facebook from '../../../assets/facebook.svg'
import headphone from '../../../assets/headphone.svg'
import instagram from '../../../assets/instagram.svg'
import telegram from '../../../assets/telegram.svg'

import './Footer.scss'

const Footer = () => {
	const { t } = useTranslation()

	return (
		<footer className='footer flex text-slate-100'>
			<div className='footerLogo flex items-start'>
				<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
					<Link to='/' className='opacity-75 hover:opacity-100'>
						<span className='text-red-700'>Smart</span>{' '}
						<span className='text-blue-700'>Shop</span>
					</Link>
				</p>
			</div>

			<div className='mr-5 ml-5 footerBlock'>
				<h5>{t('footer.frontendContact')}</h5>
				<div className='flex'>
					<button
						onClick={() =>
							(window.location.href =
								'https://www.facebook.com/profile.php?id=100041447745536')
						}
					>
						<img src={facebook} alt='' width={44} height={44} />
					</button>
					<button
						className='mx-4'
						onClick={() =>
							(window.location.href =
								'https://www.instagram.com/axmadullo_ubaydullayev/')
						}
					>
						<img src={instagram} alt='' width={44} height={44} />
					</button>
					<button
						onClick={() =>
							(window.location.href = 'https://t.me/AxmadulloDeveloper')
						}
					>
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
					<a href='tel: +998997944262' className='text-white text-2xl ml-2'>
						(99) 794-42-62
					</a>
				</button>
			</div>
			<div className='flex items-start flex-col flex-end'>
				<span className='mr-4'>{t('footer.technicalProgrammer')}</span>
				<button className='mt-4' onClick={() => (window.location.href = 'https://t.me/memhard')}>
					<img src={telegram} alt='' width={44} height={44} />
				</button>
			</div>
		</footer>
	)
}

export default Footer
