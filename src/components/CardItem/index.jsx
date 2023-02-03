import React from 'react'

import truck from '../../assets/truck.svg'
import percent from '../../assets/percent.svg'
import energy from '../../assets/energy.svg'
import stars from '../../assets/stars.png'
import basket from '../../assets/basket.svg'

import './CardItem.scss'

export const CardItem = () => {
	return (
		<div
			className='card border mx-5 px-2'
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
			<img
				src='https://www.mediapark.uz/upload/file/mp/products/images/NYPd0nJhMmF9m96kurBD4AvSgcEHwdtg.jpg'
				alt=''
			/>
			<p className='text-center'>Смартфон Huawei Nova Y61 4/64 GB Mint Green</p>
			<img className='stars' src={stars} alt='' />
			<div className='flex items-center justify-between mb-5'>
				<p
					className='text-blue-500'
					style={{ fontSize: '22px', fontWeight: 'bold' }}
				>
					2 200 000 сум
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
