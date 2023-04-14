import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { getDetailProduct, getExtraProducts } from '../../../redux/asyncThunks'

import { ExtraProduct } from '../ExtraProduct'
import { ExtraInfoAbout } from '../Information/ExtraInfoAbout'
import { ShowLittleInfo } from '../Information/ShowLittleInfo'

import up from '../../../assets/up.svg'

import './CardDetail.scss'

const CardDetail = ({ slug }) => {
	const [showFullDescription, setShowFullDescription] = useState({
		description: true,
		characteristic: false,
		feedback: false
	})

	const { t } = useTranslation()

	const { detailData, extraProductDetail } = useSelector(state => state.data)

	const dispatch = useDispatch()

	if (!!detailData.phone) {
		document.title = `Купить smartphone ${detailData.phone.name}`
	}

	useEffect(() => {
		dispatch(getDetailProduct(slug))
		dispatch(getExtraProducts(slug))
	}, [dispatch, slug])

	return (
		<div className='detailContainer'>
			<ul className='flex mt-4 justify-start items-center'>
				<li className='directionFromProducts mx-2'>
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				{!!detailData.phone && detailData.phone.types === 'smartphone' && (
					<li className='directionFromProducts mx-2'>
						<Link to='/products/category/all/'>{t('header.catalogAll')}</Link>
					</li>
				)}
				<li
					className='directionFromProducts mx-2'
					style={{ background: '#223869' }}
				>
					{!!detailData.phone && detailData.phone.name}
					{!!extraProductDetail.airpod && extraProductDetail.airpod.name}
				</li>
			</ul>
			<ShowLittleInfo setShowFullDescription={setShowFullDescription} />
			<ExtraInfoAbout
				showFullDescription={showFullDescription}
				setShowFullDescription={setShowFullDescription}
			/>
			<div>
				<button
					className='gotoUp'
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
			{!!detailData.phone && detailData.phone.types === 'smartphone' && (
				<ExtraProduct similarData={detailData} />
			)}
			{!!extraProductDetail.airpod &&
				extraProductDetail.airpod.types === 'extra' && (
					<ExtraProduct similarData={extraProductDetail} />
				)}
		</div>
	)
}

export default CardDetail
