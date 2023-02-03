import React from 'react'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import { ValidateLogin } from '../../../components/ValidateLogin'

const Login = () => {
	return <div>
		<Header />
		<ValidateLogin />
		<Footer />
	</div>
}

export default Login
