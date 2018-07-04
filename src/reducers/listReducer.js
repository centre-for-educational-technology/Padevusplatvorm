import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';

export const listReducer = (state = initialState.articles, action) => {
	switch (action.type) {
		case ActionTypes.LIST_LOADING:
			return {
				...state,
				list: [],
				isLoading: true,
				failed: false
			};
		case ActionTypes.LIST_LOADED:
			return {
				...state,
				isLoading: false,
				list: action.payload
			};
		case ActionTypes.LIST_ERRORED:
            return {
				...state,
				isLoading: false,
				failed: true,
				errorMessage: action.payload,
				list: []
			};
		case ActionTypes.ARTICLE_COUNT_SUCCESS:
			return {
				...state,
				count: action.payload
			};
		default:
			return state;
	}
};
