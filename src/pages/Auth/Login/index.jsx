import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'

import { loginAction } from '../../../redux/slices/AuthSlice'
import { AuthService } from '../../../Service'

const Login = () => {
	const [userName, setUsername] = useState('')
	const [password, setPassword] = useState('')
	let [error, setError] = useState('')

	const loggedInData = { username: userName, password: password }
	const { loggednIn } = useSelector(state => state.auth)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { t } = useTranslation()

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit' // "onChange"
	})

	const loginUser = async () => {
		try {
			const response = await AuthService.login(loggedInData)
			dispatch(loginAction(response.user_info))
			localStorage.setItem('token', response.token)
			navigate('/')
		} catch (e) {
			setError('error')
		}
	}

	const onSubmit = () => {
		loginUser()
	}

	useEffect(() => {
		if (loggednIn) {
			navigate('/')
		}
	})

	return (
		<div>
			<Header />
			<div>
				<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
					<div className='w-full max-w-md space-y-8'>
						<div className='mx-auto'>
							<div className='w-80 mx-auto'>
								<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
									<span className='text-red-700 hover:text-red-900'>Smart</span>{' '}
									<span className='text-blue-700 hover:text-blue-900'>
										Shop
									</span>
								</p>
							</div>
							<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
								{t('login.loginAccount')}
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label htmlFor='username' className='sr-only'>
										{t('validateRegistration.userName')}
									</label>
									<input
										value={userName}
										id='username'
										{...register('username', {
											required: true,
											minLength: 3,
											maxLength: 60
										})}
										name='username'
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('validateRegistration.userNamePl')}
										onChange={e => setUsername(e.target.value)}
									/>
									{errors.username && (
										<p className='errorMessage'>
											{t('validateRegistration.userNameReq')}
										</p>
									)}
								</div>
								<div className='my-5' style={{ marginTop: '15px' }}>
									<label htmlFor='password' className='sr-only'>
										{t('forgotPAssword.password')}
									</label>
									<input
										value={password}
										id='password'
										{...register('password', {
											required: true,
											minLength: 3,
											maxLength: 40
										})}
										name='password'
										type='password'
										autoComplete='current-password'
										required
										className='mb-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('forgotPAssword.password')}
										onChange={e => setPassword(e.target.value)}
									/>
									{errors.password && (
										<span className='errorMessage'>
											{t('forgotPAssword.passwordReq')}
										</span>
									)}
								</div>
							</div>
							{error === 'error' && (
								<div style={{ display: 'none' }}>
									{toast.error(t('login.problemLogin'), {
										position: 'top-right',
										autoClose: 5000,
										hideProgressBar: false,
										closeOnClick: true,
										pauseOnHover: true,
										draggable: true,
										theme: 'dark'
									})}{' '}
								</div>
							)}

							<div className='flex'>
								<div className='flex items-center justify-between'>
									<div className='text-sm'>
										<Link
											to='/sign-up'
											className='text-xl font-medium text-indigo-600 hover:text-indigo-500'
										>
											{t('login.signup')}
										</Link>
									</div>
								</div>

								<div className='ml-2 flex items-center justify-between'>
									<div className='text-sm'>
										<Link
											to='/accounts/reset-password'
											className='text-xl font-medium text-green-600 hover:text-indigo-500'
										>
											{t('login.forgotPassword')}
										</Link>
									</div>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									{t('login.signin')}
								</button>
							</div>
						</form>{' '}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Login
