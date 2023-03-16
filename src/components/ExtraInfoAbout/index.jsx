import { useSelector } from 'react-redux'

import { Comments } from '../Comments'

export const ExtraInfoAbout = ({
	showFullDescription,
	setShowFullDescription
}) => {
	const { detailData, extraProductDetail, commentData } = useSelector(
		data => data.data
	)

	return (
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
											<span>{detailData.phone.allow_display.slice(1, 9)}</span>
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
												{!!detailData.phone && detailData.phone.front_kamera} МП
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Разъем для наушников</span>
											<span className='capitalize'>
												{!!detailData.phone && detailData.phone.headphone_jack}
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
												{!!detailData.phone && detailData.phone.giga_vstoeno} Гб
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												Объем оперативной памяти
											</span>
											<span>
												{!!detailData.phone && detailData.phone.giga_operate} Гб
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Слот для карт памяти</span>
											<span>
												{!!detailData.phone && detailData.phone.sloy_card}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>Аккумулятор</span>
											<span>
												{!!detailData.phone && detailData.phone.accumulator} мА
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
	)
}
