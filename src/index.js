import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import 'react-toastify/dist/ReactToastify.css'

import App from './App'

import { store } from './redux/store'

import { ToastContainer } from 'react-toastify'
import './index.css'

const rootApp = document.getElementById('root')

if (!!rootApp) {
	const root = ReactDOM.createRoot(rootApp)
	root.render(
		<Provider store={store}>
			<Router>
				<App />
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
				></ToastContainer>
			</Router>
		</Provider>
	)
}
