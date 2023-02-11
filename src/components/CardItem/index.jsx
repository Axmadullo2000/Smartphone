import React from 'react'

import truck from '../../assets/truck.svg'
import percent from '../../assets/percent.svg'
import energy from '../../assets/energy.svg'
import stars from '../../assets/stars.png'
import basket from '../../assets/basket.svg'

import './CardItem.scss'

export const CardItem = ({ name, photo1, price }) => {
	return (
			<div
				className='card border mx-3 px-2 my-2'
				style={{ width: '250px', borderRadius: '18px' }}
			>
				<div style={{ width: '150px' }} className='flex'>
					<img
						style={{
							border: '2px dotted red',
							margin: '0 5px',
							borderRadius: '8px',
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
							borderRadius: '8px',
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
							borderRadius: '8px',
						}}
						src={energy}
						width={40}
						height={45}
						alt=''
					/>
				</div>
				<img src={photo1} alt={name} />
				<p className='text-center'>{name}</p>
				<img className='stars' src={stars} alt='' />
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
							margin: '0 10px',
						}}
					>
						<img src={basket} width={24} height={24} alt='' />
					</button>
				</div>
			</div>
	)
}
