import { ADD_MEMBER, DELETE_MEMBER, EDIT_MEMBER } from "./actionTypes";

let initId = 0

export const addMember = member => {
	return (dispatch) => {
		dispatch({
			type: ADD_MEMBER,
			payload: { ...member, id: initId += 1 }
		})
	}
}

export const deleteMember = id => {
	return (dispatch) => {
		dispatch({
			type: DELETE_MEMBER,
			id
		})
	}
}

export const editMember = (member) => {
	return (dispatch) => {
		dispatch({
			type: EDIT_MEMBER,
			payload: member,
		})
	}
}
