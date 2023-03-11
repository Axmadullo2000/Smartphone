import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDetailProduct, getExtraProducts } from '../../redux/asyncThunks'
import { ExtraProduct } from '../ExtraProduct'
import { Container } from '../Zoom/Container'

import facebook from '../../assets/facebook.svg'
import star from '../../assets/stars.svg'
import telegram from '../../assets/telegram.svg'
import up from '../../assets/up.svg'

import { Comments } from '../Comments'

import './CardDetail.scss'

const CardDetail = ({ slug }) => {
	const [isActive, setIsActive] = useState(false)
	const [showPhone, setShowPhone] = useState({
		first: true,
		second: false,
		third: false
	})

	const [showFullDescription, setShowFullDescription] = useState({
		description: true,
		characteristic: false,
		feedback: false
	})

	const { detailData, extraProductDetail, commentData } = useSelector(
		state => state.data
	)

	const { comments } = useSelector(comment => comment.comment)

	const dispatch = useDispatch()

	if (!!detailData.phone) {
		document.title = `Купить smartphone ${detailData.phone.name}`
	}

	let middlePrice = 5

	if (comments.length > 0) {
		middlePrice =
			comments.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.rate),
				0
			) / comments.length

		console.log(middlePrice)
	}

	useEffect(() => {
		dispatch(getDetailProduct(slug))
		dispatch(getExtraProducts(slug))
	}, [slug])

	return (
		<div style={{ marginLeft: '25px', background: '#f6f6f6' }}>
			<ul className='flex mt-4 justify-start items-center'>
				<li
					className='directionFromProducts mx-2'
					style={{
						background: '#D92E15',
						color: 'white',
						padding: '10px',
						fontSize: '12px',
						borderRadius: '4px 4px 4px 4px'
					}}
				>
					<Link to='/'>Главная</Link>
				</li>
				{!!detailData.phone && detailData.phone.types == 'smartphone' && (
					<li
						className='directionFromProducts mx-2'
						style={{
							background: '#D92E15',
							color: 'white',
							padding: '10px',
							fontSize: '12px',
							borderRadius: '0 4px 4px 0'
						}}
					>
						<Link to='/products/category/all/'>Все Смартфоны</Link>
					</li>
				)}
				<li
					className='directionFromProducts mx-2'
					style={{
						background: '#223869',
						color: 'white',
						padding: '10px',
						fontSize: '12px',
						borderRadius: '0 4px 4px 0'
					}}
				>
					{!!detailData.phone && detailData.phone.name}
					{!!extraProductDetail.airpod && extraProductDetail.airpod.name}
				</li>
			</ul>

			<div
				style={{
					margin: '35px 0px 12px 12px',
					display: 'flex'
				}}
			>
				<div>
					<div>
						{' '}
						{showPhone.first && (
							<div>
								{!!detailData.phone && (
									<Container
										isActive={isActive}
										setIsActive={setIsActive}
										imageURL={detailData.phone.photo1}
									/>
								)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<Container
											isActive={isActive}
											setIsActive={setIsActive}
											imageURL={extraProductDetail.airpod.photo1}
										/>
									)}
							</div>
						)}
						{showPhone.second && (
							<div>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<Container
											isActive={isActive}
											setIsActive={setIsActive}
											imageURL={detailData.phone.photo2}
										/>
									)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<Container
											isActive={isActive}
											setIsActive={setIsActive}
											imageURL={extraProductDetail.airpod.photo2}
										/>
									)}
							</div>
						)}
						{showPhone.third && (
							<div>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<Container
											isActive={isActive}
											setIsActive={setIsActive}
											imageURL={detailData.phone.photo3}
										/>
									)}
							</div>
						)}
					</div>
					<div className='mt-5' style={{ marginRight: '2px' }}>
						<div className='flex'>
							<div
								onClick={() => {
									setShowPhone({ first: true, second: false, third: false })
								}}
								style={
									showPhone.first
										? {
												border: '2px solid red',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
										: {
												border: '2px solid transparent',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
								}
							>
								{!!detailData.phone && (
									<img width={62} height={62} src={detailData.phone.photo1} />
								)}
								{!!extraProductDetail.airpod && (
									<img
										width={120}
										height={120}
										src={extraProductDetail.airpod.photo1}
									/>
								)}
							</div>
							<div
								onClick={() => {
									setShowPhone({ first: false, second: true, third: false })
								}}
								style={
									showPhone.second
										? {
												border: '2px solid red',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
										: {
												border: '2px solid transparent',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
								}
							>
								{!!detailData.phone && (
									<img width={62} height={62} src={detailData.phone.photo2} />
								)}
								{!!extraProductDetail.airpod && (
									<img
										width={120}
										height={120}
										src={extraProductDetail.airpod.photo2}
									/>
								)}
							</div>
							<div
								onClick={() => {
									setShowPhone({ first: false, second: false, third: true })
								}}
								style={
									showPhone.third
										? {
												border: '2px solid red',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
										: {
												border: '2px solid transparent',
												margin: '0 10px',
												borderRadius: '5px',
												cursor: 'pointer'
										  }
								}
							>
								{!!detailData.phone && (
									<>
										<img width={62} height={62} src={detailData.phone.photo3} />
									</>
								)}
							</div>
						</div>
					</div>
				</div>
				<div
					style={{
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
						background: 'white',
						marginLeft: '22px',
						padding: '20px'
					}}
				>
					<div
						className='flex mt-2'
						style={{ justifyContent: 'space-between' }}
					>
						<p className='uppercase' style={{ color: 'rgb(34, 40, 192)' }}>
							{!!detailData.phone && detailData.phone.brand}
						</p>
						<div className='flex items-center'>
							<p>Поделиться:</p>
							{!!detailData.phone && detailData.phone.types == 'smartphone' && (
								<div className='flex'>
									<>
										<Link
											to={`https://t.me/share/url?url=localhost:3000/products/view/
												${detailData.phone.id}/`}
											style={{
												padding: '5px',
												background: '#f4f4f4',
												borderRadius: '6px',
												marginLeft: '5px'
											}}
										>
											<img src={telegram} width={30} height={30} />
										</Link>

										<Link
											to={`https://www.facebook.com/sharer/sharer.php?u=localhost:3000/products/view/${detailData.phone.id}`}
											style={{
												padding: '5px',
												background: '#f4f4f4',
												borderRadius: '6px',
												marginLeft: '5px'
											}}
										>
											<img src={facebook} width={30} height={30} />
										</Link>
									</>
								</div>
							)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types == 'extra' && (
									<div className='flex'>
										<>
											<Link
												to={`https://t.me/share/url?url=localhost:3000/products/view/
												${extraProductDetail.airpod.id}`}
												style={{
													padding: '5px',
													background: '#f4f4f4',
													borderRadius: '6px',
													marginLeft: '5px'
												}}
											>
												<img src={telegram} width={30} height={30} />
											</Link>

											<Link
												to={`https://www.facebook.com/sharer/sharer.php?u=localhost:3000/products/view/${extraProductDetail.airpod.id}`}
												style={{
													padding: '5px',
													background: '#f4f4f4',
													borderRadius: '6px',
													marginLeft: '5px'
												}}
											>
												<img src={facebook} width={30} height={30} />
											</Link>
										</>
									</div>
								)}
						</div>
					</div>
					<div>
						<p
							style={{
								color: '#223869!important',
								fontSize: '20px',
								lineHeight: '24px',
								width: '450px'
							}}
						>
							{!!detailData.phone && detailData.phone.name}
						</p>
						<p style={{ color: '#3c763d' }}>Есть в наличии</p>

						<div className=''>
							<div className='flex items-center justify-between'>
								<p>Код №</p>
								<div className='flex'>
									{comments.length == 0
										? !!detailData.phone &&
										  detailData.phone.types == 'smartphone'
											? [...Array(Math.floor(detailData.phone.rating))].map(
													(item, index) => {
														return (
															<img key={index} src={star} className='star' />
														)
													}
											  )
											: [
													...Array(
														!!extraProductDetail.airpod &&
															Math.floor(extraProductDetail.airpod.rating)
													)
											  ].map((item, index) => {
													return <img key={index} src={star} className='star' />
											  })
										: // если длина массива больше чем 0
										!!detailData.phone && detailData.phone.types == 'smartphone'
										? [...Array(Math.floor(middlePrice))].map((item, index) => {
												let res
												// res += item.id
												console.log(item)
												console.log(comments)
												return <img key={index} src={star} className='star' />
										  })
										: [
												...Array(
													!!extraProductDetail.airpod && Math.floor(middlePrice)
												)
										  ].map((item, index) => {
												return <img key={index} src={star} className='star' />
										  })}
								</div>
							</div>
						</div>
					</div>
					<div>
						<h3 style={{ color: '#223869', marginBottom: '40px' }}>
							Характеристики
						</h3>
						{!!detailData.phone && detailData.phone.types == 'smartphone' && (
							<h2 style={{ color: '#223869', fontSize: '22px' }}>
								Осталось {!!detailData.phone && detailData.phone.count} штук
							</h2>
						)}
						{!!extraProductDetail.airpod &&
							extraProductDetail.airpod.types == 'extra' && (
								<h2 style={{ color: '#223869', fontSize: '22px' }}>
									Осталось{' '}
									{!!extraProductDetail.airpod &&
										extraProductDetail.airpod.count}{' '}
									штук
								</h2>
							)}
						<ul>
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types == 'extra' && (
									<li
										className='flex justify-between'
										style={{
											borderBottom: '1px dashed #cecece',
											margin: '10px 0'
										}}
									>
										<>
											{' '}
											<span className='character_item'>Вид </span>
											<span className='character_value'>
												{extraProductDetail.airpod.vid}
											</span>
										</>
									</li>
								)}
							<li
								className='flex justify-between'
								style={{ borderBottom: '1px dashed #cecece', margin: '10px 0' }}
							>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<>
											{' '}
											<span className='character_item'>Тип </span>
											<span className='character_value'>
												{detailData.phone.Version_OS}
											</span>
										</>
									)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<>
											{' '}
											<span className='character_item'>Тип </span>
											<span className='character_value'>
												{extraProductDetail.airpod.enterface}
											</span>
										</>
									)}
							</li>
							<li
								className='flex justify-between'
								style={{
									borderBottom: '1px dashed #cecece',
									margin: '10px 0'
								}}
							>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<>
											<span className='character_item'>Тип Корпуса</span>
											<span className='character_value'>
												{!!detailData.phone && detailData.phone.corpus}
											</span>
										</>
									)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<>
											<span className='character_item'>Корпус</span>
											<span className='character_value'>
												{!!extraProductDetail.airpod &&
													extraProductDetail.airpod.corpus}
											</span>
										</>
									)}
							</li>

							<li
								className='flex justify-between'
								style={{ borderBottom: '1px dashed #cecece', margin: '10px 0' }}
							>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<>
											<span className='character_item'>Тип SIM-карты </span>
											<span className='character_value'>
												{!!detailData.phone &&
													detailData.phone.sim_card &&
													detailData.phone.sim_card != undefined}
											</span>
										</>
									)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<>
											<span className='character_item'>Время работы </span>
											<span className='character_value'>
												{extraProductDetail.airpod.time_work}
											</span>
										</>
									)}
							</li>
							<li
								className='flex justify-between'
								style={{ borderBottom: '1px dashed #cecece', margin: '10px 0' }}
							>
								{!!detailData.phone &&
									detailData.phone.types == 'smartphone' && (
										<>
											<span className='character_item'>Размеры (ШxВxТ) </span>
											<span className='character_value'>
												{!!detailData.phone && detailData.phone.allow_display}
											</span>
										</>
									)}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.types == 'extra' && (
										<>
											<span className='character_item'>Вес </span>
											<span className='character_value'>
												{extraProductDetail.airpod.weight}
											</span>
										</>
									)}
							</li>
							{!!detailData.phone && detailData.phone.types == 'smartphone' && (
								<li
									className='flex justify-between'
									style={{
										borderBottom: '1px dashed #cecece',
										margin: '10px 0'
									}}
								>
									<>
										<span>Время работы </span>
										<span className='character_value'>
											{detailData.phone.time_work}{' '}
										</span>
									</>
								</li>
							)}
							<li
								style={{
									display: 'flex',
									justifyContent: 'flex-end',
									color: '#D92E15',
									cursor: 'pointer'
								}}
								onClick={() =>
									setShowFullDescription({
										description: false,
										characteristic: true,
										feedback: false
									})
								}
							>
								Все
							</li>
						</ul>
					</div>
				</div>

				<div
					style={{
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.5)',
						background: 'white',
						marginLeft: '22px',
						padding: '20px'
					}}
				>
					<h1 style={{ fontSize: '24px' }}>
						Цена:{' '}
						<span
							style={{
								fontSize: '33px',
								color: '#d92e15',
								fontWeight: '700'
							}}
						>
							<span style={{ letterSpacing: '3px' }}>
								{!!detailData.phone && detailData.phone.price}
								{!!extraProductDetail.airpod && extraProductDetail.airpod.price}
							</span>
							сум
						</span>
					</h1>

					<div style={{ marginTop: '10px' }}>
						<Link
							className='hover:shadow	hover:shadow-slate-400 ease-in'
							to='/'
							style={{
								padding: '12px 10px',
								background: '#d92e15',
								borderRadius: '5px',
								color: 'white',
								fontSize: '16px',
								fontWeight: '700'
							}}
						>
							Купить сейчас
						</Link>
						<button
							className='hover:shadow	hover:shadow-slate-400 ease-in	'
							style={{
								padding: '11px 10px',
								background: '#d92e15',
								borderRadius: '5px',
								color: 'white',
								fontSize: '16px',
								fontWeight: '700',
								marginLeft: '10px'
							}}
						>
							Добавить в корзину
						</button>
					</div>
				</div>
			</div>
			<div
				style={{
					marginTop: '5rem',
					background: 'white',
					padding: '50px',
					width: '1200px'
				}}
			>
				<ul className='flex'>
					<li
						style={
							showFullDescription.description
								? {
										color: '#d92e15',
										borderBottom: '3px solid #d92e15',
										fontWeight: '700',
										cursor: 'pointer'
								  }
								: { cursor: 'pointer', color: '#838383' }
						}
						className='mx-2'
						onClick={() =>
							setShowFullDescription({
								description: true,
								characteristic: false,
								feedback: false
							})
						}
					>
						Описание
					</li>
					<li
						style={
							showFullDescription.characteristic
								? {
										color: '#d92e15',
										borderBottom: '3px solid #d92e15',
										fontWeight: '700',
										cursor: 'pointer'
								  }
								: { cursor: 'pointer', color: '#838383' }
						}
						className='mx-2'
						onClick={() =>
							setShowFullDescription({
								description: false,
								characteristic: true,
								feedback: false
							})
						}
					>
						Характеристики
					</li>

					<li
						style={
							showFullDescription.feedback
								? {
										color: '#d92e15',
										borderBottom: '3px solid #d92e15',
										fontWeight: '700',
										cursor: 'pointer'
								  }
								: { cursor: 'pointer', color: '#838383' }
						}
						className='mx-2'
						onClick={() =>
							setShowFullDescription({
								description: false,
								characteristic: false,
								feedback: true
							})
						}
					>
						Отзывы
					</li>
				</ul>

				<div style={{ marginTop: '40px' }}>
					{showFullDescription.description && (
						<div>
							{!!detailData.phone && detailData.phone.types == 'smartphone' && (
								<>
									<p
										style={{
											color: '#223869',
											marginBottom: '12px',
											fontWeight: '600'
										}}
									>
										{!!detailData.phone && detailData.phone.name}
									</p>
									<p style={{ lineHeight: '30px' }}>
										{!!detailData.phone && detailData.phone.description}
									</p>
								</>
							)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types == 'extra' && (
									<>
										<p
											style={{
												color: '#223869',
												marginBottom: '12px',
												fontWeight: '600'
											}}
										>
											{!!extraProductDetail.airpod &&
												extraProductDetail.airpod.name}
										</p>
										<p style={{ lineHeight: '30px' }}>
											{!!extraProductDetail.airpod &&
												extraProductDetail.airpod.description}
										</p>
									</>
								)}
						</div>
					)}
					{showFullDescription.characteristic && (
						<div>
							<p
								style={{
									color: '#223869',
									fontWeight: '600',
									fontSize: '20px',
									lineHeight: '24px',
									marginBottom: '30px'
								}}
							>
								Характеристики
							</p>

							<div>
								{
									<>
										<ul style={{ lineHeight: '40px' }}>
											{!!detailData.phone && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>Версия ОС</span>
													<span>{detailData.phone.Version_OS}</span>
												</li>
											)}
											{!!detailData.phone && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>Корпус </span>
													<span>{detailData.phone.corpus}</span>
												</li>
											)}
											{!!detailData.phone && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>
														Количество SIM-карт{' '}
													</span>
													<span>{detailData.phone.sim_card}</span>
												</li>
											)}

											{!!detailData.phone && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>Размеры </span>
													<span>{detailData.phone.size}</span>
												</li>
											)}

											{!!detailData.phone && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>Вес </span>
													<span>{detailData.phone.sim_card}</span>
												</li>
											)}
										</ul>
									</>
								}
							</div>

							{!!detailData.phone && detailData.phone.types == 'smartphone' && (
								<div style={{ lineHeight: '40px' }}>
									<h2
										style={{
											borderBottom: '1px dashed #cecece',
											color: '#d92e15',
											fontWeight: '600',
											fontSize: '20px',
											marginTop: '22px'
										}}
									>
										Экран
									</h2>
									<ul>
										{detailData.phone != undefined && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Тип экрана</span>
												<span>{detailData.phone.display_type}</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Диагональ </span>
												<span>
													{detailData.phone.diagonale}{' '}
													{detailData.phone.allow_display}
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Разрешение экрана </span>
												<span>
													{detailData.phone.allow_display.slice(1, 9)}
												</span>
											</li>
										)}
									</ul>

									<h2
										style={{
											borderBottom: '1px dashed #cecece',
											color: '#d92e15',
											fontWeight: '600',
											fontSize: '20px',
											marginTop: '22px'
										}}
									>
										Мультимедиа{' '}
									</h2>
									<ul>
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Фотокамера</span>
												<span>
													{!!detailData.phone && detailData.phone.photo_kamera}
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Фронтальная камера</span>
												<span>
													{!!detailData.phone && detailData.phone.front_kamera}{' '}
													МП
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													Разъем для наушников
												</span>
												<span className='capitalize'>
													{!!detailData.phone &&
														detailData.phone.headphone_jack}
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}> Аудио</span>
												<span className='capitalize'>
													{!!detailData.phone && detailData.phone.audio}
												</span>
											</li>
										)}
									</ul>
									<h2
										style={{
											borderBottom: '1px dashed #cecece',
											color: '#d92e15',
											fontWeight: '600',
											fontSize: '20px',
											marginTop: '22px'
										}}
									>
										Связь{' '}
									</h2>
									<ul>
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Стандарт</span>
												<span>{detailData.phone.standart}</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Интерфейсы</span>
												<span>
													{!!detailData.phone && detailData.phone.Interface}
												</span>
											</li>
										)}
									</ul>
									<h2
										style={{
											borderBottom: '1px dashed #cecece',
											color: '#d92e15',
											fontWeight: '600',
											fontSize: '20px',
											marginTop: '22px'
										}}
									>
										Память и процессор{' '}
									</h2>
									<ul>
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Процессор</span>
												<span>
													{!!detailData.phone && detailData.phone.yadra} ядра
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													Объем встроенной памяти
												</span>
												<span>
													{!!detailData.phone && detailData.phone.giga_vstoeno}{' '}
													Гб
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													Объем оперативной памяти
												</span>
												<span>
													{!!detailData.phone && detailData.phone.giga_operate}{' '}
													Гб
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													Слот для карт памяти
												</span>
												<span>
													{!!detailData.phone && detailData.phone.sloy_card}
												</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>Аккумулятор</span>
												<span>
													{!!detailData.phone && detailData.phone.accumulator}{' '}
													мА
												</span>
											</li>
										)}

										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													Дополнительная информация{' '}
												</span>
												<span>
													{!!detailData.phone && detailData.phone.dop_infa}
												</span>
											</li>
										)}
									</ul>
								</div>
							)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types == 'extra' && (
									<ul>
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Тип </span>
											<span>{extraProductDetail.airpod.enterface}</span>
										</li>
										{!!extraProductDetail.airpod &&
											extraProductDetail.airpod.types == 'extra' && (
												<li className='phone_details'>
													<span style={{ width: '50%' }}>Вид </span>
													<span>{extraProductDetail.airpod.vid}</span>
												</li>
											)}
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Корпус </span>
											<span>{extraProductDetail.airpod.corpus}</span>
										</li>
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Время работы </span>
											<span>{extraProductDetail.airpod.time_work}</span>
										</li>
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Вес </span>
											<span>{extraProductDetail.airpod.weight}</span>
										</li>
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Шумоподавление </span>
											<span>{extraProductDetail.airpod.anti_shum}</span>
										</li>
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												Дополнительная информация{' '}
											</span>
											<span>{extraProductDetail.airpod.dop_infa}</span>
										</li>
									</ul>
								)}
						</div>
					)}

					{showFullDescription.feedback && !!detailData.phone && (
						<>
							<li
								className='flex justify-between'
								style={{
									borderBottom: '1px dashed #cecece',
									margin: '10px 0'
								}}
							>
								{commentData['user info'] != undefined &&
									commentData['user info'].username}
							</li>

							<Comments id={detailData.phone.id} />
						</>
					)}

					{showFullDescription.feedback && !!extraProductDetail.airpod && (
						<Comments id={extraProductDetail.airpod.id} />
					)}
				</div>
			</div>

			<div>
				<button
					style={{
						position: 'fixed',
						right: '30px',
						bottom: '20px',
						zIndex: 999
					}}
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth'
						})
					}}
				>
					<img src={up} alt='up' />
				</button>
			</div>

			{!!detailData.phone && detailData.phone.types == 'smartphone' && (
				<ExtraProduct similarData={detailData} />
			)}
			{!!extraProductDetail.airpod &&
				extraProductDetail.airpod.types == 'extra' && (
					<ExtraProduct similarData={extraProductDetail} />
				)}
		</div>
	)
}

export default CardDetail
