import React, { useEffect, useRef } from 'react'

import close from '../../assets/close.svg'

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
					<button
						onClick={() => setBasketModalOpen(old => !old)}
						style={{ position: 'absolute', right: '20px', top: '20px' }}
					>
						<img src={close} />
					</button>
					<h2
						style={{
							color: '#223869',
							fontSize: '24px',
							lineHeight: '30px',
							fontWeight: 'bold',
							fontStyle: 'normal'
						}}
					>
						Ваша корзина пуста
					</h2>
				</div>
			)}
		</>
	)
}

export default Basket
