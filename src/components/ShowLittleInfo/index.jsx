import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useCart } from 'react-use-cart'

import { Container } from '../Zoom/Container'

import { useTranslation } from 'react-i18next'
import facebook from '../../assets/facebook.svg'
import star from '../../assets/stars.svg'
import telegram from '../../assets/telegram.svg'

export const ShowLittleInfo = ({ setShowFullDescription }) => {
	const [isActive, setIsActive] = useState(false)
	const [showPhone, setShowPhone] = useState({
		first: true,
		second: false,
		third: false
	})
	const { detailData, extraProductDetail } = useSelector(state => state.data)
	const { comments } = useSelector(comment => comment.comment)

	const { addItem } = useCart()
	const { t } = useTranslation()
	let middlePrice = 5

	if (comments.length > 0) {
		middlePrice =
			comments.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.rate),
				0
			) / comments.length
	}

	return (
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
								extraProductDetail.airpod.types === 'extra' && (
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
								detailData.phone.types === 'smartphone' && (
									<Container
										isActive={isActive}
										setIsActive={setIsActive}
										imageURL={detailData.phone.photo2}
									/>
								)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types === 'extra' && (
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
								detailData.phone.types === 'smartphone' && (
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
								<img
									width={62}
									height={62}
									src={detailData.phone.photo1}
									alt='phone'
								/>
							)}
							{!!extraProductDetail.airpod && (
								<img
									width={120}
									height={120}
									src={extraProductDetail.airpod.photo1}
									alt='airpod'
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
								<img
									width={62}
									height={62}
									src={detailData.phone.photo2}
									alt='phone'
								/>
							)}
							{!!extraProductDetail.airpod && (
								<img
									width={120}
									height={120}
									src={extraProductDetail.airpod.photo2}
									alt='airpod'
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
									<img
										width={62}
										height={62}
										src={detailData.phone.photo3}
										alt='phone'
									/>
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
				<div className='flex mt-2' style={{ justifyContent: 'space-between' }}>
					<p className='uppercase' style={{ color: 'rgb(34, 40, 192)' }}>
						{!!detailData.phone && detailData.phone.brand}
					</p>
					<div className='flex items-center'>
						<p>{t('showLittleinfo.share')}:</p>
						{!!detailData.phone && detailData.phone.types === 'smartphone' && (
							<div className='flex'>
								<>
									<Link
										to={`https://t.me/share/url?url=http://smartshopcenter.org:3000/products/view/
												${detailData.phone.slug}/`}
										style={{
											padding: '5px',
											background: '#f4f4f4',
											borderRadius: '6px',
											marginLeft: '5px'
										}}
									>
										<img src={telegram} width={30} height={30} alt='telegram' />
									</Link>

									<Link
										to={`https://www.facebook.com/sharer/sharer.php?u=http://smartshopcenter.org:3000/products/view/${detailData.phone.slug}`}
										style={{
											padding: '5px',
											background: '#f4f4f4',
											borderRadius: '6px',
											marginLeft: '5px'
										}}
									>
										<img src={facebook} width={30} height={30} alt='facebook' />
									</Link>
								</>
							</div>
						)}
						{!!extraProductDetail.airpod &&
							extraProductDetail.airpod.types === 'extra' && (
								<div className='flex'>
									<>
										<Link
											to={`https://t.me/share/url?url=http://smartshopcenter.org:3000/products/view/${extraProductDetail.airpod.id}`}
											style={{
												padding: '5px',
												background: '#f4f4f4',
												borderRadius: '6px',
												marginLeft: '5px'
											}}
										>
											<img
												src={telegram}
												width={30}
												height={30}
												alt='telegram'
											/>
										</Link>

										<Link
											to={`https://www.facebook.com/sharer/sharer.php?u=http://smartshopcenter.org:3000/products/view/${extraProductDetail.airpod.id}`}
											style={{
												padding: '5px',
												background: '#f4f4f4',
												borderRadius: '6px',
												marginLeft: '5px'
											}}
										>
											<img
												src={facebook}
												width={30}
												height={30}
												alt='facebook'
											/>
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
					<p style={{ color: '#3c763d' }}>{t('showLittleinfo.cash')}</p>

					<div className=''>
						<div className='flex items-center justify-between'>
							<p>{t('showLittleinfo.code')} №</p>
							<div className='flex'>
								{comments.length === 0
									? !!detailData.phone &&
									  detailData.phone.types === 'smartphone'
										? [...Array(Math.floor(detailData.phone.rating))].map(
												(item, index) => {
													return (
														<img
															key={index}
															src={star}
															alt='star'
															className='star'
														/>
													)
												}
										  )
										: [
												...Array(
													!!extraProductDetail.airpod &&
														Math.floor(extraProductDetail.airpod.rating)
												)
										  ].map((item, index) => {
												return (
													<img
														alt='star'
														key={index}
														src={star}
														className='star'
													/>
												)
										  })
									: // если длина массива больше чем 0
									!!detailData.phone && detailData.phone.types === 'smartphone'
									? [...Array(Math.floor(middlePrice))].map(index => {
											return (
												<img
													alt='star'
													key={index}
													src={star}
													className='star'
												/>
											)
									  })
									: [
											...Array(
												!!extraProductDetail.airpod && Math.floor(middlePrice)
											)
									  ].map((item, index) => {
											return (
												<img
													alt='star'
													key={index}
													src={star}
													className='star'
												/>
											)
									  })}
							</div>
						</div>
					</div>
				</div>
				<div>
					<h3 style={{ color: '#223869', marginBottom: '40px' }}>
						{t('extraInfoAbout.character')}
					</h3>
					{!!detailData.phone && detailData.phone.types === 'smartphone' && (
						<h2 style={{ color: '#223869', fontSize: '22px' }}>
							{t('showLittleinfo.left')}{' '}
							{!!detailData.phone && detailData.phone.count}{' '}
							{t('showLittleinfo.count')}
						</h2>
					)}
					{!!extraProductDetail.airpod &&
						extraProductDetail.airpod.types === 'extra' && (
							<h2 style={{ color: '#223869', fontSize: '22px' }}>
								{t('showLittleinfo.left')}
								{!!extraProductDetail.airpod &&
									extraProductDetail.airpod.count}{' '}
								{t('showLittleinfo.count')}
							</h2>
						)}
					<ul>
						{!!extraProductDetail.airpod &&
							extraProductDetail.airpod.types === 'extra' && (
								<li
									className='flex justify-between'
									style={{
										borderBottom: '1px dashed #cecece',
										margin: '10px 0'
									}}
								>
									<>
										{' '}
										<span className='character_item'>
											{t('showLittleinfo.view')}{' '}
										</span>
										<span className='character_value'>
											{extraProductDetail.airpod.vid}
										</span>
									</>
								</li>
							)}
						<li
							className='flex justify-between'
							style={{
								borderBottom: '1px dashed #cecece',
								margin: '10px 0'
							}}
						>
							{!!detailData.phone &&
								detailData.phone.types === 'smartphone' && (
									<>
										{' '}
										<span className='character_item'>
											{t('searchResult.type')}
										</span>
										<span className='character_value'>
											{detailData.phone.Version_OS}
										</span>
									</>
								)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types === 'extra' && (
									<>
										{' '}
										<span className='character_item'>
											{t('searchResult.type')}{' '}
										</span>
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
								detailData.phone.types === 'smartphone' && (
									<>
										<span className='character_item'>
											{t('showLittleinfo.typeCorpus')}
										</span>
										<span className='character_value'>
											{!!detailData.phone && detailData.phone.corpus}
										</span>
									</>
								)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types === 'extra' && (
									<>
										<span className='character_item'>
											{' '}
											{t('showLittleinfo.corpus')}
										</span>
										<span className='character_value'>
											{!!extraProductDetail.airpod &&
												extraProductDetail.airpod.corpus}
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
								detailData.phone.types === 'smartphone' && (
									<>
										<span className='character_item'>
											{t('searchResult.typeSimCard')}
										</span>
										<span className='character_value'>
											{!!detailData.phone &&
												detailData.phone.sim_card &&
												detailData.phone.sim_card !== undefined}
										</span>
									</>
								)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types === 'extra' && (
									<>
										<span className='character_item'>
											{t('extraInfoAbout.workTime')}
										</span>
										<span className='character_value'>
											{extraProductDetail.airpod.time_work}
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
								detailData.phone.types === 'smartphone' && (
									<>
										<span className='character_item'>
											{t('searchResult.size')} (ШxВxТ){' '}
										</span>
										<span className='character_value'>
											{!!detailData.phone && detailData.phone.allow_display}
										</span>
									</>
								)}
							{!!extraProductDetail.airpod &&
								extraProductDetail.airpod.types === 'extra' && (
									<>
										<span className='character_item'>
											{t('extraInfoAbout.weight')}{' '}
										</span>
										<span className='character_value'>
											{extraProductDetail.airpod.weight}
										</span>
									</>
								)}
						</li>
						{!!detailData.phone && detailData.phone.types === 'smartphone' && (
							<li
								className='flex justify-between'
								style={{
									borderBottom: '1px dashed #cecece',
									margin: '10px 0'
								}}
							>
								<>
									<span>{t('extraInfoAbout.workTime')}</span>
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
							{t('showLittleinfo.all')}
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
					{t('basketCard.price')}:
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
						{t('basketCard.soum')}
					</span>
				</h1>

				<div style={{ marginTop: '10px' }}>
					{!!detailData.phone && (
						<>
							<Link
								onClick={() => addItem({ ...detailData.phone })}
								className='hover:shadow	hover:shadow-slate-400 ease-in'
								to='/customer/checkout'
								style={{
									padding: '12px 16px',
									background: '#d92e15',
									borderRadius: '5px',
									color: 'white',
									fontSize: '16px',
									fontWeight: '700'
								}}
							>
								{t('showLittleinfo.buyNow')}
							</Link>
							<button
								onClick={() => addItem({ ...detailData.phone })}
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
								{t('showLittleinfo.addToCart')}
							</button>
						</>
					)}
					{!!extraProductDetail.airpod && (
						<>
							<Link
								onClick={() => addItem({ ...extraProductDetail.airpod })}
								className='hover:shadow	hover:shadow-slate-400 ease-in'
								to='/'
								style={{
									padding: '12px 16px',
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
								onClick={() => addItem({ ...extraProductDetail.airpod })}
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
						</>
					)}
				</div>
			</div>
		</div>
	)
}
