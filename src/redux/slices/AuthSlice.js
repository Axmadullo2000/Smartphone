import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'

import { removeItem } from '../../Service/localData'

const initialState = {
	loggednIn: false,
	userData: []
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
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark'
			})
		},
		logoutAction(state, action) {
			state.loggednIn = false
			state.userData = []
			removeItem('token')
			toast.success('You Successfully LogOut', {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: 'dark'
			})
		}
	}
})

export default AuthSlice.reducer

export const { registerAction, loginAction, logoutAction } = AuthSlice.actions
