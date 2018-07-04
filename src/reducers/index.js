import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import {standardReducer} from "./standardReducer";
import {courseReducer} from "./courseReducer";
import {curriculumReducer} from "./curriculumReducer";
import {profileReducer} from "./profileReducer";
import {reducer as toastrReducer} from 'react-redux-toastr';

const appReducer = combineReducers({
	user: userReducer,
	standard: standardReducer,
	course: courseReducer,
	curriculum: curriculumReducer,
	profile: profileReducer,
	toastr: toastrReducer
});

const rootReducer = (state, action) => {
	let newState = {
		...state
	};
	return appReducer(newState, action);
};

export const loading = (state) => {
    return {
        ...state,
        isLoading: true
    }
};

export const isError = (state) => {
    return {
        ...state,
        isLoading: false,
        isError: true
    }
};

export default rootReducer;
