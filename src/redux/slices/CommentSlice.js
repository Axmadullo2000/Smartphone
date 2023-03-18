import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	addedComment: [],
	comments: [],
	username: ''
}

export const CommentSlice = createSlice({
	name: 'comment/CommentSlice',
	initialState,
	reducers: {
		createComment(state, action) {
			state.addedComment = [...state.comments, action.payload]
		},
		getComment(state, action) {
			state.comments = action.payload
		},
		deleteComment(state, action) {
			state.comments.filter(item => item.id != action.payload.id)
		},
		updateCommentAction(state, action) {
			state.comments = [...state.comments, action.payload]
		}
	}
})

export const {
	createComment,
	getComment,
	addUsername,
	deleteComment,
	updateCommentAction
} = CommentSlice.actions

export default CommentSlice.reducer
