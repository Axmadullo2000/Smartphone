import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import prev from '../../assets/prev.svg'
import next from '../../assets/next.svg'

import './Carousel.scss'
import { CardItem } from '../CardItem'

export const Carousel = () => {
	const arr = [
		1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
		22, 23, 24, 25,
	]
	const swiperRef = useRef()
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
					{arr.map(slide => (
						<SwiperSlide>
							<CardItem />
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
