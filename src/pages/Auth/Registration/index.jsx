import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Header from '../../../components/Header'
import { ValidateRegistration } from '../../../components/ValidateRegistration'
import Footer from '../../../components/Footer'

const Registration = () => {
	const { loggednIn } = useSelector(state => state.auth)
	const navigate = useNavigate()

	if (loggednIn) {
		navigate('/')
	}
	return (
		<div>
			<Header />
			<ValidateRegistration />
			<Footer />
		</div>
	)
}

export default Registration
