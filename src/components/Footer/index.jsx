import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import facebook from '../../assets/facebook.svg'
import headphone from '../../assets/headphone.svg'
import instagram from '../../assets/instagram.svg'
import telegram from '../../assets/telegram.svg'

import './Footer.scss'

const Footer = () => {
	const { t } = useTranslation()
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
				<h5>{t('footer.about')}</h5>
				<ul style={{ lineHeight: '30px' }}>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.about')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.news')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.gaurantee')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.sale')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.adress')}
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h5>{t('footer.buy')}</h5>
				<ul style={{ lineHeight: '30px' }}>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.pickup')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.contact')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.serviceCenter')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.feedback')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.vacancy')}
						</Link>
					</li>
					<li>
						<Link to='/' style={{ padding: '10px', margin: '-10px' }}>
							{t('footer.corporateBuy')}
						</Link>
					</li>
				</ul>
			</div>

			<div>
				<h5>{t('footer.services')}</h5>
				<ul style={{ lineHeight: '30px' }}>
					<li>{t('footer.canIBuy')}</li>
					<li>{t('footer.payment')}</li>
					<li>{t('footer.unired')}</li>
					<li>{t('footer.Cooperation')}</li>
					<li>{t('footer.zmarket')}</li>
				</ul>
			</div>

			<div className='mr-5'>
				<h5>{t('footer.contact')}</h5>
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
