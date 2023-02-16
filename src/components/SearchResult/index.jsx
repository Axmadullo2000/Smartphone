import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import {
	SearchAsyncThunk
} from '../../redux/asyncThunks'
import Header from '../Header'
import Loader from '../Loader'

export const SearchResult = () => {
	const { data, status } = useSelector(data => data.data)
	const dispatch = useDispatch()
	let { slug } = useParams()
	const arr = []

	slug = slug?.trim()

	console.log(data)

	const Count = () => {
		for (let i = 1; i < data.count; i++) {
			arr.push(i)
		}
		console.log(arr)
	}
	Count()


	const count = 0

	useEffect(() => {
		dispatch(SearchAsyncThunk({ search: slug, offset: count }))
	}, [slug])
	return (
		<div>
			<Header />
			<h2 className='text-center text-2xl text-stone-50 mb-5'>SearchResult</h2>
			<div className='' style={{ width: '600px', margin: 'auto' }}>
				{!!data.results &&
					data.results.map(item => (
						<div key={item.id} className='flex m-auto my-2 border'>
							{status == '' ? (
								<Loader />
							) : (
								<img src={item.photo1} alt='' width={300} />
							)}
							<ul className='ml-4 mt-4'>
								<li>Тип {item.name.slice(0, 8)}</li>
								<li>Версия ОС {item.Version_OS}</li>
								<li>Корпус {item.corpus}</li>
								<li>Тип Sim-карты {item.sim_card}</li>
								<li>Размеры {item.size}</li>
								<li>Вес {item.weight}</li>
							</ul>
						</div>
					))}
				{arr.map(item => (
					<button
						onClick={() =>
							dispatch(SearchAsyncThunk({ search: slug, offset: item }))
						}
						key={item}
						className='p-2 border bg-slate-350 w-50 m-2 hover:text-slate-300'
					>
						{item}
					</button>
				))}
				<br />
			</div>
		</div>
	)
}
