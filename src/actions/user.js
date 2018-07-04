import * as ActionTypes from '../constants/actionTypes';
import history from '../config/history';
import axios from '../config/axios';

export const login = (email, password) => {
	return dispatch => {
		dispatch({
			type: ActionTypes.LOGGING_IN
		});
		axios.post(
			'/users/login', {email: email, password: password}
		).then(response => {
			dispatch({
				type: ActionTypes.LOGGED_IN_SUCCESS,
				payload: response.data.data
			});
			history.push("/dashboard");
		}).catch(error => {
			dispatch({
				type: ActionTypes.LOGGED_IN_FAILED,
				payload: error.userMessage
			});
		});
	};
};

export const logout = () => {
	return dispatch => {
		dispatch({
			type: ActionTypes.LOG_OUT
		});
		history.push('/');
	};
};