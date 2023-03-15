import React, { useEffect, useRef } from "react";
import { useCart } from "react-use-cart";
import close from "../../assets/close.svg";
import { CartCard } from "../CartCard/CartCard";
import "./Basket.scss";

const Basket = ({ basketModalOpen, setBasketModalOpen }) => {
	const ref = useRef();
	const checkIfClickedOutside = (e) => {
		if (basketModalOpen && ref.current && !ref.current.contains(e.target)) {
			setBasketModalOpen(false);
		}
	};

	const { isEmpty,items,cartTotal,totalItems  } = useCart();

	useEffect(() => {
		document.addEventListener("mousedown", checkIfClickedOutside);
	}, [basketModalOpen]);

	return (
		<>
			{basketModalOpen && (
				<div
					className="bg-slate-100 p-10 fixed right-0 h-full"
					style={{ height: "100%", width: "700px", zIndex: 999 }}
					ref={ref}>
					<div style={{ height: "84%" }}>
						<div>
							<button
								onClick={() => setBasketModalOpen((old) => !old)}
								style={{ position: "absolute", right: "20px", top: "20px" }}>
								<img src={close} />
							</button>
							<h2
								style={{
									color: "#223869",
									fontSize: "24px",
									lineHeight: "30px",
									fontWeight: "bold",
									fontStyle: "normal",
								}}>
								{isEmpty ? <p>Ваша корзина пуста</p> : <p>Ваша корзина</p>}
							</h2>
						</div>
						<div className="basket-body">
							<ul className="basket-list">
								{
								items.map((item,index) => <CartCard key={index} item={item}/>)
								}
							</ul>
							<div className="cart-bottom">
								<div className="total-box">
									<p className="total-counts">Общее количество: {totalItems} шт.</p>
									<p className="total-price">Общая сумма: <span>{cartTotal}</span></p>
								</div>
								<div className="order-btn-box">
									<button className="order-btn">Заказать</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Basket;
