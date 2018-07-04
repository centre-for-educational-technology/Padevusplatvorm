import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';
import {isError, loading} from "./index";

export const profileReducer = (state = initialState.profile, action) => {
    console.log(action.type);
    let result;
    switch (action.type) {
        case ActionTypes.CHANGE_PROFILE_FIELD:
            result = changeProfileField(state, action);
            break;
        case ActionTypes.GET_PROFILE:
            result = loading(state);
            break;
        case ActionTypes.GET_PROFILE_SUCCESS:
            result = getProfileSuccess(state, action);
            break;
        case ActionTypes.SAVE_PROFILE:
            result = saveProfile(state);
            break;
        case ActionTypes.GET_PROFILE_FAILED:
        case ActionTypes.SAVE_PROFILE_FAILED:
            result = isError(state);
            break;
        default:
            result = {
                ...state
            };
            break;
    }
    return result;
};

export const getProfileSuccess = (state, action) => {
    return {
        ...state,
        selectedProfile: action.payload,
        isLoading: false
    }
};

export const saveProfile = (state) => {
    return {
        ...state,
        addProfileForm: initialState.profile.addProfileForm,
        isLoading: true
    };
};

export const changeProfileField = (state, action) => {
    const {fieldName, fieldValue} = action.payload;
    return {
        ...state,
        addProfileForm: {
            ...state.addProfileForm,
            [fieldName]: fieldValue
        }
    };
};