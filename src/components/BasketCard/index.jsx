import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import { useTranslation } from 'react-i18next';
import './BasketCard.scss'

export const BasketCard = ({ item }) => {
	const navigate = useNavigate()
	const {t} = useTranslation();

	const { name, price, photo1, id, quantity } = item
	const { updateItemQuantity, removeItem } = useCart()

	return (
		<li className='cart-item added_to_basket'>
			<div className='cart-card '>
				<img
					className='card-img'
					width='100px'
					height='100px'
					src={photo1}
					alt={name}
					onClick={() => navigate(`/products/view/${item.slug}`)}
				/>
				<div className='card-info'>
					<h4
						onClick={() => navigate(`/products/view/${item.slug}`)}
						className='card-title'
					>
						{name}
					</h4>
					<span onClick={() => navigate(`/products/view/${item.slug}`)}>
					{t("basketCard.price")}: {price} {t("basketCard.soum")}
					</span>

					<div className='card-count'>
						<span className='card-count-info'>{t("basket.totalItems")}:</span>
						<button
							className='card-minus-btn'
							onClick={() => updateItemQuantity(id, quantity - 1)}
							style={{ fontSize: '26px' }}
						>
							-
						</button>
						<span
							onClick={() => navigate(`/products/view/${item.slug}`)}
							className='card-item-count'
							style={{ fontSize: '20px' }}
						>
							{quantity}
						</span>
						<button
							className='card-add-btn'
							onClick={() => updateItemQuantity(id, quantity + 1)}
							style={{ fontSize: '26px' }}
						>
							+
						</button>
					</div>
				</div>
				<div className='card-total'>
					<p className='card-total-price'>{price * quantity} {t("basketCard.soum")}</p>
					<button className='card-delete-btn' onClick={() => removeItem(id)}>
					{t("basketCard.delete")}
					</button>
				</div>
			</div>
		</li>
	)
}
