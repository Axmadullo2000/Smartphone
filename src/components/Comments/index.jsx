import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { CreateComment } from '../CreateComment'
import { UpdateComment } from '../UpdateComment'

import { deleteComment, getComment } from '../../redux/slices/CommentSlice'

import { CrudComment } from '../../Service/Comment'

import star from '../../assets/stars.svg'

import './Comments.scss'

export const Comments = ({ id }) => {
	const { userData, loggednIn } = useSelector(state => state.auth)
	const { comments } = useSelector(state => state.comment)
	const dispatch = useDispatch()

	const navigate = useNavigate()
	const fetchPostedComments = async () => {
		try {
			const response = await CrudComment.get(id)
			dispatch(getComment(response))
		} catch (e) {}
	}

	const removeComment = async id => {
		try {
			window.location.reload()
			const response = await CrudComment.delete(id)
			dispatch(deleteComment(id))
			console.log(response)
		} catch (e) {}
	}

	useEffect(() => {
		fetchPostedComments()
	}, [dispatch])

	console.log(comments)

	return (
		<div>
			{comments.length > 0 &&
				(comments.error != 'wrong id' || comments.Error != 'wrong id phone') &&
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
								return <img key={index} src={star} className='star' />
							})}
						</div>
						{loggednIn && item.accounts == userData.id && (
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
									Удалить
								</button>
							</div>
						)}
						{loggednIn && item.accounts == userData.id && (
							<UpdateComment id={item.id} />
						)}
					</div>
				))}

			{loggednIn && <CreateComment id={id} />}
			{!loggednIn && (
				<p className='wish_to_feedback'>
					Чтобы Оставить Комментарий
					<Link to='/sign-in/' className='feedback_link'>
						Войдите в профиль
					</Link>
				</p>
			)}
		</div>
	)
}
