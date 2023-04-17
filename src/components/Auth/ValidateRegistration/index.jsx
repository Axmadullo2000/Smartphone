import { yupResolver } from '@hookform/resolvers/yup'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { errorAction } from '../../../redux/slices/AuthSlice'
import { AuthService } from '../../../Service'

import Loader from '../../Layouts/Loader'

import './Registration.scss'

export const ValidateRegistration = () => {
	const { t } = useTranslation()
	const formSchema = Yup.object().shape({
		username: Yup.string()
			.required(`${t('validateRegistration.usernameRequired')}`)
			.min(5, t('validateRegistration.usernameMinLength'))
			.max(32, t('validateRegistration.usernameMaxLength')),
		email: Yup.string()
			.required('validateRegistration.emailRequired')
			.min(8, `${t('validateRegistration.emailMinLength')}`)
			.max(32, `${t('validateRegistration.emailMaxLength')}`)
	})

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit',
		resolver: yupResolver(formSchema)
	})

	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [loading, setLoading] = useState(false)
	const [result, setResult] = useState('')
	const [success, setSuccess] = useState(true)
	const dispatch = useDispatch()
	const { error } = useSelector(state => state.auth)

	const registerInfoData = {
		username: username,
		email: email
	}

	const registerUserAccount = async () => {
		try {
			await AuthService.register(registerInfoData)
			setResult(`${t('validateRegistration.passwordSent')}`)
		} catch (error) {
			dispatch(errorAction(error.response.data))
		}
	}

	const onSubmit = () => {
		setTimeout(() => {
			setLoading(false)
		}, 3000)

		setTimeout(() => {
			if (username.length > 5 && email.length > 10) {
				setSuccess(true)
				registerUserAccount()
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
									{...register('username')}
									value={username}
									onChange={e => setUsername(e.target.value)}
									name='username'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder={t('validateRegistration.userNamePl')}
								/>
								{errors?.username && (
									<p className='errorMessage'>{errors.username?.message}</p>
								)}
							</div>
							<div style={{ marginTop: '25px' }}>
								<label htmlFor='email-address' className='sr-only'>
									{t('validateRegistration.email')}
								</label>
								<input
									id='email-address'
									{...register('email')}
									value={email}
									onChange={e => setEmail(e.target.value)}
									name='email'
									type='email'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder={t('validateRegistration.email')}
								/>
							</div>
						</div>

						<span>
							{errors?.email && (
								<span className='errorMessage'>{errors.email?.message}</span>
							)}
						</span>

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
									<p className='text-green-600 mt-3'>
										{t('validateRegistration.passwordSent')}
									</p>
								</div>
							)}
						</div>

						<div>
							{Object.entries(error).map((i, index) => (
								<p className='capitalize text-red-900'>
									{index + 1}) {i[1]}
								</p>
							))}
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
