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
					<Link to='/'>{t('cardDetail.main')}</Link>
				</li>
				{!!detailData.phone && detailData.phone.types === 'smartphone' && (
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
						<Link to='/products/category/all/'>{t('header.catalogAll')}</Link>
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
			<ShowLittleInfo setShowFullDescription={setShowFullDescription} />
			<ExtraInfoAbout
				showFullDescription={showFullDescription}
				setShowFullDescription={setShowFullDescription}
			/>
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
