import * as ActionTypes from '../constants/actionTypes';
import initialState from './initialState';
import {isError, loading} from "./index";

export const courseReducer = (state = initialState.course, action) => {
    let result;
    switch (action.type) {
        case ActionTypes.GET_ALL_COURSES_SUCCESS:
            result = getAllCoursesSuccess(state, action);
            break;
        case ActionTypes.GET_COURSE_SUCCESS:
            result = getCourseSuccess(state, action);
            break;
        case ActionTypes.GET_FREEFORM_COMPETENCIES_SUCCESS:
            result = getFreeformCompetenciesSuccess(state, action);
            break;
        case ActionTypes.CHANGE_COURSE_FIELD:
            result = changeCourseField(state, action);
            break;
        case ActionTypes.ADD_COURSE_COMPETENCY:
            result = addCourseCompetency(state, action);
            break;
        case ActionTypes.REMOVE_COURSE_COMPETENCY:
            result = removeCourseCompetency(state, action);
            break;
        case ActionTypes.SAVE_COURSE_SUCCESS:
            result = saveCourse(state);
            break;
        case ActionTypes.SET_FREEFORM_COMPETENCIES:
            result = setFreeformCompetencies(state, action);
            break;
        case ActionTypes.SAVE_FREEFORM_COMPETENCY_SUCCESS:
            result = saveFreeformCompetencySuccess(state, action);
            break;
        case ActionTypes.GET_ALL_COURSES:
        case ActionTypes.GET_COURSE:
        case ActionTypes.GET_FREEFORM_COMPETENCIES:
        case ActionTypes.SAVE_COURSE:
        case ActionTypes.SAVE_FREEFORM_COMPETENCY:
            result = loading(state);
            break;
        case ActionTypes.GET_ALL_COURSES_FAILED:
        case ActionTypes.GET_COURSE_FAILED:
        case ActionTypes.GET_FREEFORM_COMPETENCIES_FAILED:
        case ActionTypes.SAVE_COURSE_FAILED:
        case ActionTypes.SAVE_FREEFORM_COMPETENCY_FAILED:
            result = isError(state);
            break;
        default:
            result = {
                ...state
            };
            break;
    }
    console.log(result);
    return result;
};

export const getAllCoursesSuccess = (state, action) => {
    return {
        ...state,
        coursesList: action.payload,
        isLoading: false
    }
};

export const getCourseSuccess = (state, action) => {
    return {
        ...state,
        selectedCourse: action.payload,
        isLoading: false
    }
};

export const changeCourseField = (state, action) => {
    const {fieldName, fieldValue} = action.payload;
    return {
        ...state,
        addCourseForm: {
            ...state.addCourseForm,
            [fieldName]: fieldValue
        }
    };
};

export const addCourseCompetency = (state, action) => {
    const {competencyId} = action.payload;
    return {
        ...state,
        addCourseForm: {
            ...state.addCourseForm,
            competencies: [competencyId, ...state.addCourseForm.competencies]
        }
    };
};

export const removeCourseCompetency = (state, action) => {
    const {competencyId} = action.payload;
    const competencyIndex = state.addCourseForm.competencies.indexOf(competencyId);
    return {
        ...state,
        addCourseForm: {
            ...state.addCourseForm,
            competencies: [
                ...state.addCourseForm.competencies.slice(0, competencyIndex),
                ...state.addCourseForm.competencies.slice(competencyIndex + 1)
            ]
        }
    };
}

export const getFreeformCompetenciesSuccess = (state, action) => {
    return {
        ...state,
        freeformCompetencies: action.payload,
        isLoading: false
    }
};

export const saveFreeformCompetencySuccess = (state, action) => {
    const {freeformCompetencies, id} = action.payload.data;
    return {
        ...state,
        freeformCompetencies,
        addCourseForm: {
            ...state.addCourseForm,
            freeformCompetencies: [...state.addCourseForm.freeformCompetencies
                .filter(freeform => !isNaN(freeform)), id]
        },
        isLoading: false
    }
};

export const setFreeformCompetencies = (state, action) => {
    const {competencies} = action.payload;
    return {
        ...state,
        addCourseForm: {
            ...state.addCourseForm,
            freeformCompetencies: competencies
        }
    };
};

export const saveCourse = (state) => {
    return {
        ...state,
        addCourseForm: initialState.course.addCourseForm,
        isLoading: false
    };
};