import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

export const ValidateRegistration = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onSubmit', // "onChange"
	})

	const [registerData, setRegisterData] = useState({})

	const onSubmit = data => {
		setRegisterData(data)
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
							Registrate your account
						</h2>
					</div>
					<form className='mt-8 space-y-6' onSubmit={handleSubmit(onSubmit)}>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								{errors.username && <p>Username is required!!!</p>}
								<label htmlFor='username' className='sr-only'>
									Username
								</label>
								<input
									id='username'
									{...register('username', {
										required: true,
										minLength: 3,
										maxLength: 60,
									})}
									name='username'
									required
									className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Your Username'
								/>
							</div>
							<div>
								<label htmlFor='email-address' className='sr-only'>
									Email address
								</label>
								<input
									id='email-address'
									{...register('email', {
										required: true,
										minLength: 5,
										maxLength: 50,
									})}
									name='email'
									type='email'
									required
									className='my-2 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Email address'
								/>
							</div>
							<div>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								<input
									id='password'
									{...register('password', {
										required: true,
										minLength: 3,
										maxLength: 40,
									})}
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='my-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Password'
								/>
								{errors.password && <p>Password field is required!!!</p>}
							</div>
							<div>
								<label htmlFor='new_password' className='sr-only'>
									Repeat Password
								</label>
								<input
									id='new_password'
									{...register('new_password', {
										required: true,
										minLength: 3,
										maxLength: 40,
									})}
									name='new_password'
									type='password'
									autoComplete='new-password'
									required
									className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Repeat Password'
								/>
								{errors.new_password && (
									<p>Repeat Password field is required!!!</p>
								)}
							</div>
						</div>

						{registerData.password != registerData.new_password && (
							<p className='text-red-300'>
								Password must have been similary!!!
							</p>
						)}

						<div className='flex'>
							<div className='flex items-center justify-between'>
								<div className='text-sm'>
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
								Register
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
