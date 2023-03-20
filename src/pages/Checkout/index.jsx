import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'
import * as Yup from 'yup'

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import {useTranslation} from "react-i18next"
import './Checkout.scss'

export const Checkout = () => {

	const {t} = useTranslation();

	const [firstName, setFirstName] = useState('')
	const [secondName, setSecondName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const userDetail = Yup.object().shape({
		firstName: Yup.string()
			.required('Необходимо заполнить «Ваше имя».')
			.min(4, 'Длина имени должен быть большим 4 букв')
			.max(40, 'Длина имени должен быть меньшим 40 букв'),
		secondName: Yup.string(),
		phoneNumber: Yup.string().required(
			'Необходимо заполнить «Мобильный телефон».'
		)
	})

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(userDetail)
	})

	const onSubmit = e => {
		e.preventDefault()
	}

	const [userInfo, setUserInfo] = useState(true)
	const [deliveryInfo, setDeliverInfo] = useState(false)
	const [payment, setPayment] = useState(false)

	console.log(errors)

	const { items, totalUniqueItems } = useCart()
	console.log(items)

	return (
		<>
			<Header />

			<div className='checkout_container ml-7'>
				<ul className='flex  mt-5'>
					<li className='checkout_direction'>
						<Link to='/'>{t("cardDetail.main")}</Link>
					</li>
					<li className='checkout_direction mx-4'>
						<Link to='/customer/cart/'>{t("basket.cart")}</Link>
					</li>
					<li className='checkout_direction'>{t("checkout.order")}</li>
				</ul>

				<h2 className='mt-5 get_offer_checkout'>{t("checkout.order")}</h2>

				<div>
					<h3>{t("checkout.orderinfo")}</h3>

				<div className='flex justify-between'>
					<div style={{ width: '50%' }}>
						<h3 style={{ fontWeight: 'bold' }}>1) Информация о покупателе</h3>
						{userInfo && (
							<div style={{ width: '50%' }}>
								<>
									<form>
										<div className='flex flex-col'>
											<label>Ваше имя</label>
											<input
												{...register('firstName')}
												id='firstName'
												name='firstName'
												value={firstName}
												onChange={e => setFirstName(e.target.value)}
											/>
											<p style={{ color: '#a94442' }}>
												{errors.firstName?.message}
											</p>
										</div>
										<div className='flex flex-col'>
											<label>Фамилия (не обязательно)</label>
											<input
												{...register('secondName')}
												id='secondName'
												name='secondName'
												value={secondName}
												onChange={e => setSecondName(e.target.value)}
											/>
										</div>
										<div className='flex flex-col'>
											<label>Мобильный телефон</label>
											<input
												{...register('phoneNumber')}
												type={'tel'}
												name='phoneNumber'
												id='phoneNumber'
												value={phoneNumber}
												onChange={e => setPhoneNumber(e.target.value)}
											/>
											<p style={{ color: '#a94442' }}>
												{errors.phoneNumber?.message}
											</p>
										</div>
									</form>
								</>
								<>
									<div>
										<button
											onClick={() => {
												setDeliverInfo(true)
												setUserInfo(false)
											}}
										>
											Следующий шаг
										</button>
									</div>
								</>
							</div>
						)}

						<h3 style={{ fontWeight: 'bold' }}>2) Информация о доставке</h3>
						{deliveryInfo && (
							<div style={{ width: '50%' }}>
								<p>
									Пожалуйста укажите дату и удобное для вас время и место
									доставки товара (дата/адрес/время). Доставка осуществляется в
									течение 48 часов после подтверждения заказа.
								</p>
								<select>
									<option value='1'>Ташкент</option>
									<option value='2'>Ташкентская область</option>
									<option value='3'>Бухарская область</option>
									<option value='4'>Джизакская область</option>
									<option value='5'>Кашкадарьинская область</option>
									<option value='6'>Навоийская область</option>
									<option value='7'>Наманганская область</option>
									<option value='8'>Самаркандская область</option>
									<option value='9'>Сурхандарьинская область</option>
									<option value='10'>Сырдарьинская область</option>
									<option value='11'>Андижанская область</option>
									<option value='12'>Ферганская область</option>
									<option value='13'>Хорезмская область</option>
									<option value='14'>Республика Каракалпакстан</option>
								</select>
								<p>Адрес для доставки</p>
								<input />
								<p>Тип доставки</p>
								<input type='checkbox' />
								<label>
									Стандартная доставка ( Стоимость доставки оплачивается
									отдельно!)
								</label>
								<p> Примечание для доставки (не более 500 символов)</p>
								<textarea></textarea>
								<div>
									<button
										onClick={() => {
											setUserInfo(true)
											setDeliverInfo(false)
										}}
									>
										предыдущий шаг
									</button>
									<button
										onClick={() => {
											setPayment(true)
											setDeliverInfo(false)
										}}
									>
										следующий шаг
									</button>
								</div>
							</div>
						)}
						<h3 style={{ fontWeight: 'bold' }}>3) Платежная информация</h3>
						{payment && (
							<div>
								<form className='flex' style={{ flexDirection: 'column' }}>
									<label>
										<input type={'radio'} name='payment' />
										Наличные
									</label>
									<label>
										<input type={'radio'} name='payment' />
										Терминал
									</label>
									<label>
										<input type={'radio'} name='payment' />
										Комбинированный
									</label>
									<label>
										<input type={'radio'} name='payment' />
										UZCARD
									</label>
									<label>
										<input type={'radio'} name='payment' />
										HUMO
									</label>
									<label>
										<input type={'radio'} name='payment' />
										Visa/Master
									</label>
								</form>
								<div>
									<button
										onClick={() => {
											setDeliverInfo(true)
											setPayment(false)
										}}
									>
										предыдущий шаг
									</button>
									<button>Оформить заказ</button>
								</div>
							</div>
						)}
					</div>
					<div style={{ width: '50%', marginBottom: '5rem' }}>
						<h3>Ваш Заказ</h3>
						<div style={{ display: 'flex', justifyContent: 'space-between' }}>
							<p>Товар</p>
							<p>Итог</p>
						</div>
						<div className=''>
							{!!items.length &&
								items.map(item => (
									<div
										className='flex justify-between'
										style={{ marginTop: '5rem' }}
									>
										<div>
											<p>{item.name}</p>
											<p>
												{item.quantity} * {item.price} сум
											</p>
											<img
												src={item.photo1}
												style={{ maxWidth: '147px', height: '100%' }}
											/>
										</div>
										<div>
											<p>{item.quantity * item.price} сум</p>
										</div>
									</div>
								))}
						</div>
					</div>

				</div>
			</div>

			<Footer />
		</>
	)
}
