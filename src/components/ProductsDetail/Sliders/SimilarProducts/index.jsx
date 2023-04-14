import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CardItem } from '../../../Layouts/CardItem'

import next from '../../../../assets/next.svg'
import prev from '../../../../assets/prev.svg'

import './SimilarProducts.scss'

export const SimilarProducts = ({ similarData }) => {
	const swiperRef = useRef()
	const { t } = useTranslation()
	return (
		<>
			<h2 className='similarProductTitle'>{t('similarProducts.title')}</h2>

			<div className='flex justify-center mt-8 relative'>
				<button
					onClick={() => swiperRef.current.slidePrev()}
					className='goToPrev z-50 absolute'
				>
					<img src={prev} alt='' />
				</button>

				<Swiper
					breakpoints={{
						330: {
							width: 300,
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						400: {
							width: 300,
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						530: {
							width: 530,
							slidesPerView: 1,
							spaceBetweenSlides: 10
						},
						600: {
							width: 300,
							slidesPerView: 2,
							spaceBetweenSlides: 10
						},

						768: {
							width: 600,
							slidesPerView: 2,
							spaceBetweenSlides: 10
						},
						800: {
							slidesPerView: 3,
							spaceBetweenSlides: 50
						},
						1000: {
							slidesPerView: 4,
							spaceBetweenSlides: 10
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
					{similarData.similar !== undefined &&
						similarData.similar.map(slide => (
							<SwiperSlide key={slide.id}>
								<CardItem {...slide} star={4} />
							</SwiperSlide>
						))}
				</Swiper>

				<button
					onClick={() => swiperRef.current.slideNext()}
					className='goToNext z-50 absolute'
				>
					<img src={next} alt='' />
				</button>
			</div>
		</>
	)
}
