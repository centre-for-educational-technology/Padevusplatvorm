import * as ActionTypes from '../constants/actionTypes';
import history from '../config/history';
import axios from '../config/axios';

export const getProfile = (userId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_PROFILE
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/profile/' + userId
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_PROFILE_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                reject(error);
            });
        }));
    };
};

export const saveProfile = (profile) => {
    console.log(profile);
    return dispatch => {
        dispatch({
            type: ActionTypes.SAVE_PROFILE
        });
        axios.post(
            '/profile/add', {profile}
        ).then(response => {
            dispatch({
                type: ActionTypes.SAVE_PROFILE_SUCCESS,
                payload: response.data.data
            });
            history.push('/dashboard');
        }).catch(error => {
            dispatch({
                type: ActionTypes.SAVE_PROFILE_FAILED,
                payload: error.userMessage
            });
        });
    };
};

export const changeField = (fieldName, fieldValue) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_PROFILE_FIELD,
            payload: {
                fieldName,
                fieldValue
            }
        });
    };
};
