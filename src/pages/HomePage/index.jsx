import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/Header'

const HomePage = () => {
	const data = useSelector(data => data.example)

	return (
		<div>
			<Header />
		</div>
	)
}

export default HomePage
