import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'

export const ValidateLogin = () => {
	const [registerData, setLoggedInUserData] = useState({})
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm({
		mode: 'onSubmit', // "onChange"
	})

	const onSubmit = data => {
		setLoggedInUserData(data)
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
							Login to your account
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
							<div className='my-5' style={{ marginTop: '15px' }}>
								<label htmlFor='password' className='sr-only'>
									Password
								</label>
								{errors.password && <span>Password field is required!!!</span>}
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
									className='mb-2 relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Password'
								/>
							</div>
						</div>

						<div className='flex'>
							<div className='flex items-center justify-between'>
								<div className='text-sm'>
									<Link
										to='/sign-up'
										className='text-xl font-medium text-indigo-600 hover:text-indigo-500'
									>
										Don't have an account?
									</Link>
								</div>
							</div>

							<div className='ml-2 flex items-center justify-between'>
								<div className='text-sm'>
									<a className='text-xl font-medium text-green-600 hover:text-indigo-500'>
										Forgot your password?
									</a>
								</div>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
