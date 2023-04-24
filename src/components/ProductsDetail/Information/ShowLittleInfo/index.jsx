import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { addProductToBasket } from '../../../../redux/asyncThunks/Basket'
import { Container } from '../../Zoom/Container'

import facebook from '../../../../assets/facebook.svg'
import star from '../../../../assets/stars.svg'
import telegram from '../../../../assets/telegram.svg'

import './ShowLittleInfo.scss'

export const ShowLittleInfo = ({ setShowFullDescription }) => {
	const [isActive, setIsActive] = useState(false)
	const [showPhone, setShowPhone] = useState({
		first: true,
		second: false,
		third: false
	})
	const [errorInAddToBasket, setErrorInAddToBasket] = useState(false)
	const [errorInBuyProduct, setErrorInBuyProduct] = useState(false)

	const { detailData, extraProductDetail } = useSelector(state => state.data)
	const { comments } = useSelector(comment => comment.comment)
	const { loggednIn } = useSelector(state => state.auth)

	const { t } = useTranslation()

	const navigate = useNavigate()
	const dispatch = useDispatch()

	let middlePrice = 5

	const language = localStorage.getItem('lang')
		? localStorage.getItem('lang')
		: 'uz'
	if (comments.length > 0) {
		middlePrice =
			comments.reduce(
				(accumulator, currentValue) => accumulator + Number(currentValue.rate),
				0
			) / comments.length
	}

	return (
		<div className='showLittleContainer'>
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
							{!!detailData.phone && (
								<Container
									isActive={isActive}
									setIsActive={setIsActive}
									imageURL={detailData.phone.photo2}
								/>
							)}
							{!!extraProductDetail.airpod && (
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
							{!!detailData.phone && (
								<Container
									isActive={isActive}
									setIsActive={setIsActive}
									imageURL={detailData.phone.photo3}
								/>
							)}
						</div>
					)}
				</div>
				<div className='mt-5'>
					<div className='flex'>
						<div
							onClick={() => {
								setShowPhone({ first: true, second: false, third: false })
							}}
							className={`icon_detail
								${showPhone.first ? 'activeIcon_detail' : ''}
									`}
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
							className={`icon_detail
								${showPhone.second ? 'activeIcon_detail' : ''}
									`}
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
							className={`icon_detail
							${showPhone.third ? 'activeIcon_detail' : ''}
								`}
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
			<div className='detailInfo_content'>
				<div className='flex mt-2 justify-between items-center socialNetworks_detail'>
					<p className='uppercase blue-color'>
						{!!detailData.phone && detailData.phone.brand}
					</p>
					<div className='flex items-center shareWithLinks ml-2'>
						<p>{t('showLittleinfo.share')}:</p>
						{!!detailData.phone && detailData.phone.types === 'smartphone' && (
							<div className='flex'>
								<>
									<Link
										to={`https://t.me/share/url?url=http://smartshopcenter.org:3000/products/view/
												${detailData.phone.slug}/`}
										className='social_detail'
									>
										<img src={telegram} width={30} height={30} alt='telegram' />
									</Link>

									<Link
										to={`https://www.facebook.com/sharer/sharer.php?u=http://smartshopcenter.org:3000/products/view/${detailData.phone.slug}`}
										className='social_detail'
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
											className='social_detail'
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
											className='social_detail'
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
					<p className='titleOfDetailContent'>
						{!!detailData.phone && detailData.phone.name}
					</p>
					<p style={{ color: '#3c763d' }}>{t('showLittleinfo.cash')}</p>

					<div className=''>
						<div className='flex items-center justify-between codeOfProduct'>
							<p>
								{t('showLittleinfo.code')} №{' '}
								{(!!extraProductDetail.airpod &&
									extraProductDetail.airpod.id) ||
									(!!detailData.phone && detailData.phone.id)}
							</p>
							<div className='flex stars_detail'>
								{comments.length === 0
									? !!detailData.phone
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
									!!detailData.phone
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
					{!!detailData.phone && (
						<h2 style={{ color: '#223869', fontSize: '22px' }}>
							{t('showLittleinfo.left')}
							{': '}

							{!!detailData.phone && detailData.phone.count}
							{t('showLittleinfo.count')}
						</h2>
					)}
					{!!extraProductDetail.airpod &&
						extraProductDetail.airpod.types === 'extra' && (
							<h2 style={{ color: '#223869', fontSize: '22px' }}>
								{t('showLittleinfo.left')}
								{': '}
								{!!extraProductDetail.airpod && extraProductDetail.airpod.count}

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
							{!!detailData.phone && (
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
							{!!detailData.phone && (
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
							{!!detailData.phone && (
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
							{!!detailData.phone && (
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
						{!!detailData.phone && (
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
							className='flex cursor-pointer justify-end'
							style={{
								color: '#D92E15'
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

			<div className='priceOfProduct'>
				<h1 className='price_title'>
					{t('basketCard.price')}:{' '}
					<span
						style={{
							fontSize: '33px',
							color: '#d92e15',
							fontWeight: '700'
						}}
					>
						{!!detailData.phone && (
							<span style={{ letterSpacing: '3px' }}>
								{!!detailData.phone &&
									language === 'uz' &&
									detailData.phone.price}{' '}
								{language === 'uz' && ' сум'}
								{!!detailData.phone &&
									language === 'ru' &&
									Number(detailData.phone.price / 140.25).toFixed(1)}
								{language === 'ru' && ' рубль '}
								{!!detailData.phone &&
									language === 'uk' &&
									Number(detailData.phone.price / 309.98).toFixed(1)}
								{language === 'uk' && ' гривен'}
							</span>
						)}
						{!!extraProductDetail.airpod && (
							<span>
								{language === 'uz' && extraProductDetail.airpod.price}
								{language === 'uz' && " so'm"}
								{!!extraProductDetail.airpod &&
									language === 'ru' &&
									Number(extraProductDetail.airpod.price / 140.25).toFixed(1)}
								{language === 'ru' && ' рубль'}
								{!!extraProductDetail.airpod &&
									language === 'uk' &&
									Number(extraProductDetail.airpod.price / 309.98).toFixed(1)}
								{language === 'uk' && ' гривен'}
							</span>
						)}
					</span>
				</h1>

				<div className='basket_btns' style={{ marginTop: '10px' }}>
					{!!detailData.phone && (
						<>
							<button
								onClick={() => {
									if (loggednIn) {
										dispatch(
											addProductToBasket({
												product_id: detailData.phone.id,
												group_product:
													detailData.phone.types === 'smartphone' ? 1 : 2
											})
										)
										navigate('/customer/checkout')
									} else {
										setErrorInBuyProduct(true)
									}
								}}
								className='buyNow hover:shadow	hover:shadow-slate-400 ease-in'
								to='/customer/checkout'
							>
								{t('showLittleinfo.buyNow')}
							</button>
							<button
								onClick={() => {
									if (loggednIn) {
										dispatch(
											addProductToBasket({
												product_id: detailData.phone.id,
												group_product:
													detailData.phone.types === 'smartphone' ? 1 : 2
											})
										)
									} else {
										setErrorInAddToBasket(true)
									}
								}}
								className='addToBasket_detail hover:shadow	hover:shadow-slate-400 ease-in'
							>
								{t('showLittleinfo.addToCart')}
							</button>
						</>
					)}
					{errorInAddToBasket && (
						<p style={{ color: '#d92e15' }}>
							{t('showLittleinfo.signInForAddToBasket')}
						</p>
					)}
					{errorInBuyProduct && (
						<p style={{ color: '#d92e15' }}>
							{t('showLittleinfo.signInForBuyProduct')}
						</p>
					)}

					{!!extraProductDetail.airpod && (
						<>
							<button
								onClick={() => {
									if (loggednIn) {
										dispatch(
											addProductToBasket({
												product_id: detailData.phone.id,
												group_product:
													extraProductDetail.phone.types === 'smartphone'
														? 1
														: 2
											})
										)
										navigate('/customer/checkout')
									} else {
										setErrorInBuyProduct(true)
									}
								}}
								className='buyNow'
							>
								{t('showLittleinfo.buyNow')}
							</button>
							<button
								onClick={() => {
									if (loggednIn) {
										dispatch(
											addProductToBasket({
												product_id: extraProductDetail.airpod.id,
												group_product:
													extraProductDetail.airpod.types === 'smartphone'
														? 1
														: 2
											})
										)
									} else {
										setErrorInAddToBasket(true)
									}
								}}
								className='addToBasket_detail hover:shadow	hover:shadow-slate-400 ease-in'
							>
								{t('showLittleinfo.addToCart')}
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
