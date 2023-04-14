import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import { AuthService } from '../../../Service'

export const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordRepeat, setPasswordRepeat] = useState('')
	const [success, setSuccess] = useState(false)

	const { t } = useTranslation()

	// Validating Forgot Password page holders
	const formSchema = Yup.object().shape({
		email: Yup.string()
			.required(`${t('forgotPAssword.emailReq')}`)
			.min(10, `${t('forgotPAssword.emailMin')}`)
			.max(60, `${t('forgotPAssword.emailMax')}`),
		password: Yup.string()
			.required(`${t('forgotPAssword.passwordReq')}`)
			.min(8, `${t('forgotPAssword.passwordMin')}`)
			.max(32, `${t('forgotPAssword.passwordMax')}`)
			.oneOf(
				[Yup.ref('passwordRepeat')],
				`${t('forgotPAssword.analogPassword')}`
			),
		// 'Confirm Password is required'
		passwordRepeat: Yup.string()
			.required(`${t('forgotPAssword.confirmPasswordReq')}`)
			.min(8, `${t('forgotPAssword.passwordMin')}`)
			.max(32, `${t('forgotPAssword.passwordMax')}`)
			.oneOf([Yup.ref('password')], `${t('forgotPAssword.analogPassword')}`)
	})

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit',
		resolver: yupResolver(formSchema)
	})

	const validData = {
		new_password: password,
		check_password: passwordRepeat,
		your_email: email
	}

	const createPassword = async () => {
		try {
			await AuthService.forgotPassword(validData)
			setSuccess(true)
		} catch (e) {}
	}

	const onSubmit = () => {
		createPassword()
	}

	return (
		<>
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
								{t('forgotPAssword.resetPassword')}
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<label htmlFor='email' className='sr-only'>
										{t('forgotPAssword.email')}
									</label>
									<input
										id='email'
										name='email'
										{...register('email')}
										value={email}
										onChange={e => setEmail(e.target.value)}
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('forgotPAssword.email')}
									/>
									<p className='errorMessage'>{errors.email?.message}</p>
								</div>
								<div style={{ margin: '10px 0' }}>
									<label htmlFor='password' className='sr-only'>
										{t('forgotPAssword.password')}
									</label>

									<input
										id='password'
										{...register('password')}
										value={password}
										onChange={e => setPassword(e.target.value)}
										name='password'
										type='password'
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('forgotPAssword.password')}
									/>
									<p className='errorMessage'>{errors.password?.message}</p>
								</div>
								<div>
									<label htmlFor='repeat_password' className='sr-only'>
										{t('forgotPAssword.confirmPassword')}
									</label>
									<input
										id='passwordRepeat'
										{...register('passwordRepeat')}
										value={passwordRepeat}
										onChange={e => setPasswordRepeat(e.target.value)}
										name='passwordRepeat'
										type='password'
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder={t('forgotPAssword.confirmPassword')}
									/>
									<p className='errorMessage'>
										{errors.passwordRepeat?.message}
									</p>
								</div>
							</div>

							<div className=''>
								<div className='flex items-center justify-between'>
									<div className='text-sm'>
										{success && (
											<p
												style={{
													color: 'green',
													fontSize: '18px',
													margin: '0px 0 12px 0',
													lineHeight: '22px'
												}}
											>
												{t('forgotPAssword.sendEmail')}
											</p>
										)}
										<Link
											to='/sign-in'
											className='text-xl font-medium text-indigo-600 hover:text-indigo-500'
										>
											{t('forgotPAssword.haveAccount')}
										</Link>
									</div>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									{t('forgotPAssword.changePassword')}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
