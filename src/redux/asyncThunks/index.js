import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

interface SearchAsyncThunkPayload {
	search: string;
	offset: number;
}

export const SearchAsyncThunk = createAsyncThunk(
	`search/addNewMessageThunk`,
	async (
		{ search, offset }: SearchAsyncThunkPayload,
		{ dispatch, rejectWithValue }
	) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		console.log(response.data.next)
		return response.data
		//здесь будут доступны data, id, dispatch, rejectWithValue
	}
)

export const prevBtnAsyncThunk = createAsyncThunk(
	'prev/prevBtnAsyncThunk',
	async ({ search, offset }: SearchAsyncThunkPayload) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		const prevDataResponse = await axios.get(response.data.previous)
		console.log(prevDataResponse)
		return prevDataResponse.data
	}
)

export const nextBtnAsyncThunk = createAsyncThunk(
	'next/nextBtnAsyncThunk',
	async ({ search, offset }: SearchAsyncThunkPayload) => {
		const response = await axios.get(
			`http://127.0.0.1:8000/api/phones/func/?search=${search}&limit=5&offset=${offset}`
		)
		const nextDataResponse = await axios.get(response.data.next)
		console.log(nextDataResponse)
		return nextDataResponse.data
	}
)
