import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { Comments } from '../../Comments/Comments'

import './ExtraInfoAbout.scss'

export const ExtraInfoAbout = ({
	showFullDescription,
	setShowFullDescription
}) => {
	const { detailData, extraProductDetail, commentData } = useSelector(
		data => data.data
	)

	const { t } = useTranslation()

	return (
		<div className='extraContainer'>
			<ul className='flex'>
				<li
					className={`mx-2 side_detail ${
						showFullDescription.description ? 'activeSide_detail' : ''
					} `}
					onClick={() =>
						setShowFullDescription({
							description: true,
							characteristic: false,
							feedback: false
						})
					}
				>
					{t('extraInfoAbout.desc')}
				</li>
				<li
					className={`mx-2 side_detail ${
						showFullDescription.characteristic ? 'activeSide_detail' : ''
					} `}
					onClick={() =>
						setShowFullDescription({
							description: false,
							characteristic: true,
							feedback: false
						})
					}
				>
					{t('extraInfoAbout.character')}
				</li>

				<li
					className={`mx-2 side_detail ${
						showFullDescription.feedback ? 'activeSide_detail' : ''
					} `}
					onClick={() =>
						setShowFullDescription({
							description: false,
							characteristic: false,
							feedback: true
						})
					}
				>
					{t('extraInfoAbout.feedback')}
				</li>
			</ul>

			<div style={{ marginTop: '40px' }}>
				{showFullDescription.description && (
					<div>
						{!!detailData.phone && detailData.phone.types === 'smartphone' && (
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
							extraProductDetail.airpod.types === 'extra' && (
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
							{t('extraInfoAbout.character')}
						</p>

						<div>
							{
								<>
									<ul style={{ lineHeight: '40px' }}>
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('extraInfoAbout.version')}
												</span>
												<span>{detailData.phone.version_os}</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('extraInfoAbout.corpus')}{' '}
												</span>
												<span>{detailData.phone.corpus}</span>
											</li>
										)}
										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('extraInfoAbout.countSimCart')}
												</span>
												<span>{detailData.phone.sim_card}</span>
											</li>
										)}

										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('extraInfoAbout.size')}{' '}
												</span>
												<span>{detailData.phone.size}</span>
											</li>
										)}

										{!!detailData.phone && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('extraInfoAbout.weight')}{' '}
												</span>
												<span>{detailData.phone.sim_card}</span>
											</li>
										)}
									</ul>
								</>
							}
						</div>

						{!!detailData.phone && detailData.phone.types === 'smartphone' && (
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
									{t('extraInfoAbout.screen')}
								</h2>
								<ul>
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.typeScreen')}
											</span>
											<span>{detailData.phone.display_type}</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.diagonal')}{' '}
											</span>
											<span>
												{detailData.phone.diagonale}{' '}
												{detailData.phone.allow_display}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.sizeScreen')}
											</span>
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
									{t('extraInfoAbout.media')}
								</h2>
								<ul>
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.camera')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.photo_kamera}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.frontCamera')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.front_kamera}{' '}
												{t('cardFilter.mp')}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.sizeHeadphone')}
											</span>
											<span className='capitalize'>
												{!!detailData.phone && detailData.phone.headphone_jack}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{' '}
												{t('extraInfoAbout.audio')}
											</span>
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
									{t('extraInfoAbout.connection')}
								</h2>
								<ul>
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.standart')}
											</span>
											<span>{detailData.phone.standart}</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.interface')}
											</span>
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
									{t('extraInfoAbout.memoryAndPro')}
								</h2>
								<ul>
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.protsessor')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.yadra}{' '}
												{t('extraInfoAbout.yadr')}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.memory')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.giga_vstoeno}{' '}
												{t('cardFilter.gb')}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.operativeMemory')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.giga_operate}{' '}
												{t('cardFilter.gb')}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.cartMemory')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.sloy_card}
											</span>
										</li>
									)}
									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('cardFilter.acumlator')}
											</span>
											<span>
												{!!detailData.phone && detailData.phone.accumulator}{' '}
												{t('cardFilter.amper')}
											</span>
										</li>
									)}

									{!!detailData.phone && (
										<li className='phone_details'>
											<span style={{ width: '50%' }}>
												{t('extraInfoAbout.extaInfo')}
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
							extraProductDetail.airpod.types === 'extra' && (
								<ul>
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('extraInfoAbout.type')}{' '}
										</span>
										<span>{extraProductDetail.airpod.enterface}</span>
									</li>
									{!!extraProductDetail.airpod &&
										extraProductDetail.airpod.types === 'extra' && (
											<li className='phone_details'>
												<span style={{ width: '50%' }}>
													{t('showLittleinfo.view')}{' '}
												</span>
												<span>{extraProductDetail.airpod.vid}</span>
											</li>
										)}
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('extraInfoAbout.corpuse')}
										</span>
										<span>{extraProductDetail.airpod.corpus}</span>
									</li>
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('extraInfoAbout.workTime')}
										</span>
										<span>{extraProductDetail.airpod.time_work}</span>
									</li>
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('searchResult.weight')}{' '}
										</span>
										<span>{extraProductDetail.airpod.weight}</span>
									</li>
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('extraInfoAbout.noise')}{' '}
										</span>
										<span>{extraProductDetail.airpod.anti_shum}</span>
									</li>
									<li className='phone_details'>
										<span style={{ width: '50%' }}>
											{t('extraInfoAbout.plusInfo')}
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
							{commentData['user info'] !== undefined &&
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
