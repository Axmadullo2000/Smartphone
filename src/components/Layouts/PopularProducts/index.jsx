import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { fetchPopularCardsAsyncThunk } from '../../../redux/asyncThunks'
import { CardItem } from '../CardItem'

import next from '../../../assets/next.svg'
import prev from '../../../assets/prev.svg'

import './PopularProducts.scss'

const PopularProducts = () => {
	const { t } = useTranslation()
	const swiperRef = useRef()
	const { allData, popularData } = useSelector(data => data.data)
	const dispatch = useDispatch()

	useEffect(() => {
		if (allData.results !== 'undefined' && allData.results !== null) {
			dispatch(fetchPopularCardsAsyncThunk(allData.results?.length))
		}
		// eslint-disable-next-line
	}, [dispatch])

	// SwiperCore.use([Autoplay])

	return (
		<div style={{ marginTop: '100px', marginBottom: '60px' }}>
			<h2 className='text-3xl text-center my-3 text-blue-900'>
				{t('popularProduct.title')}
			</h2>
			<div className='flex justify-center mt-8 relative'>
				<button
					onClick={() => swiperRef.current.slidePrev()}
					className='z-50 absolute'
					style={{
						width: '55px',
						top: '50%',
						transform: 'translateY(-50%)',
						left: '1%'
					}}
				>
					<img src={prev} alt='' />
				</button>
				<Swiper
					breakpoints={{
						330: {
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						400: {
							width: 400,
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						530: {
							width: 300,
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						768: {
							slidesPerView: 2,
							spaceBetweenSlides: 10
						},
						800: {
							slidesPerView: 3,
							spaceBetweenSlides: 50
						},
						1000: {
							slidesPerView: 4,
							spaceBetweenSlides: 150
						}
					}}
					slidesPerView={5}
					loop={true}
					speed={500}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false
					}}
					modules={[Autoplay, Pagination, Navigation]}
					onSwiper={swiper => {
						swiperRef.current = swiper
					}}
				>
					{popularData.results !== undefined &&
						// eslint-disable-next-line array-callback-return
						popularData.results.map(slide => {
							if (Number(slide.rating) > 3) {
								return (
									<SwiperSlide key={slide.id}>
										<CardItem {...slide} />
									</SwiperSlide>
								)
							}
						})}
				</Swiper>
				<button
					onClick={() => swiperRef.current.slideNext()}
					className='z-50 absolute'
					style={{
						width: '55px',
						top: '50%',
						transform: 'translateY(-50%)',
						right: '3%'
					}}
				>
					<img src={next} alt='' />
				</button>
			</div>
		</div>
	)
}

export default PopularProducts
