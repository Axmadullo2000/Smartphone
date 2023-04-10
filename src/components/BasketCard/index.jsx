import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
	deleteProductFromBasket,
	updateBasketItem
} from '../../redux/asyncThunks/Basket'

import './BasketCard.scss'

export const BasketCard = ({ item }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useDispatch()

	let { name, price, image, id, count, slug } = item

	return (
		<li className='cart-item added_to_basket'>
			<div className='cart-card'>
				<img
					className='card-img'
					width='100px'
					height='100px'
					src={image}
					alt={name}
					onClick={() => navigate(`/products/view/${slug}`)}
				/>
				<div className='card-info'>
					<h4 className='card-title'>{name}</h4>
					<span>
						{t('basketCard.price')}: {price / count} {t('basketCard.soum')}
					</span>

					<div className='card-count'>
						<span className='card-count-info'>{t('basket.totalItems')}:</span>
						{count > 1 ? (
							<button
								onClick={() =>
									dispatch(
										updateBasketItem({ id, data: { count: item.count - 1 } })
									)
								}
								className='card-minus-btn'
								style={{ fontSize: '26px' }}
							>
								-
							</button>
						) : (
							<button className='card-minus-btn' style={{ fontSize: '26px' }}>
								-
							</button>
						)}
						<span className='card-item-count' style={{ fontSize: '20px' }}>
							{count}
						</span>

						<button
							className='card-add-btn'
							style={{ fontSize: '26px' }}
							onClick={() =>
								dispatch(
									updateBasketItem({ id, data: { count: item.count + 1 } })
								)
							}
						>
							+
						</button>
					</div>
				</div>
				<div className='card-total'>
					<p className='card-total-price'>
						{price} {t('basketCard.soum')}
					</p>
					<button
						className='card-delete-btn'
						onClick={() => dispatch(deleteProductFromBasket(id))}
					>
						{t('basketCard.delete')}
					</button>
				</div>
			</div>
		</li>
	)
}
