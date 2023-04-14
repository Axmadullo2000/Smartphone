import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import Footer from '../../components/Layouts/Footer'
import Header from '../../components/Layouts/Header'
import { paymentAsynkThunk } from '../../redux/asyncThunks/Basket'

import { loginAction } from '../../redux/slices/AuthSlice'
import { AuthService } from '../../Service'
import { setItem } from '../../Service/localData'

import './Checkout.scss'

export const Checkout = () => {
	const dispatch = useDispatch()
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { userData, loggednIn } = useSelector(state => state.auth)
	const { basketData, paymentLink } = useSelector(state => state.basket)

	const [firstName, setFirstName] = useState('')
	const [secondName, setSecondName] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const [userName, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPasword, setRepeatPassword] = useState('')
	const [email, setEmail] = useState('')

	const data = {
		username: userName,
		password,
		new_password: repeatPasword,
		email
	}

	const [locationDelivery, setLocationDelivery] = useState('')
	const [address, setAddress] = useState('')
	const [typeOfDelivery, setTypeOfDelivery] = useState(false)
	const [extraInfo, setExtraInfo] = useState('')

	const [paymentSystem, setPaymentSystem] = useState('')

	const userDetail = Yup.object().shape({
		firstName: Yup.string()
			.required(t('checkout.validation.name.required'))
			.min(4, t('checkout.validation.name.notEnough'))
			.max(40, t('checkout.validation.name.moreThanEnough')),
		secondName: Yup.string(),
		phoneNumber: Yup.string().required(
			t('checkout.validation.phoneNumber.required')
		),
		address: Yup.string().required(t('checkout.validation.address.required')),

		typeDelivery: Yup.boolean().required(
			t('checkout.validation.typeDelivery.required')
		),
		userName: Yup.string().required(t('checkout.validation.userName')),
		userPassword: Yup.string().required(t('checkout.validation.password')),
		repeatPasword: Yup.string()
			.required(t('checkout.validation.repeatPassword'))
			.oneOf(
				[Yup.ref('userPassword')],
				`${t('forgotPAssword.analogPassword')}`
			),
		email: Yup.string().required(t('checkout.validation.email'))
	})

	const totalPrice =
		!!basketData.length && basketData.reduce((acc, item) => acc + item.price, 0)

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(userDetail)
	})

	const extraRegisterUsers = async () => {
		const response = await AuthService.extraRegister(data)
		dispatch(loginAction(response))
		setItem('token', response.token)
	}

	const onSubmit = async e => {
		e.preventDefault()
	}

	const [userInfo, setUserInfo] = useState(true)
	const [deliveryInfo, setDeliverInfo] = useState(false)
	const [payment, setPayment] = useState(false)

	if (basketData.length === 0 || basketData.Error == 'wrong id user') {
		navigate('/customer/cart/')
	}

	return (
		<div>
			<Header />
			<div className='checkout_container'>
				<ul className='flex mt-5' style={{ marginLeft: '32px' }}>
					<li className='checkout_direction'>
						<Link to='/'>{t('cardDetail.main')}</Link>
					</li>
					<li className='checkout_direction mx-4'>
						<Link to='/customer/cart/'>{t('basket.cart')}</Link>
					</li>
					<li className='checkout_direction'>{t('checkout.order')}</li>
				</ul>

				<h2
					style={{ marginLeft: '32px' }}
					className='mt-5 ml-6 get_offer_checkout'
				>
					{t('checkout.order')}
				</h2>

				<div className='mt-8 flex justify-between'>
					<h3
						className='ml-6 flex items-center'
						style={{
							border: '1px solid silver',
							padding: '15px 20px',
							width: '742px',
							background: '#f5f5f5',
							color: '#333'
						}}
					>
						<span
							style={{
								width: '30px',
								height: '30px',
								background: 'black',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: 'white',
								borderRadius: '50%'
							}}
						>
							1
						</span>
						<span className='ml-2'>{t('checkout.orderinfo')}</span>
					</h3>
					<h3
						className='mr-6'
						style={{
							border: '1px solid silver',
							padding: '15px 20px',
							width: '685px',
							background: '#f5f5f5',
							color: '#333'
						}}
					>
						{t('checkout.yourOrder')}
					</h3>
				</div>
				<div className='flex justify-around'>
					<div style={{ width: '742px' }}>
						{userInfo && (
							<div
								style={{
									width: '100%',
									border: '1px solid silver',
									background: 'white'
								}}
							>
								<>
									{loggednIn ? (
										<form
											onSubmit={handleSubmit(onSubmit)}
											className='ml-6'
											style={{ lineHeight: '35px' }}
										>
											<div className='flex mt-4'>
												<div className='flex flex-col'>
													<label
														style={{
															color: '#a94442',
															fontWeight: 'bold',
															fontSize: '16px'
														}}
													>
														{t('checkout.name')}
													</label>
													<input
														{...register('firstName')}
														id='firstName'
														name='firstName'
														value={firstName}
														onChange={e => setFirstName(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															borderRadius: '5px'
														}}
													/>
													<p style={{ color: '#a94442', fontSize: '16px' }}>
														{errors.firstName?.message}
													</p>
												</div>
												<div className='flex flex-col'>
													<label
														style={{
															color: '#3c763d',
															fontWeight: 'bold',
															fontSize: '16px',
															marginLeft: '12px'
														}}
													>
														{t('checkout.lastName')}
													</label>
													<input
														{...register('secondName')}
														id='secondName'
														name='secondName'
														value={secondName}
														onChange={e => setSecondName(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															marginLeft: '12px',
															borderRadius: '5px'
														}}
													/>
												</div>
											</div>
											<div className='flex flex-col mt-4'>
												<label
													style={{
														color: 'rgb(169, 68, 66)',
														fontWeight: 'bold',
														fontSize: '16px'
													}}
												>
													{t('checkout.mobile')}
												</label>
												<input
													{...register('phoneNumber')}
													type={'tel'}
													name='phoneNumber'
													id='phoneNumber'
													value={phoneNumber}
													onChange={e => setPhoneNumber(e.target.value)}
													style={{
														background: '#eefaff',
														width: '652px',
														padding: '0 15px',
														borderRadius: '5px'
													}}
												/>
												<p style={{ color: '#a94442', fontSize: '16px' }}>
													{errors.phoneNumber?.message}
												</p>
											</div>
										</form>
									) : (
										<form
											onSubmit={handleSubmit(onSubmit)}
											className='flex flex-col ml-6'
											style={{ lineHeight: '35px' }}
										>
											<div className='flex mt-4'>
												<div className='flex flex-col'>
													<label
														style={{
															color: '#a94442',
															fontWeight: 'bold',
															fontSize: '16px'
														}}
													>
														{t('checkout.userName')}
													</label>
													<input
														{...register('userName')}
														id='userName'
														name='userName'
														value={userName}
														onChange={e => setUsername(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															borderRadius: '5px'
														}}
													/>
													<p style={{ color: '#a94442', fontSize: '14px' }}>
														{errors.userName?.message}
													</p>
												</div>
												<div
													className='flex flex-col'
													style={
														!!errors.userName?.message
															? { marginLeft: '0px' }
															: { marginLeft: '26px' }
													}
												>
													<label
														style={{
															color: '#a94442',
															fontWeight: 'bold',
															fontSize: '16px',
															marginLeft: '12px'
														}}
													>
														{t('checkout.password')}
													</label>
													<input
														{...register('userPassword')}
														id='userPassword'
														name='userPassword'
														value={password}
														onChange={e => setPassword(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															marginLeft: '12px',
															borderRadius: '5px'
														}}
													/>
													<p
														style={{
															color: '#a94442',
															fontSize: '14px',
															marginLeft: '14px'
														}}
													>
														{errors.userPassword?.message}
													</p>
												</div>
											</div>
											<div className='flex mt-4'>
												<div className='flex flex-col'>
													<label
														style={{
															color: '#a94442',
															fontWeight: 'bold',
															fontSize: '16px'
														}}
													>
														{t('checkout.repeatPasword')}
													</label>
													<input
														{...register('repeatPasword')}
														id='repeatPasword'
														name='repeatPasword'
														value={repeatPasword}
														onChange={e => setRepeatPassword(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															borderRadius: '5px'
														}}
													/>
													<p style={{ color: '#a94442', fontSize: '14px' }}>
														{errors.repeatPasword?.message}
													</p>
												</div>
												<div
													className='flex flex-col'
													style={{ marginLeft: '26px' }}
												>
													<label
														style={{
															color: '#a94442',
															fontWeight: 'bold',
															fontSize: '16px',
															marginLeft: '12px'
														}}
													>
														{t('checkout.email')}
													</label>
													<input
														{...register('email')}
														id='email'
														name='email'
														value={email}
														onChange={e => setEmail(e.target.value)}
														style={{
															background: '#eefaff',
															width: '320px',
															padding: '0 15px',
															marginLeft: '12px',
															borderRadius: '5px'
														}}
													/>
													<p
														style={{
															color: '#a94442',
															fontSize: '14px',
															marginLeft: '14px'
														}}
													>
														{errors.email?.message}
													</p>
												</div>
											</div>
										</form>
									)}
								</>
								<>
									<div className='mt-4'>
										<button
											style={{
												padding: '10px 15px',
												background: '#D92E15',
												color: 'white',
												marginTop: '20px',
												marginBottom: '18px',
												borderRadius: '5px',
												color: 'white',
												fontWeight: 'bold'
											}}
											className='ml-6'
											onClick={() => {
												if (Object.keys(errors).length === 0) {
													setDeliverInfo(true)
													setUserInfo(false)
													extraRegisterUsers()
												}
											}}
										>
											{t('checkout.nextStep')}
										</button>
									</div>
								</>
							</div>
						)}

						<h3
							style={{
								fontWeight: 'bold',
								border: '1px solid silver',
								padding: '15px 20px',
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<span
								style={{
									width: '30px',
									height: '30px',
									background: 'black',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									color: 'white',
									borderRadius: '50%'
								}}
							>
								2
							</span>
							<span className='ml-2' style={{ fontWeight: 'normal' }}>
								{t('checkout.deliveryInfo')}
							</span>
						</h3>
						{deliveryInfo && (
							<div
								style={{
									width: '742px',
									maxWidth: '100%',
									padding: '20px',
									border: '1px solid silver'
								}}
							>
								<p>{t('checkout.detailInfoAboutDelivery')}</p>
								<form onSubmit={handleSubmit(onSubmit)}>
									<p
										style={{
											color: '#223869',
											fontWeight: 'bold',
											marginTop: '10px'
										}}
									>
										{t('checkout.region')}
									</p>
									<select
										defaultChecked={'Andijan'}
										defaultValue={'Andijan'}
										onChange={e => setLocationDelivery(e.target.value)}
										style={{
											height: '49px',
											padding: '0 10px',
											width: '100%',
											background: '#eefaff',
											color: '#4a4a4a'
										}}
									>
										<option value='Capital Tashkent'>
											{t('checkout.city.first')}
										</option>
										<option value='Tashkent City'>
											{t('checkout.city.second')}
										</option>
										<option value='Bukhara city'>
											{t('checkout.city.third')}
										</option>
										<option value='Djizakh City'>
											{t('checkout.city.fourth')}
										</option>
										<option value='Kashkadarya City'>
											{t('checkout.city.fifth')}
										</option>
										<option value='Navoiy City'>
											{t('checkout.city.six')}
										</option>
										<option value='Namangan City'>
											{t('checkout.city.seventh')}
										</option>
										<option value='Samarkand City'>
											{t('checkout.city.eighth')}
										</option>
										<option value='Surkhandaryo City'>
											{t('checkout.city.nineth')}
										</option>
										<option value='Sirdaryo City'>
											{t('checkout.city.tenth')}
										</option>
										<option defaultChecked value='Andijan City'>
											{t('checkout.city.eleventh')}
										</option>
										<option value='Fergana City'>
											{t('checkout.city.twelveth')}
										</option>
										<option value='Khorezm City'>
											{t('checkout.city.thirteenth')}
										</option>
										<option value='Republic of Karakalpakstan'>
											{t('checkout.city.fourteenth')}
										</option>
									</select>
									<p
										style={{
											color: '#223869',
											fontWeight: 'bold',
											marginTop: '10px'
										}}
									>
										{t('checkout.addressDelivery')}
									</p>
									<input
										{...register('address')}
										name='address'
										id='address'
										value={address}
										onChange={e => setAddress(e.target.value)}
										style={{
											borderRadius: '5px',
											height: '49px',
											padding: '0 10px',
											width: '100%',
											background: '#eefaff',
											color: '#4a4a4a'
										}}
									/>
									<p style={{ color: '#a94442' }}>{errors.address?.message}</p>
									<p
										className=''
										style={{
											color: '#666',
											marginTop: '10px',
											display: 'flex'
										}}
									>
										{t('checkout.typeOfDelivery')}
										<span
											style={{
												color: '#F53D24',
												fontSize: '20px',
												marginLeft: '6px'
											}}
										>
											*
										</span>
									</p>

									<label className='flex'>
										{typeOfDelivery ? (
											<input
												{...register('typeDelivery')}
												name='typeDelivery'
												disabled
												checked='true'
												id='typeDelivery'
												type='checkbox'
												value={typeOfDelivery}
												onChange={() => setTypeOfDelivery(true)}
												style={{
													borderRadius: '5px',
													maxWidth: '150px',
													display: 'block'
												}}
											/>
										) : (
											<input
												{...register('typeDelivery')}
												name='typeDelivery'
												id='typeDelivery'
												type='checkbox'
												value={typeOfDelivery}
												onChange={() => setTypeOfDelivery(true)}
												style={{
													borderRadius: '5px',
													maxWidth: '150px',
													display: 'block'
												}}
											/>
										)}
										<span
											style={{
												width: '600px',
												color: '#F53D24',
												marginLeft: '6px'
											}}
										>
											{t('checkout.standart')}{' '}
										</span>
									</label>
									<p
										style={{
											color: '#223869',
											fontWeight: 'bold',
											marginTop: '10px'
										}}
									>
										{t('checkout.extraComment')}
									</p>
									<p>{errors.typeDelivery?.message}</p>
									<textarea
										defaultValue={extraInfo}
										onChange={e => setExtraInfo(e.target.value)}
										style={{
											width: '700px',
											background: 'rgb(238, 250, 255)',
											height: '120px'
										}}
									></textarea>
									<div>
										<button
											onClick={() => {
												setUserInfo(true)
												setDeliverInfo(false)
											}}
											style={{
												padding: '10px 15px',
												background: '#D92E15',
												color: 'white',
												marginTop: '20px',
												marginBottom: '18px',
												borderRadius: '5px',
												color: 'white',
												fontWeight: 'bold',
												width: '49%'
											}}
										>
											{t('checkout.prevStep')}
										</button>
										<button
											onClick={() => {
												if (
													typeOfDelivery &&
													!!address &&
													locationDelivery.length > 0
												) {
													setPayment(true)
													setDeliverInfo(false)
												}
											}}
											style={{
												padding: '10px 15px',
												background: '#D92E15',
												color: 'white',
												marginTop: '20px',
												marginLeft: '10px',
												marginBottom: '18px',
												borderRadius: '5px',
												color: 'white',
												fontWeight: 'bold',
												width: '49%'
											}}
										>
											{t('checkout.nextStep')}
										</button>
									</div>
								</form>
							</div>
						)}
						<h3
							style={{
								fontWeight: 'bold',
								border: '1px solid silver',
								padding: '15px 20px',
								display: 'flex',
								alignItems: 'center'
							}}
						>
							<span
								style={{
									width: '30px',
									height: '30px',
									background: 'black',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									color: 'white',
									borderRadius: '50%'
								}}
							>
								3
							</span>
							<span className='ml-2' style={{ fontWeight: 'normal' }}>
								{t('checkout.paymentInfo.name')}
							</span>
						</h3>
						{payment && (
							<div
								style={{
									border: '1px solid silver',
									background: 'white',
									padding: '20px'
								}}
							>
								<h2 style={{ color: '#666' }}>
									Способ оплаты <span style={{ color: '#F53D24' }}>*</span>
								</h2>
								<form
									onSubmit={handleSubmit(onSubmit)}
									className='flex'
									style={{ flexDirection: 'column' }}
								>
									<label style={{ color: '#666' }}>
										<input
											style={{ width: '16px', height: '16px', color: '#666' }}
											type={'radio'}
											name='payment'
											onChange={e => setPaymentSystem(e.target.value)}
											value={t('checkout.paymentInfo.uzcard')}
										/>
										<span style={{ marginLeft: '12px' }}>
											{' '}
											{t('checkout.paymentInfo.uzcard')}
										</span>
									</label>
									<label style={{ color: '#666' }}>
										<input
											style={{ width: '16px', height: '16px' }}
											type={'radio'}
											name='payment'
											onChange={e => setPaymentSystem(e.target.value)}
											value={t('checkout.paymentInfo.humo')}
										/>
										<span style={{ marginLeft: '12px' }}>
											{t('checkout.paymentInfo.humo')}
										</span>
									</label>
									<label style={{ color: '#666' }}>
										<input
											style={{ width: '16px', height: '16px' }}
											type={'radio'}
											name='payment'
											onChange={e => setPaymentSystem(e.target.value)}
											value={'Visa/Master'}
										/>
										<span style={{ marginLeft: '12px' }}>
											{t('checkout.paymentInfo.visa')}
										</span>
									</label>
								</form>
								<div>
									<button
										onClick={() => {
											setDeliverInfo(true)
											setPayment(false)
										}}
										style={{
											padding: '10px 15px',
											background: '#D92E15',
											color: 'white',
											marginTop: '20px',
											marginBottom: '18px',
											borderRadius: '5px',
											color: 'white',
											fontWeight: 'bold',
											width: '49%'
										}}
									>
										{t('checkout.prevStep')}
									</button>
									<button
										style={{
											padding: '10px 15px',
											background: 'green',
											color: 'white',
											marginTop: '20px',
											marginBottom: '18px',
											borderRadius: '5px',
											fontWeight: 'bold',
											width: '49%',
											marginLeft: '12px'
										}}
										onClick={() => {
											dispatch(paymentAsynkThunk(userData.id))
											if (!!payment) {
												if (paymentLink.id !== undefined) {
													window.location.href = `${paymentLink.id}`
													console.log(paymentLink.id)
												}
											}
										}}
									>
										{t('checkout.makeOrder')}
									</button>
								</div>
							</div>
						)}
					</div>
					<div
						style={{
							width: '683px',
							marginBottom: '1rem',
							background: 'white',
							padding: '0 22px 52px 20px'
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-between',
								marginTop: '20px'
							}}
						>
							<p
								style={{
									color: '#223869',
									fontSize: '20px',
									lineHeight: '24px',
									fontWeight: 'bold'
								}}
							>
								{t('checkout.product')}
							</p>
							<p
								style={{
									color: '#223869',
									fontSize: '20px',
									lineHeight: '24px',
									fontWeight: 'bold'
								}}
							>
								{t('checkout.overAll')}
							</p>
						</div>
						<div
							style={{
								width: '100%',
								height: '1px',
								background: 'silver',
								marginTop: '18px'
							}}
						></div>

						<div>
							<div className='' style={{ borderBottom: '1px soldi silver' }}>
								{!!basketData.length &&
									basketData.map(item => (
										<div style={{ borderBOttom: '1px solid silver' }}>
											<div
												key={item.id}
												className='flex justify-between'
												style={{ marginTop: '10px' }}
											>
												<p>{item.name}</p>
												<p
													style={{
														color: '#d92e15',
														fontSize: '20px',
														fontWeight: 'bold',
														marginTop: '6px'
													}}
												>
													{item.count * item.price} {t('checkout.soum')}
												</p>
											</div>
											<p
												style={{
													color: '#d92e15',
													fontSize: '20px',
													fontWeight: 'bold',
													marginTop: '6px'
												}}
											>
												{item.count} × {item.price} {t('checkout.soum')}
											</p>
											<img
												src={item.image}
												style={{ maxWidth: '200px', height: '100%' }}
											/>
										</div>
									))}
							</div>
							<div
								className='flex justify-between'
								style={{ borderBottom: '1px solid silver' }}
							>
								<p style={{ color: '#5f5f5f' }}>{t('checkout.price')}</p>
								<p
									style={{
										color: '#d92e15',
										fontSize: '20px',
										fontWeight: 'bold',
										marginRight: '35px'
									}}
								>
									{totalPrice} {t('checkout.soum')}
								</p>
							</div>
							<div
								className='flex justify-between'
								style={{ marginTop: '1rem', borderBottom: '1px solid silver' }}
							>
								<p style={{ color: '#5f5f5f' }}>
									{t('checkout.typeOfDelivery')}{' '}
								</p>
								<p style={{ color: '#5f5f5f', width: '150px' }}>
									{typeOfDelivery && <span>{t('checkout.standart')}</span>}
								</p>
							</div>
							<div
								className='flex justify-between'
								style={{ marginTop: '1rem' }}
							>
								<p style={{ color: '#5f5f5f' }}>
									{t('checkout.choosePayment')}
								</p>
								<p style={{ color: '#5f5f5f', marginRight: '90px' }}>
									{paymentSystem && <span>{paymentSystem}</span>}
								</p>
							</div>
							<div
								className='flex justify-between'
								style={{ marginTop: '12px' }}
							>
								<p
									style={{
										color: '#223869',
										fontWeight: 'bold',
										fontSize: '20px	'
									}}
								>
									{t('checkout.overAll')}
								</p>
								<p
									style={{
										color: '#5f5f5f',
										marginRight: '28px',
										color: '#d92e15',
										fontSize: '20px',
										fontWeight: 'bold',
										marginTop: '6px'
									}}
								>
									{totalPrice} {t('checkout.soum')}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}
