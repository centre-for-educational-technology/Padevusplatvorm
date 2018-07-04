import axios from 'axios';
import persistence from './store';
import environment from '../constants/environment';
import * as ActionTypes from '../constants/actionTypes';
import history from '../config/history';
import {toastr} from 'react-redux-toastr';

const axiosInstance = axios.create({
	baseURL: environment.apiUrl,
	timeout: 10000
});

axiosInstance.interceptors.request.use(
	request => {
		request.headers['api-key'] = persistence.store.getState().user.token;
		return request;
	}, error => {
		error.userMessage = 'Request failed. Please try again.';
		return Promise.reject(error);
	});

axiosInstance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		let status = error.response.status;
		if (status === 401 || status === 403) {
			persistence.store.dispatch({
				type: ActionTypes.LOG_OUT
			});
			history.push('/login');
		}
		error.userMessage = error.response.data.userMessage;
		toastr.error('Error', error.userMessage);
		return Promise.reject(error);
	}
);


export default axiosInstance;
