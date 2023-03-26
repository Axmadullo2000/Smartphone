import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { CreateComment } from '../CreateComment'
import { UpdateComment } from '../UpdateComment'

import { deleteComment, getComment } from '../../redux/slices/CommentSlice'

import { CrudComment } from '../../Service/Comment'

import star from '../../assets/stars.svg'

import './Comments.scss'

export const Comments = ({ id }) => {
	const { t } = useTranslation()
	const { userData, loggednIn } = useSelector(state => state.auth)
	const { comments } = useSelector(state => state.comment)

	const dispatch = useDispatch()

	const removeComment = async id => {
		try {
			await CrudComment.delete(id)
			dispatch(deleteComment({ id }))
		} catch (e) {}
		window.location.reload()
	}

	useEffect(() => {
		const fetchPostedComments = async () => {
			try {
				const response = await CrudComment.get(id)
				dispatch(getComment(response))
			} catch (e) {}
		}
		fetchPostedComments()
	}, [dispatch, id])

	return (
		<div>
			{comments.length > 0 && comments.Error !== 'wrong id phone' && (
				<h1
					style={{
						fontSize: '22px',
						margin: '10px 0',
						fontWeight: '600'
					}}
				>
					{t('comments.userComment')}
				</h1>
			)}
			{comments.length > 0 &&
				(comments.error !== 'wrong id' || comments.Error !== 'wrong id phone') &&
				comments.map(item => (
					<div
						key={item.id}
						style={{
							border: '1px solid red',
							margin: '20px 0',
							padding: '10px',
							cursor: 'pointer'
						}}
					>
						<div>
							<p
								style={{
									color: '#838383',
									fontSize: '16px',
									lineHeight: '20px'
								}}
							>
								{item.username}
							</p>
							<p
								style={{
									color: 'red',
									fontSize: '16px',
									lineHeight: '20px',
									marginTop: '12px'
								}}
							>
								{item.comment}
							</p>
						</div>
						<div className='flex'>
							{[...Array(Math.floor(item.rate))].map((item, index) => {
								return <img alt="star" key={index} src={star} className='star' />
							})}
						</div>
						{loggednIn && item.accounts === userData.id && (
							<div>
								<button
									onClick={() => removeComment(item.id)}
									style={{
										background: 'rgb(217, 46, 21)',
										padding: '10px',
										color: '#fff',
										marginLeft: '10px'
									}}
								>
									{t('basketCard.delete')}
								</button>
							</div>
						)}
						{loggednIn && item.accounts === userData.id && (
							<UpdateComment id={item.id} />
						)}
					</div>
				))}

			{loggednIn && <CreateComment id={id} />}
			{!loggednIn && (
				<p className='wish_to_feedback'>
					{t('comments.writeComment')}
					<Link to='/sign-in/' className='feedback_link'>
						{t('comments.loginProfile')}
					</Link>
				</p>
			)}
		</div>
	)
}
