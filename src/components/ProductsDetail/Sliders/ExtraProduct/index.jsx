import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CardItem } from '../../Layouts/CardItem'
import { SimilarProducts } from '../SimilarProducts'

import next from '../../../assets/next.svg'
import prev from '../../../assets/prev.svg'

import './ExtraProduct.scss'

export const ExtraProduct = ({ similarData }) => {
	const swiperRef = useRef()
	const { t } = useTranslation()

	return (
		<div className='extraProductContainer'>
			{!!similarData.also_buy && similarData.also_buy.length > 0 && (
				<>
					<h2 className='extraProductTitle'>{t('extraProduct.title')}</h2>

					{!!similarData.also_buy && similarData.also_buy.length > 0 && (
						<div className='flex justify-center mt-8 relative'>
							<button
								onClick={() => swiperRef.current.slidePrev()}
								className='prevBtn z-50 absolute'
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
									400: {
										slidesPerView: 1,
										spaceBetweenSlides: 300
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
								{similarData.also_buy !== undefined &&
									similarData.also_buy.map(slide => (
										<SwiperSlide key={slide.id}>
											<CardItem {...slide} />
										</SwiperSlide>
									))}
							</Swiper>

							<button
								onClick={() => swiperRef.current.slideNext()}
								className='z-50 absolute prevBtn'
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
					)}

					<SimilarProducts similarData={similarData} />
				</>
			)}
		</div>
	)
}
