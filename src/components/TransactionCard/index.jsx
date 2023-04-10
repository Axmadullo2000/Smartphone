import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSuccessFullAsyncThunk } from '../../redux/asyncThunks/Transaction'

import closeElement from '../../assets/closeElement.svg'

export const TransactionCard = ({ item, index }) => {
	const dispatch = useDispatch()
	const { bookedProducts } = useSelector(state => state.payment)

	const [open, setOpen] = useState(
		item.map(value => ({
			index: false
		}))
	)

	useEffect(() => {
		dispatch(getSuccessFullAsyncThunk())
	}, [])

	return (
		<div
			key={item.id}
			className='myOrders'
			style={{
				width: '1340px',
				background: 'white',
				padding: '20px',
				borderRadius: '5px',
				margin: '10px 30px'
			}}
		>
			<div className='flex justify-between'>
				<div>
					<p>
						Заказ: №{item.map((i, index) => <span key={index}>{i.id}</span>)[0]}
					</p>
					<p>
						Дата:{' '}
						{item
							.map(i => i.time)
							.filter(function (i, pos, self) {
								return self.indexOf(i) == pos
							})[0]
							.slice(0, 10)}{' '}
						|
						{item
							.map(i => i.time)
							.filter(function (i, pos, self) {
								return self.indexOf(i) == pos
							})[0]
							.slice(11, 19)}
						|
					</p>
					<p>
						Количество:{' '}
						{bookedProducts[index + 1].reduce(
							(acc, item) => acc + item.count,
							0
						)}{' '}
						шт.
					</p>
				</div>

				<div>
					<p className='flex items-center' style={{ fontSize: '20px' }}>
						К оплате:
						<span
							style={{
								color: '#D92E15',
								fontSize: '29px',
								fontWeight: 'bold',
								marginLeft: '4px'
							}}
						>
							{bookedProducts[index + 1].reduce(
								(acc, item) => acc + item.price,
								0
							)}
							{'  '}
							сум
						</span>
					</p>
				</div>

				<div>
					<img
						width={25}
						height={25}
						style={
							open.index
								? {
										transform: 'rotate(180deg)',
										transition: '.2s ease-in'
								  }
								: { transform: 'rotate(0deg)', transition: '.2s ease-in' }
						}
						src={closeElement}
						data-bs-toggle='collapse'
						href='#collapseExample'
						role='button'
						aria-expanded='false'
						aria-controls='collapseExample'
						onClick={() => {
							setOpen({ index: !open.index })
						}}
					/>
				</div>
			</div>
			{open.index && (
				<div>
					<h2
						className='mt-5'
						style={{
							fontSize: '24px',
							color: '#223869',
							lineHeight: '30px',
							margin: '30px 0'
						}}
					>
						Детали Заказа
					</h2>
					{item.map((product, index) => (
						<div key={index} className='flex items-center justify-between'>
							<div className='flex items-center'>
								<img src={product.image} style={{ height: '120px' }} />
								<div>
									<p>{product.name}</p>
									<p>
										{product.count} шт. {product.price / product.count}
									</p>
								</div>
							</div>
							<div
								style={{
									background: '#f6f6f6',
									padding: '29px 25px',
									width: '250px',
									fontSize: '18px'
								}}
							>
								Итог{' '}
								<span style={{ color: '#D92E15' }}>{product.price} сум</span>
							</div>
						</div>
					))}
					<div class='collapse' id='collapseExample'>
						<div class='card card-body'>
							Some placeholder content for the collapse component. This panel is
							hidden by default but revealed when the user activates the
							relevant trigger.
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
