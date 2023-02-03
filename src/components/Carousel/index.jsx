import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useSelector, useDispatch } from 'react-redux'

import { fetchCardsAsyncThunk } from '../../redux/asyncThunks'

import { CardItem } from '../CardItem'

import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'

import './Carousel.scss'

export const Carousel = () => {
	const { data } = useSelector(data => data.data)
	const dispatch = useDispatch()
	const swiperRef = useRef()

	console.log(data.results)

	useEffect(() => {
		dispatch(fetchCardsAsyncThunk())
	}, [])
	return (
		<>
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
					{!!data.results &&
						data.results.map(slide => (
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
		</>
	)
}
