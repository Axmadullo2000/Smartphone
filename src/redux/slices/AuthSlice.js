import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { removeItem } from '../../Service/localData'

const initialState = {
	loggednIn: false,
	userData: [],
	error: []
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
			toast.success('You Successfully Logged In', {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark'
			})
		},
		logoutAction(state) {
			state.loggednIn = false
			state.userData = []
			removeItem('token')
			toast.success('You Successfully Logged Out', {
				position: 'top-right',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark'
			})
		},
		errorAction(state, action) {
			state.error = action.payload
		}
	}
})

export default AuthSlice.reducer

export const { registerAction, loginAction, logoutAction, errorAction } =
	AuthSlice.actions
