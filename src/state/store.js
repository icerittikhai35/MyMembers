import { createStore, applyMiddleware } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk"
import Reducer from './Reducer'

const reducers = combineReducers({
	member: Reducer
})

export const store = createStore(reducers, {},applyMiddleware(thunk))