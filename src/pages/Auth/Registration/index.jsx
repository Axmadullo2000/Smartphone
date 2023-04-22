import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { ValidateRegistration } from '../../../components/Auth/ValidateRegistration'
import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'
import { removeItem } from '../../../Service/localData'

const Registration = () => {
	const { loggednIn } = useSelector(state => state.auth)
	const navigate = useNavigate()

	useEffect(() => {
		if (loggednIn) {
			navigate('/')
		} else {
			removeItem('token')
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
