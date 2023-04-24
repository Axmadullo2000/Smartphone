import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { createComment } from '../../../../redux/slices/CommentSlice'
import { CrudComment } from '../../../../Service/Comment'

import './CreateComment.scss'

export const CreateComment = ({ id }) => {
	const [grade, setGrade] = useState('')
	const [comment, setComment] = useState('')
	const { t } = useTranslation()
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
		// eslint-disable-next-line
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
				{t('createComment.title')}
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
					placeholder={t('updateComment.typeCommentPlaceholder')}
					className='comment_form_content'
					value={comment}
					onChange={e => setComment(e.target.value)}
				></textarea>
				<button className='comment_form_content comment_btn'>
					{t('createComment.feedback')}
				</button>
			</form>
		</div>
	)
}
