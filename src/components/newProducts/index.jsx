import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { fetchNewProductCardsAsyncThunk } from '../../redux/asyncThunks'
import { CardItem } from '../CardItem'

import next from '../../assets/next.svg'
import prev from '../../assets/prev.svg'
import { addToBasketItem } from '../../redux/slices/AddToBasketSlice'

const NewProducts = () => {
	const swiperRef = useRef()
	const { data } = useSelector(data => data.data)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchNewProductCardsAsyncThunk())
	}, [])
	SwiperCore.use([Autoplay])

	return (
		<div className='mt-10 mb-20'>
			<h2 className='text-3xl text-center my-3 text-blue-900'>
				Новое поступление
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
					slidesPerView={5}
					loop={true}
					speed={500}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false
					}}
					modules={[Autoplay]}
					onSwiper={swiper => {
						swiperRef.current = swiper
					}}
				>
					{data.results != undefined &&
						data.results.map(slide => (
							<SwiperSlide key={slide.id}>
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
						right: '3%'
					}}
				>
					<img src={next} alt='' />
				</button>
			</div>
		</div>
	)
}

export default NewProducts
