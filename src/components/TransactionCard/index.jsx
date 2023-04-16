import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getSuccessFullAsyncThunk } from '../../redux/asyncThunks/Transaction'

import closeElement from '../../assets/closeElement.svg'

import { useTranslation } from 'react-i18next'
import './TransactionCard.scss'

export const TransactionCard = ({ item, index }) => {
	const { bookedProducts } = useSelector(state => state.payment)

	const { t } = useTranslation()

	const dispatch = useDispatch()

	const [open, setOpen] = useState(
		item !== 'wrong id phone'
			? item.map(value => ({
					index: false
			  }))
			: ''
	)

	useEffect(() => {
		dispatch(getSuccessFullAsyncThunk())

		// eslint-disable-next-line
	})

	return (
		<>
			{item !== 'wrong id phone' ? (
				<div key={index} className='myOrders position_to_left'>
					<div className='detailPaymentHistory flex justify-between'>
						<div>
							<p>
								{t('buyedProducts.orderUnical')}
								{item !== 'wrong id phone'
									? item.map((i, index) => <span key={index}>{i.id}</span>)[0]
									: ''}
							</p>
							<p>
								{t('buyedProducts.date')}:{' '}
								{item !== 'wrong id phone'
									? item
											.map(i => i.time)
											.filter(function (i, pos, self) {
												return self.indexOf(i) === pos
											})[0]
											.slice(0, 10)
									: ''}{' '}
								|
								{item !== 'wrong id phone'
									? item
											.map(i => i.time)
											.filter(function (i, pos, self) {
												return self.indexOf(i) === pos
											})[0]
											.slice(11, 19)
									: ''}
								|
							</p>
							<p>
								{t('buyedProducts.count')}:{' '}
								{item !== 'wrong id phone'
									? bookedProducts[index + 1].reduce(
											(acc, item) => acc + item.count,
											0
									  )
									: ''}{' '}
								{t('buyedProducts.countNumber')}
							</p>
						</div>

						<div>
							<p className='flex items-center' style={{ fontSize: '20px' }}>
								{t('buyedProducts.payment')}:{' '}
								{item !== 'wrong id phone' &&
									bookedProducts[index + 1].reduce(
										(acc, item) => acc + item.price,
										0
									)}{' '}
								{t('buyedProducts.soum')}
							</p>
						</div>

						<div className='openHideDetail'>
							<img
								alt='openandclose'
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
						<div className='detailBlock'>
							<h2
								className='mt-5'
								style={{
									fontSize: '24px',
									color: '#223869',
									lineHeight: '30px',
									margin: '30px 0'
								}}
							>
								{t('buyedProducts.detailOrder')}
							</h2>
							{item !== 'wrong id phone'
								? item.map((product, index) => (
										<div
											key={index}
											className='flex items-center justify-between history_content_unical'
										>
											<div className='flex items-center nameAndPriceColumn'>
												<img
													alt={product.name}
													src={product.image}
													style={{ height: '120px' }}
												/>
												<div>
													<p>{product.name}</p>
													<p>
														{product.count} шт. {product.price / product.count}
													</p>
												</div>
											</div>

											<div className='nameAndPriceColumn'>
												{t('buyedProducts.overAll')}:{' '}
												<span
													className='priceForProduct'
													style={{ color: '#D92E15' }}
												>
													{product.price} {t('buyedProducts.soum')}
												</span>
											</div>
										</div>
								  ))
								: ''}
						</div>
					)}
				</div>
			) : (
				<h2 className='historyEmpty'>{t('buyedProducts.emptyOrderList')}</h2>
			)}
		</>
	)
}
