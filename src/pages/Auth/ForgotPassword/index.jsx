import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ForgotPassword } from '../../../components/Auth/ForgotPassword'
import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'

export const ForgotPasswordPage = () => {
	const { loggednIn } = useSelector(state => state.auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loggednIn) {
			navigate('/')
		}
	})

	return (
		<>
			<Header />
			<ForgotPassword />
			<Footer />
		</>
	)
}
