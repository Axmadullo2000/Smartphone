import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export const ShoppingMessage = () => {
	const { t } = useTranslation()

	return (
		<>
			<ul className='flex ml-7 mt-5'>
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

			<div style={{ width: '30rem', height: '32rem', margin: 'auto' }}>
				<div
					style={{
						background: '-webkit-linear-gradient(45deg, #019871, #a0ebcf)',
						textShadow: '0 2px rgba(128, 128, 128, 0.6)',
						color: 'white',
						textAlign: 'center',
						fontSize: '2.25rem',
						padding: '5rem'
					}}
				>
					{t('successShopping.congratulations')}
				</div>
				<div style={{}}>
					<p style={{ border: '1px solid silver', padding: '5rem' }}>
						{t('successShopping.message')}
					</p>
				</div>
			</div>
		</>
	)
}
