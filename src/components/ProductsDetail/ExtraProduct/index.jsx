import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import { CardItem } from '../../Layouts/CardItem'
import { SimilarProducts } from '../Sliders/SimilarProducts'

import next from '../../../assets/next.svg'
import prev from '../../../assets/prev.svg'

export const ExtraProduct = ({ similarData }) => {
	const swiperRef = useRef()
	const { t } = useTranslation()

	return (
		<div>
			{!!similarData.also_buy && similarData.also_buy.length > 0 && (
				<>
					<h2
						style={{
							color: '#223869',
							fontWeight: '600',
							fontSize: '24px',
							lineHeight: '25px',
							fontStyle: 'normal',
							textAlign: 'center',
							margin: '30px 0'
						}}
					>
						{t('extraProduct.title')}
					</h2>

					{!!similarData.also_buy && similarData.also_buy.length > 0 && (
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
					)}

					<SimilarProducts similarData={similarData} />
				</>
			)}
		</div>
	)
}
