import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { deleteProductFromBasket } from '../../redux/asyncThunks/Basket'
import { IncreaseQuantity } from '../../redux/slices/AddToBasketSlice'

import './BasketCard.scss'

export const BasketCard = ({ item }) => {
	const navigate = useNavigate()
	const { t } = useTranslation()
	const dispatch = useDispatch()
	const { basketData } = useSelector(state => state.basket)

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
				<div
					className='card-info'
					onClick={() => navigate(`/products/view/${slug}`)}
				>
					<h4
						onClick={() => navigate(`/products/view/${slug}`)}
						className='card-title'
					>
						{name}
					</h4>
					<span onClick={() => navigate(`/products/view/${item.slug}`)}>
						{t('basketCard.price')}: {price} {t('basketCard.soum')}
					</span>

					<div className='card-count'>
						<span className='card-count-info'>{t('basket.totalItems')}:</span>
						{count > 1 ? (
							<button className='card-minus-btn' style={{ fontSize: '26px' }}>
								-
							</button>
						) : (
							<button className='card-minus-btn' style={{ fontSize: '26px' }}>
								-
							</button>
						)}
						<span
							onClick={() => navigate(`/products/view/${item.slug}`)}
							className='card-item-count'
							style={{ fontSize: '20px' }}
						>
							{count}
						</span>

						<button
							className='card-add-btn'
							style={{ fontSize: '26px' }}
							onClick={() => dispatch(IncreaseQuantity(basketData, item))}
						>
							+
						</button>
					</div>
				</div>
				<div className='card-total'>
					<p className='card-total-price'>
						{price * count} {t('basketCard.soum')}
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
