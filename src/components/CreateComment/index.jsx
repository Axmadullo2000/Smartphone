import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { createComment } from '../../redux/slices/CommentSlice'
import { CrudComment } from '../../Service/Comment'

import './CreateComment.scss'

export const CreateComment = ({ id }) => {
	const [grade, setGrade] = useState('')
	const [comment, setComment] = useState('')
	const { pathname } = useLocation()

	const dispatch = useDispatch()

	const data = {
		phone_id: id,
		rate: Math.floor(grade),
		comment
	}

	const addComment = async () => {
		try {
			const response = await CrudComment.add(data)
			window.location.reload()
			dispatch(createComment(response))

			return response
		} catch (e) {}
	}

	const onSubmit = e => {
		e.preventDefault()
		addComment()
	}

	useEffect(() => {
		addComment()
	}, [])

	return (
		<div>
			<h2
				style={{
					textAlign: 'center',
					margin: '20px 0',
					fontSize: '22px',
					fontWeight: '600'
				}}
			>
				Оставить Комментарий
			</h2>
			<form onSubmit={onSubmit} className='create_comment'>
				<input
					type={'number'}
					placeholder='Enter your grade between 1 to 5'
					required
					min={1}
					max={5}
					className='comment_form_content '
					value={grade}
					onChange={e => setGrade(e.target.value)}
				/>
				<textarea
					name='comment'
					placeholder='Type your comment'
					className='comment_form_content'
					value={comment}
					onChange={e => setComment(e.target.value)}
				></textarea>
				<button className='comment_form_content comment_btn'>
					Оставить отзыв
				</button>
			</form>
		</div>
	)
}
