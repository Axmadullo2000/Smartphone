import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	status: null,
}

const ExampleSlice = createSlice({
	name: 'slice/ExampleSlice',
	initialState,
	reducers: {},
})

export default ExampleSlice.reducer
