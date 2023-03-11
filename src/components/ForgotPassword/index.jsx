import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { AuthService } from '../../Service'

export const ForgotPassword = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordRepeat, setPasswordRepeat] = useState('')
	const [success, setSuccess] = useState(false)

	const navigate = useNavigate()

	const formSchema = Yup.object().shape({
		email: Yup.string()
			.required('Email is required')
			.min(10, 'Email length should be at least 10 characters')
			.max(60, 'Email cannot exceed more than 60 characters'),
		password: Yup.string()
			.required('Password is required')
			.min(8, 'Password length should be at least 8 characters')
			.max(32, 'Password cannot exceed more than 32 characters')
			.oneOf([Yup.ref('passwordRepeat')], 'Passwords do not match'),
		passwordRepeat: Yup.string()
			.required('Confirm Password is required')
			.min(8, 'Password length should be at least 8 characters')
			.max(32, 'Password cannot exceed more than 32 characters')
			.oneOf([Yup.ref('password')], 'Passwords do not match')
	})

	const {
		register,
		watch,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onTouched',
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
			console.log(validData)
			setSuccess(true)
		} catch (e) {}
	}

	const onSubmit = () => {
		console.log(validData)
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
								Reset Your Password
							</h2>
						</div>
						<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
							<input type='hidden' name='remember' defaultValue='true' />
							<div className='-space-y-px rounded-md shadow-sm'>
								<div>
									<p style={{ color: 'red' }}>{errors.email?.message}</p>
									<label htmlFor='email' className='sr-only'>
										Email
									</label>
									<input
										id='email'
										name='email'
										{...register('email')}
										value={email}
										onChange={e => setEmail(e.target.value)}
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Your Email'
									/>
								</div>
								<div>
									<label htmlFor='password' className='sr-only'>
										Password
									</label>
									<p style={{ color: 'red' }}>{errors.password?.message}</p>
									<input
										id='password'
										{...register('password')}
										value={password}
										onChange={e => setPassword(e.target.value)}
										name='password'
										type='password'
										required
										className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
										placeholder='Enter Password'
										style={{ marginTop: '5px' }}
									/>
								</div>
								<div>
									<p style={{ color: 'red' }}>
										{errors.passwordRepeat?.message}
									</p>
									<label htmlFor='repeat_password' className='sr-only'>
										Repeat Password
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
										placeholder='Repeat Your Password'
										style={{ marginTop: '5px' }}
									/>
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
												Ваша ссылка для изменения пароля отправлена вам на
												почту.
											</p>
										)}
										<Link
											to='/sign-in'
											className='text-xl font-medium text-indigo-600 hover:text-indigo-500'
										>
											Already have an account?
										</Link>
									</div>
								</div>
							</div>

							<div>
								<button
									type='submit'
									className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
								>
									Change Password
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
