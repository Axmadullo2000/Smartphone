import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { fetchNewProductCardsAsyncThunk } from '../../redux/asyncThunks'
import { CardItem } from '../CardItem'

import next from '../../assets/next.svg'
import prev from '../../assets/prev.svg'

export default function NewProducts() {
	const newRef = useRef()
	const { newData } = useSelector(data => data.data)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchNewProductCardsAsyncThunk())
	}, [dispatch])

	return (
		<div style={{ marginTop: '100px', marginBottom: '60px' }}>
			<h2 className='text-3xl text-center my-3 text-blue-900'>Новые товары </h2>
			<div className='flex justify-center mt-8 relative'>
				<button
					onClick={() => newRef.current.slidePrev()}
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
					modules={[Autoplay, Pagination, Navigation]}
					autoplay={{
						delay: 4000,
						disableOnInteraction: false
					}}
					onSwiper={swiper => {
						newRef.current = swiper
					}}
				>
					{!!newData.results &&
						newData.results.map(slide => (
							<SwiperSlide key={slide.id}>
								<CardItem {...slide} />
							</SwiperSlide>
						))}
				</Swiper>
				<button
					onClick={() => newRef.current.slideNext()}
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