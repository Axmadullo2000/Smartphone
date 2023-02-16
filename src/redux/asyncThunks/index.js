import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

export const SearchAsyncThunk = createAsyncThunk(
	`search/addNewMessageThunk`,
	async (
		{ search, offset },
		{ dispatch, rejectWithValue }
	) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		return response.data
		//здесь будут доступны data, id, dispatch, rejectWithValue
	}
)

export const prevBtnAsyncThunk = createAsyncThunk(
	'prev/prevBtnAsyncThunk',
	async ({ search, offset }) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		const prevDataResponse = await axios.get(response.data.previous)
		return prevDataResponse.data
	}
)

export const nextBtnAsyncThunk = createAsyncThunk(
	'next/nextBtnAsyncThunk',
	async ({ search, offset }) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		const nextDataResponse = await axios.get(response.data.next)
		return nextDataResponse.data
	}
)

export const fetchNewProductCardsAsyncThunk = createAsyncThunk(
	'fetch/fetchNewProductCardsAsyncThunk',
	async () => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?limit=20&offset=40`
		)

		return response.data
	}
)

export const fetchPopularCardsAsyncThunk = createAsyncThunk(
	'fetch/fetchPopularCardsAsyncThunk',
	async () => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?limit=18&offset=5`
		)

		return response.data
	}
)

export const getAllData = createAsyncThunk('data/getAllData', async () => {
	const response = await axios.get(
		'http://127.0.0.1:8000/api/phones/func/?limit=68&offset=0'
	)
	return response.data
})


export const filterByFewParams = createAsyncThunk(
	'filter/filterByFewParams',
	async ({brand, corpus, yadra, front_kamera, giga_vstoeno, giga_operate, accumulator, limit, offset}) => {
		console.log(brand, corpus, yadra, front_kamera, giga_operate, giga_vstoeno, accumulator);

			const response = await axios.get(`
			http://127.0.0.1:8000/api/phones/func/?
			${brand != undefined ? `brand=${brand}` : null}
			${corpus != undefined ? `&corpus=${corpus}` : null}
			${yadra != undefined ? `&yadra=${yadra}` : null}
			${front_kamera != undefined ? `&front_kamera=${front_kamera}` : ''}
			&giga_vstoeno=${giga_vstoeno}
			${giga_operate != undefined ? `&giga_operate=${giga_operate}` : ''}
			${accumulator != undefined ? `&accumulator=${accumulator}` : ''}&limit=${limit}&offset=${offset}
			`)		
			return response.data
		}
	)

