import React from 'react'

import basket from '../../assets/basket.svg'
import energy from '../../assets/energy.svg'
import percent from '../../assets/percent.svg'
import stars from '../../assets/stars.svg'
import truck from '../../assets/truck.svg'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './CardItem.scss'

export const CardItem = ({ name, photo1, price, slug }) => {
	const { comments } = useSelector(comment => comment.comment)
	const navigate = useNavigate()

	let middlePrice = 5

	if (comments.length > 0) {
		middlePrice =
			comments.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.rate),
				0
			) / comments.length

		console.log(middlePrice)
	}

	return (
		<div
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
				navigate(`/products/view/${slug}`)
			}}
			className='card border mx-3 px-2 my-2'
			style={{ width: '250px', borderRadius: '18px', height: '500px' }}
		>
			<div style={{ width: '150px' }} className='flex'>
				<img
					style={{
						border: '2px dotted red',
						margin: '0 5px',
						borderRadius: '8px'
					}}
					src={truck}
					width={40}
					height={45}
					alt=''
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
					alt=''
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
					alt=''
				/>
			</div>
			<img
				src={photo1}
				alt={name}
				style={{ width: '225px', height: '300px' }}
			/>
			<p className='text-center'>{name}</p>
			<div className='flex'>
				{[...Array(Math.floor(middlePrice))].map(item => (
					<img
						key={item}
						className='stars'
						src={stars}
						alt=''
						width={38}
						height={21}
					/>
				))}
			</div>

			<div className='flex items-center justify-between mb-5'>
				<p
					className='text-blue-500'
					style={{ fontSize: '22px', fontWeight: 'bold' }}
				>
					{price} сум
				</p>
				<button
					style={{
						border: '1px solid silver',
						padding: '10px',
						borderRadius: '10px',
						margin: '0 10px'
					}}
				>
					<img src={basket} width={24} height={24} alt='' />
				</button>
			</div>
		</div>
	)
}
