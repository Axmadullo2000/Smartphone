import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { SearchAsyncThunk } from '../../redux/asyncThunks'

import Footer from '../Footer'
import Header from '../Header'
import Loader from '../Loader'

import './SearchResult.scss'

export const SearchResult = () => {
	const {t} = useTranslation()
	const { data, status } = useSelector(data => data.data)
	const dispatch = useDispatch()
	let { slug } = useParams()
	const navigate = useNavigate()
	const arr = []

	slug = slug?.trim()

	const Count = () => {
		for (let i = 1; i < data.count; i++) {
			arr.push(i)
		}
	}
	Count()

	const count = 0

	useEffect(() => {
		dispatch(SearchAsyncThunk({ search: slug, offset: count }))
		Count()
	}, [slug])

	return (
		<div>
			<Header />
			<h2 className='text-center text-2xl text-stone-50 mb-5'>{t("searchResult.title")}</h2>
			<div className='' style={{ width: '600px', margin: 'auto' }}>
				{!!data.results &&
					data.results.map(item => (
						<div
							style={{ cursor: 'pointer' }}
							onClick={() => navigate(`/products/view/${item.slug}`)}
							key={item.id}
							className='cardElement flex'
						>
							{status == '' ? (
								<Loader />
							) : (
								<img src={item.photo1} alt='' width={300} />
							)}
							<ul className='ml-4 mt-4'>
								<li>{t("searchResult.type")} {item.name.slice(0, 8)}</li>
								<li>{t("searchResult.version")} {item.Version_OS}</li>
								<li>{t("searchResult.corpus")} {item.corpus}</li>
								<li>{t("searchResult.typeSimCard")} {item.sim_card}</li>
								<li>{t("searchResult.size")} {item.size}</li>
								<li>{t("searchResult.weight")} {item.weight}</li>
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
			<Footer />
		</div>
	)
}
