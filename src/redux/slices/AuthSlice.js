import { createSlice } from '@reduxjs/toolkit'

import { removeItem } from '../../Service/localData'

const initialState = {
	loggednIn: false,
	userData: [],
	googleData: []
}

const AuthSlice = createSlice({
	name: 'auth/AuthSlice',
	initialState,
	reducers: {
		registerAction(state, action) {
			state.loggednIn = true
			state.userData = action.payload
		},
		loginAction(state, action) {
			state.loggednIn = true
			state.userData = action.payload
		},
		logoutAction(state, action) {
			state.loggednIn = false
			state.userData = []
			removeItem('token')
		}
	}
})

export default AuthSlice.reducer

export const { registerAction, loginAction, logoutAction } = AuthSlice.actions
