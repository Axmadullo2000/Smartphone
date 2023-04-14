import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { AuthService } from '../../../Service'
import Loader from '../../Layouts/Loader'

import './Registration.scss'

export const ValidateRegistration = () => {
	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit' // "onSubmit"
	})

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState('')
	const [success, setSuccess] = useState(true)

	const { t } = useTranslation()

	const registerInfoData = {
		username: username,
		email: email
	}

	const registerUser = async () => {
		await AuthService.register(registerInfoData)
		try {
			setResult(`${t('validateRegistration.passwordSent')}`)
		} catch (e) {}
	}

	const onSubmit = () => {
		setTimeout(() => {
			setLoading(false)
		}, 7000)

		setTimeout(() => {
			if (username.length > 5 && email.length > 10) {
				setSuccess(true)
				registerUser()
			} else {
				setSuccess(false)
			}
		}, 3000)
		setLoading(true)
	}

	return (
		<div>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div className='mx-auto'>
						<div className='w-80 mx-auto'>
							<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
								<span className='text-red-700 hover:text-red-900'>Smart</span>{' '}
								<span className='text-blue-700 hover:text-blue-900'>Shop</span>
							</p>
						</div>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							{t('validateRegistration.registerAccount')}
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
									id='username'
									{...register('username', {
										required: true,
										minLength: 5,
										maxLength: 60
									})}
									value={username}
									onChange={e => setUsername(e.target.value)}
									name='username'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder={t('validateRegistration.userNamePl')}
								/>
								{errors.username && (
									<p className='errorMessage'>
										{t('validateRegistration.userNameReq')}
									</p>
								)}
							</div>
							<div style={{ marginTop: '25px' }}>
								<label htmlFor='email-address' className='sr-only'>
									{t('validateRegistration.email')}
								</label>
								<input
									id='email-address'
									{...register('email', {
										required: true,
										minLength: 10,
										maxLength: 50
									})}
									value={email}
									onChange={e => setEmail(e.target.value)}
									name='email'
									type='email'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder={t('validateRegistration.email')}
								/>
								{errors.email && (
									<span className='errorMessage'>
										{t('validateRegistration.emailNameReq')}
									</span>
								)}
							</div>
						</div>

						<div className=''>
							<div className='flex items-center justify-between'>
								<div className='text-sm'>
									<Link
										to='/sign-in'
										className='text-xl font-medium text-indigo-600 hover:text-indigo-500'
									>
										{t('forgotPAssword.haveAccount')}
									</Link>
								</div>
							</div>
							{loading && <Loader />}
							{!success && (
								<div>
									<p className='mt-2 text-red-500'>
										{t('validateRegistration.incorrectwrite')}
									</p>
								</div>
							)}
							{result !== '' && (
								<div>
									<div className='d-none'>
										{toast.success(t('validateRegistration.passwordSent'), {
											position: 'top-right',
											autoClose: 5000,
											hideProgressBar: false,
											closeOnClick: true,
											pauseOnHover: true,
											draggable: true,
											theme: 'dark'
										})}
									</div>
									<p className='text-green-600 mt-3'>
										{t('validateRegistration.passwordSent')}
									</p>
								</div>
							)}
						</div>

						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								{t('validateRegistration.register')}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
