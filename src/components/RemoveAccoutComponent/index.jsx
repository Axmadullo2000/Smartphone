import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { removeAccount } from '../../redux/slices/AuthSlice'

import { AuthService } from '../../Service'

import './RemoveAccountComponent.scss'

export const RemoveAccountComponent = () => {
	const [currentPassword, setCurrentPassword] = useState('')
	const [errorOccured, setErrorOccured] = useState('')

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const { t } = useTranslation()

	const { loggednIn } = useSelector(state => state.auth)

	const formSchema = Yup.object().shape({
		current_password: Yup.string()
			.required(`${t('removeAccount.mustHavePass')}`)
			.min(8, `${t('removeAccount.minLength')}`)
			.max(32, `${t('removeAccount.maxLength')}`)
	})

	const data = {
		current_password: currentPassword
	}

	const {
		register,
		formState: { errors },
		handleSubmit
	} = useForm({
		mode: 'onSubmit', // "onSubmit",
		resolver: yupResolver(formSchema)
	})

	const removeUser = async () => {
		try {
			await AuthService.deleteUser(data)
			dispatch(removeAccount(data))
			navigate('/')
		} catch (e) {
			setErrorOccured(e.response.data[0])
		}
	}

	useEffect(() => {
		if (!loggednIn) {
			navigate('/')
		}
	})

	const onSubmit = data => {
		removeUser()
	}

	return (
		<>
			<div>
				<div>
					<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 '>
						<div className='w-full max-w-md space-y-8'>
							<div className='mx-auto'>
								<div className='w-80 mx-auto'>
									<p className='w-60 p-3 bg-slate-100 text-3xl mx-4 text-red-700 uppercase text-center shadow-lg shadow-blue-500/50 rounded-lg cursor-pointer'>
										<span className='text-red-700 hover:text-red-900'>
											Smart
										</span>{' '}
										<span className='text-blue-700 hover:text-blue-900'>
											Shop
										</span>
									</p>
								</div>
								<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
									{t('removeAccount.delUserTitle')}
								</h2>
							</div>
							<form
								className='mt-8 space-y-6 removeUserContainer'
								onSubmit={handleSubmit(onSubmit)}
							>
								<input type='hidden' name='remember' defaultValue='true' />
								<div className='-space-y-px rounded-md shadow-sm'>
									<div>
										<label htmlFor='current_password' className='sr-only'>
											{t('removeAccount.currentPassword')}
										</label>
										<input
											id='current_password'
											name='current_password'
											{...register('current_password', {
												required: true,
												minLength: 8,
												maxLength: 60
											})}
											value={currentPassword}
											onChange={e => setCurrentPassword(e.target.value)}
											required
											className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder={t('removeAccount.placeholder')}
										/>
										<p className='errorMessage mt-2'>
											{errors.current_password?.message}
											{!!errorOccured.length && <>{t('removeAccount.error')}</>}
										</p>
									</div>
								</div>

								<div>
									<button
										type='submit'
										className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
									>
										{t('removeAccount.finishRoadUser')}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
