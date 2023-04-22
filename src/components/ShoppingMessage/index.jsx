import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import './ShoppingMessage.scss'

export const ShoppingMessage = () => {
	const { t } = useTranslation()

	return (
		<>
			<ul className='flex ml-7 mt-5 shoppingResultsLinks'>
				<li className='checkout_direction'>
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				<li
					style={{ background: '#223869', marginLeft: '10px' }}
					className='checkout_direction'
				>
					{t('successShopping.ordering')}
				</li>
			</ul>

			<div className='bannerContainer'>
				<div className='bannerTitle'>
					{t('successShopping.congratulations')}
				</div>
				<div className='bannerMessage'>
					<p>{t('successShopping.message')}</p>
				</div>
			</div>
		</>
	)
}
