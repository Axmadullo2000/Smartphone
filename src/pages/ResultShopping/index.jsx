import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { ShoppingMessage } from '../../components/ShoppingMessage'

import { getSuccessFullAsyncThunk } from '../../redux/asyncThunks/Transaction'

export const ResultShopping = () => {
	const { basketData } = useSelector(state => state.basket)
	const { bookedProducts } = useSelector(state => state.payment)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getSuccessFullAsyncThunk())
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<Header />
			<ShoppingMessage />
			<Footer />
			{basketData.length === 0 &&
				Object.keys(bookedProducts).length > 0 &&
				toast.success('Your Order Ready to Deliverying!', {
					position: 'top-right',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: 'dark'
				})}
		</>
	)
}
