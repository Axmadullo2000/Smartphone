import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { SearchAsyncThunk } from '../../../redux/asyncThunks'
import { addProductToBasket } from '../../../redux/asyncThunks/Basket'

import Loader from '../Loader'

import basket from '../../../assets/basket.svg'
import energy from '../../../assets/energy.svg'
import percent from '../../../assets/percent.svg'
import stars from '../../../assets/stars.svg'
import truck from '../../../assets/truck.svg'

import './CardItem.scss'

export const CardItem = item => {
	const { id, name, photo1, price, slug, types } = item

	const { comments } = useSelector(comment => comment.comment)
	const { loggednIn } = useSelector(state => state.auth)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { t } = useTranslation()

	const language = localStorage.getItem('lang')
		? localStorage.getItem('lang')
		: 'uz'

	let middlePrice = 5

	const [showImage, setShowImage] = useState(false)

	if (comments.length > 0) {
		middlePrice =
			comments.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.rate),
				0
			) / comments.length
	}

	useEffect(() => {
		dispatch(SearchAsyncThunk({ search: name, offset: 0 }))
	}, [dispatch, name])

	useEffect(() => {
		setTimeout(() => {
			setShowImage(true)
		}, 3500)
	})

	return (
		<div className='card border mx-3 px-2 my-2' style={{ minHeight: '500px' }}>
			<div style={{ width: '150px', margin: '15px 0' }} className='flex'>
				<img
					style={{
						border: '2px dotted red',
						margin: '0 5px',
						borderRadius: '8px'
					}}
					src={truck}
					width={40}
					height={45}
					alt='truck'
				/>
				<img
					style={{
						border: '2px dotted red',
						margin: '0 5px',
						borderRadius: '8px'
					}}
					src={percent}
					width={40}
					height={45}
					alt='percent'
				/>
				<img
					style={{
						border: '2px dotted red',
						margin: '0 5px',
						borderRadius: '8px'
					}}
					src={energy}
					width={40}
					height={45}
					alt='energy'
				/>
			</div>
			{!showImage && <Loader />}

			{showImage && (
				<img
					style={{ margin: '20px auto', width: '200px', height: '200px' }}
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth'
						})
						navigate(`/products/view/${slug}`)
					}}
					src={photo1}
					alt={name}
				/>
			)}

			<div className='homePage_cardItems'>
				<p
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth'
						})
						navigate(`/products/view/${slug}`)
					}}
					className='text-center'
					style={{ margin: '30px 0 10px 0' }}
				>
					{name}
				</p>
				<div className='flex'>
					{[...Array(Math.floor(middlePrice))].map((item, index) => (
						<img
							key={index}
							className='stars'
							src={stars}
							alt=''
							width={38}
							height={21}
						/>
					))}
				</div>

				<div className='flex items-center justify-between mt-5'>
					<p
						onClick={() => {
							window.scrollTo({
								top: 0,
								behavior: 'smooth'
							})
							navigate(`/products/view/${slug}`)
						}}
						className='text-blue-500'
						style={{ fontSize: '18px', fontWeight: 'bold' }}
					>
						{language === 'uz' && `${price} so'm`}
						{language === 'ru' && `${Number(price / 140.25).toFixed(0)} рубль`}
						{language === 'uk' &&
							`${Number(price / 309.98).toFixed(0)} гривень`}
					</p>
					<button
						style={{
							border: '1px solid silver',
							padding: '10px',
							borderRadius: '10px',
							margin: '0 10px',
							cursor: 'pointer'
						}}
						onClick={() => {
							if (loggednIn) {
								dispatch(
									addProductToBasket({
										product_id: id,
										group_product: types === 'смартфон' ? 1 : 2
									})
								)
							} else {
								toast.success(t('validateRegistration.mustHaveRegister'), {
									position: 'top-right',
									autoClose: 5000,
									hideProgressBar: false,
									closeOnClick: true,
									pauseOnHover: true,
									draggable: true,
									progress: undefined,
									theme: 'dark'
								})
								navigate('/sign-up')
							}
						}}
					>
						<img src={basket} width={24} height={24} alt='' />
					</button>
				</div>
			</div>
		</div>
	)
}
