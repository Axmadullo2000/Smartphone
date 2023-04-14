import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ValidateRegistration } from '../../../components/Auth/ValidateRegistration'
import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'

const Registration = () => {
	const { loggednIn } = useSelector(state => state.auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loggednIn) {
			navigate('/')
		}
	})
	return (
		<div>
			<Header />
			<ValidateRegistration />
			<Footer />
		</div>
	)
}

export default Registration
