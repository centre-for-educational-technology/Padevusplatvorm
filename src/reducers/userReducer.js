import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';

export const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case ActionTypes.REGISTER:
            return {
                ...state,
                isRegistering: true,
                registerFailed: false
            };
        case ActionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false
            };
        case ActionTypes.REGISTER_FAILED:
            return {
                ...state,
                isRegistering: false,
                loginFailed: true,
                registerErrorMessage: action.payload
            };
        case ActionTypes.LOGGING_IN:
            return {
                ...state,
                isLoggingIn: true,
                loginFailed: false
            };
        case ActionTypes.LOGGED_IN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
                userId: action.payload.id,
                isLoggingIn: false
            };
        case ActionTypes.LOGGED_IN_FAILED:
            return {
                ...state,
                isLoggingIn: false,
                loginFailed: true,
                loginErrorMessage: action.payload
            };
        case ActionTypes.LOG_OUT:
            return {
                ...initialState.user
            };
        default:
            return state;
    }
};
