import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export const NotFound = () => {
	const navigate = useNavigate()

	return (
		<>
			<Header />
			<div
				style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}
			>
				<div
					style={{
						height: '600px',
						background: '#eee',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
						maxWidth: '380px'
					}}
				>
					<h2 style={{ fontSize: '45px', fontWeight: '600' }}>Понимаешь...</h2>
					<p
						style={{
							fontSize: '18px',
							fontWeight: 'bold',
							marginTop: '40px',
							textAlign: 'center'
						}}
					>
						...на моём сайте нет такой страницы. Просто возвращайся на главную!
					</p>
					<button
						onClick={() => navigate('/')}
						style={{
							padding: '12px 14px',
							width: '300px',
							background: 'rgb(217, 46, 21)',
							marginTop: '50px',
							borderRadius: '12px',
							color: 'rgb(34, 34, 34)',
							textTransform: 'uppercase',
							fontSize: '22px',
							fontWeight: 'bold'
						}}
					>
						На Главную
					</button>
				</div>
				<div style={{ maxWidth: '380px', width: '100%' }}>
					<img
						style={{ width: 'auto', height: '100%' }}
						src={
							'https://avatars.mds.yandex.net/i?id=bf02bb89f933703948897cd96b3b35f6-5231013-images-thumbs&n=13'
						}
					/>
				</div>
			</div>
			<Footer />
		</>
	)
}
