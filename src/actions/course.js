import * as ActionTypes from '../constants/actionTypes';
import history from "../config/history";
import axios from "../config/axios";

export const changeField = (fieldName, fieldValue) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_COURSE_FIELD,
            payload: {
                fieldName,
                fieldValue
            }
        });
    };
};

export const addCourseCompetency = (competencyId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_COURSE_COMPETENCY,
            payload: {
                competencyId
            }
        });
    };
};

export const removeCourseCompetency = (competencyId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REMOVE_COURSE_COMPETENCY,
            payload: {
                competencyId
            }
        });
    };
};

export const setFreeformCompetencies = (competencies) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SET_FREEFORM_COMPETENCIES,
            payload: {
                competencies
            }
        });
    };
};

export const saveCourse = (course) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SAVE_COURSE
        });
        axios.post(
            '/course/add', {course}
        ).then(response => {
            dispatch({
                type: ActionTypes.SAVE_COURSE_SUCCESS,
                payload: response.data.data
            });
            history.push('/dashboard');
        }).catch(error => {
            dispatch({
                type: ActionTypes.SAVE_COURSE_FAILED,
                payload: error.userMessage
            });
        });
    };
};

export const getAllCourses = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_ALL_COURSES
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/course'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_ALL_COURSES_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_ALL_COURSES_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCourse = (courseId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_COURSE
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/course/' + courseId
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_COURSE_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_COURSE_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getFreeformCompetencies = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_FREEFORM_COMPETENCIES
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/course/freeformCompetencies'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_FREEFORM_COMPETENCIES_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_FREEFORM_COMPETENCIES_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const saveFreeformCompetency = (competency) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SAVE_FREEFORM_COMPETENCY
        });
        axios.post(
            '/course/addFreeformCompetency', {competency}
        ).then(response => {
            dispatch({
                type: ActionTypes.SAVE_FREEFORM_COMPETENCY_SUCCESS,
                payload: response.data
            });
        }).catch(error => {
            dispatch({
                type: ActionTypes.SAVE_FREEFORM_COMPETENCY_FAILED,
                payload: error.userMessage
            });
        });
    };
};
