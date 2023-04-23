import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

import Footer from '../../../components/Layouts/Footer'
import Header from '../../../components/Layouts/Header'

import { loginAction } from '../../../redux/slices/AuthSlice'
import { AuthService } from '../../../Service'

import './Login.scss'

const Login = () => {
	const [userName, setUsername] = useState('')
	const [password, setPassword] = useState('')
	let [error, setError] = useState('')

	const loggedInData = { username: userName, password: password }
	const { loggednIn } = useSelector(state => state.auth)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const { t } = useTranslation()

	const formSchema = Yup.object().shape({
		username: Yup.string()
			.required(`${t('login.usernameRequired')}`)
			.min(5, t('login.usernameMinLength'))
			.max(32, t('login.usernameMaxLength')),
		password: Yup.string()
			.required('login.passwordRequired')
			.min(8, `${t('login.passwordMinLength')}`)
			.max(32, `${t('login.passwordMaxLength')}`)
	})

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit',
		resolver: yupResolver(formSchema)
	})

	const loginUser = async () => {
		try {
			const response = await AuthService.login(loggedInData)
			dispatch(loginAction(response.user_info))
			localStorage.setItem('token', response.token)
			navigate('/')
		} catch (e) {
			setError(e.response.data)
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
							<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
								{t('login.loginAccount')}
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<input type='hidden' name='remember' defaultValue='true' />
							<p className='logo mx-auto text-center'>
								<span className='text-red-700'>Smart</span>{' '}
								<span className='text-blue-700'>Shop</span>
							</p>
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label htmlFor='username' className='sr-only'>
										{t('')}
									</label>
									<input
										value={userName}
										id='username'
										{...register('username')}
										name='username'
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('login.username')}
										onChange={e => setUsername(e.target.value)}
									/>
									{errors.username && (
										<p className='errorMessage'>{errors?.username?.message}</p>
									)}
								</div>
								<div className='my-5' style={{ marginTop: '15px' }}>
									<label htmlFor='password' className='sr-only'>
										{t('')}
									</label>
									<input
										value={password}
										id='password'
										{...register('password')}
										name='password'
										type='password'
										autoComplete='current-password'
										required
										className='mb-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('login.password')}
										onChange={e => setPassword(e.target.value)}
									/>
								</div>
							</div>

							<span>
								{errors?.password && (
									<span className='text-red-500 errorMessage'>
										{errors.password?.message}
									</span>
								)}
							</span>

							<div className='flex flex-wrap redirect_bts'>
								<div className='flex items-center justify-between register'>
									<div className='text-sm'>
										<Link
											to='/sign-up'
											className='signUp redirectToAnother text-xl font-medium'
										>
											{t('login.signup')}
										</Link>
									</div>
								</div>

								<div className='flex items-center justify-between forgot_password'>
									<div className='text-sm'>
										<Link
											to='/accounts/reset-password'
											className='redirectToAnother text-xl font-medium'
										>
											{t('login.forgotPassword')}
										</Link>
									</div>
								</div>
							</div>

							<div>
								<p className='text-red-900'></p>
							</div>

							<span className='text-red-500 mt-2'>
								{Object.keys(error).length > 0 && <>{t('login.error')}</>}
							</span>

							<div>
								<button type='submit' className='signButton'>
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
