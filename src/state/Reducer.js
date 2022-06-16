import { ADD_MEMBER, DELETE_MEMBER, EDIT_MEMBER } from './actionTypes'
const member = (state = [], action) => {
	switch (action.type) {
		case ADD_MEMBER:
			return [
				...state,
				action.payload,
			]
		case EDIT_MEMBER:
			return state.map(member =>
				member.id === action.payload.id ? action.payload : member
			)
		case DELETE_MEMBER:
			return state.filter(member =>
				member.id !== action.id
			)
		default:
			return state
	}
}

export default member