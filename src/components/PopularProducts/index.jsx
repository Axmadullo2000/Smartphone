import React, { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'

import { fetchPopularCardsAsyncThunk } from '../../redux/asyncThunks'

import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'
import { CardItem } from '../CardItem'

const PopularProducts = () => {
	const swiperRef = useRef()
	const { popularData } = useSelector(data => data.data)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPopularCardsAsyncThunk())
	}, [])

	return (
		<div>
			<h2 className='text-3xl text-center my-3 text-blue-900'>
				Популярные товары{' '}
			</h2>
			<div className='flex justify-center mt-8 relative'>
				<button
					onClick={() => swiperRef.current.slidePrev()}
					className='z-50 absolute'
					style={{
						width: '55px',
						top: '50%',
						transform: 'translateY(-50%)',
						left: '1.5%',
					}}
				>
					<img src={prev} alt='' />
				</button>
				<Swiper
					slidesPerView={5}
					onSwiper={swiper => {
						swiperRef.current = swiper
					}}
				>
					{popularData.results != undefined &&
						popularData.results.map(slide => (
							<SwiperSlide>
								<CardItem {...slide} />
							</SwiperSlide>
						))}
				</Swiper>
				<button
					onClick={() => swiperRef.current.slideNext()}
					className='z-50 absolute'
					style={{
						width: '55px',
						top: '50%',
						transform: 'translateY(-50%)',
						right: '2.5%',
					}}
				>
					<img src={next} alt='' />
				</button>
			</div>
		</div>
	)
}

export default PopularProducts
