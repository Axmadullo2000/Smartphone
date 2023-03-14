import React from "react";
import "./cartCard.scss";
import { useCart } from "react-use-cart";

export const CartCard = ({ item }) => {
	console.log(item);
	const { name, price, photo1, id, quantity } = item;
	const { updateItemQuantity, removeItem, } = useCart();
	return (
		<li className="cart-item">
			<div className="cart-card">
				<img
					className="card-img"
					width="100px"
					height="100px"
					src={photo1}
					alt={name}
				/>
				<div className="card-info">
					<h4 className="card-title">{name}</h4>
                    <span>Цена: {price}</span>
                    
					<div className="card-count">
						<span className="card-count-info">Кол-во:</span>
						<button
							className="card-minus-btn"
							onClick={() => updateItemQuantity(id, quantity - 1)}>
							-
						</button>
						<span className="card-item-count">{quantity}</span>
						<button
							className="card-add-btn"
							onClick={() => updateItemQuantity(id, quantity + 1)}>
							+
						</button>
					</div>
				</div>
				<div className="card-total">
					<p className="card-total-price">{price * quantity}</p>
					<button className="card-delete-btn" onClick={() => removeItem(id)}>
						Удалить
					</button>
				</div>
			</div>
		</li>
	);
};
