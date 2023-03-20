import { Link } from "react-router-dom";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";
import "./Checkout.scss";

export const Checkout = () => {
	const { t } = useTranslation();
	return (
		<>
			<Header />
			<div className="checkout_container ml-7">
				<ul className="flex  mt-5">
					<li className="checkout_direction">
						<Link to="/">{t("cardDetail.main")}</Link>
					</li>
					<li className="checkout_direction mx-4">
						<Link to="/customer/cart/">{t("basket.cart")}</Link>
					</li>
					<li className="checkout_direction">{t("checkout.order")}</li>
				</ul>

				<h2 className="mt-5 get_offer_checkout">{t("checkout.order")}</h2>

				<div>
					<h3>{t("checkout.orderinfo")}</h3>
				</div>
			</div>
			<Footer />
		</>
	);
};
