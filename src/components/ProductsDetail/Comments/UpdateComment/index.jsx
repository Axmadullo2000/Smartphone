import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { updateCommentAction } from '../../../../redux/slices/CommentSlice'
import { CrudComment } from '../../../../Service/Comment'
import './UpdateComment.scss'

export const UpdateComment = ({ id }) => {
	const [updateGrade, setUpdateGrade] = useState('')
	const [updateComment, setUpdateComment] = useState('')
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const dispatch = useDispatch()
	const { t } = useTranslation()

	const data = {
		rate: Math.floor(updateGrade),
		comments: updateComment
	}

	const updateCommentFunction = async id => {
		try {
			const response = await CrudComment.update(data, id)
			window.location.reload()
			dispatch(updateCommentAction(response))
			return response
		} catch (e) {}
		navigate(pathname)
	}

	const submitUpdate = e => {
		e.preventDefault()
		updateCommentFunction(id)
	}

	return (
		<div>
			<form onSubmit={submitUpdate} className='update_comment'>
				<input
					type={'number'}
					placeholder={t('updateComment.inputStarPlaceholder')}
					required
					min={1}
					max={5}
					className='comment_form_content '
					value={updateGrade}
					onChange={e => setUpdateGrade(e.target.value)}
				/>
				<textarea
					name='comment'
					placeholder={t('updateComment.typeCommentPlaceholder')}
					className='comment_form_content'
					value={updateComment}
					onChange={e => setUpdateComment(e.target.value)}
				></textarea>
				<button className='comment_form_content update_comment_btn'>
					{t('updateComment.updateFeedback')}
				</button>
			</form>
		</div>
	)
}
