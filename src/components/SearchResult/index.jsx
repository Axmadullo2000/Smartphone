import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { SearchAsyncThunk } from '../../redux/asyncThunks'

import Footer from '../Layouts/Footer'
import Header from '../Layouts/Header'
import Loader from '../Layouts/Loader'

import './SearchResult.scss'

export const SearchResult = () => {
	const navigate = useNavigate()

	const { data, status } = useSelector(data => data.data)
	const dispatch = useDispatch()

	let { slug } = useParams()

	const { t } = useTranslation()

	const arr = []

	slug = slug?.trim()

	const Count = () => {
		if (!!data.results) {
			for (let i = 1; i < data.results.length; i++) {
				arr.push(i)
			}
		}
	}

	Count()

	const count = 0

	useEffect(() => {
		dispatch(SearchAsyncThunk({ search: slug, offset: count }))
		// eslint-disable-next-line
	}, [slug])

	return (
		<div className='searchContent'>
			<Header />
			<h2 className='text-center text-2xl mt-5 mb-5'>
				{t('searchResult.title')}
			</h2>
			<div className='search_result'>
				{!!data.results &&
					data.results.map(item => (
						<div
							onClick={() => navigate(`/products/view/${item.slug}`)}
							key={item.id}
							className='cardElement flex cursor-pointer'
						>
							{status === '' ? (
								<Loader />
							) : (
								<img
									className='search_result_image'
									src={item.photo1}
									alt={item.name}
									width={300}
								/>
							)}
							<ul className='search_result_info ml-4 mt-4'>
								<li>
									{t('searchResult.type')} {item.name.slice(0, 8)}
								</li>
								<li>
									{t('searchResult.version')} {item.Version_OS}
								</li>
								<li>
									{t('searchResult.corpus')} {item.corpus}
								</li>
								<li>
									{t('searchResult.typeSimCard')} {item.sim_card}
								</li>
								<li>
									{t('searchResult.size')} {item.size}
								</li>
								<li>
									{t('searchResult.weight')} {item.weight}
								</li>
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

				{!!data.results && data.results.length === 0 && (
					<div className='notFound_products'>
						<h2
							style={{
								color: 'red',
								fontSize: '32px',
								fontWeight: 'bold'
							}}
						>
							{t('searchResult.NotFoundTitle')}
						</h2>
						<p className='mt-4'></p>
						<Link to='/products/category/all' className='allProoduct'>
							{t('searchResult.ListSmartphones')}
						</Link>{' '}
					</div>
				)}
			</div>
			<Footer />
		</div>
	)
}
