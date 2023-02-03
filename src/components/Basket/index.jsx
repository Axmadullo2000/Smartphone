import React, { useRef, useEffect } from 'react'

const Basket = ({ basketModalOpen, setBasketModalOpen }) => {
	const ref = useRef()
	const checkIfClickedOutside = e => {
		if (basketModalOpen && ref.current && !ref.current.contains(e.target)) {
			setBasketModalOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', checkIfClickedOutside)
	}, [basketModalOpen])

	return (
		<>
			{basketModalOpen && (
				<div
					className='bg-slate-100 p-10 fixed right-0 h-full'
					style={{ height: '100vh', width: '700px', zIndex: 999 }}
					ref={ref}
				>
					<button onClick={() => setBasketModalOpen(old => !old)}>
						<svg
							className='absolute right-2 top-4'
							width='40px'
							height='38px'
							viewBox='0 0 24 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								fill-rule='evenodd'
								clip-rule='evenodd'
								d='M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z'
								fill='rgb(88, 88, 88)'
							/>
						</svg>
					</button>
					<h2 className='text-red-800'>Ваша корзина пуста</h2>
				</div>
			)}
		</>
	)
}

export default Basket