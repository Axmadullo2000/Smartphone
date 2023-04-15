import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'

import './NotFound.scss'

export const NotFound = () => {
	const navigate = useNavigate()
	const { t } = useTranslation()

	return (
		<>
			<Header />
			<div className='notFoundContainer flex mt-8'>
				<div className='notFoundMainContainer'>
					<h2>{t('notFound.understand')}</h2>
					<p>{t('notFound.absent')}</p>
					<button onClick={() => navigate('/')}>
						{t('notFound.mainPage')}
					</button>
				</div>
			</div>
			<Footer />
		</>
	)
}
