import * as ActionTypes from '../constants/actionTypes';
import history from "../config/history";
import axios from "../config/axios";

export const getAllCurricula = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_ALL_CURRICULA
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_ALL_CURRICULA_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_ALL_CURRICULA_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCurriculum = (curriculumId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_CURRICULUM
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum/' + curriculumId
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCurriculumCompliance = (curriculumId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_CURRICULUM_COMPLIANCE
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum/' + curriculumId + '/compliance'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COMPLIANCE_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COMPLIANCE_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCurriculumCompetencies = (curriculumId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_CURRICULUM_COMPETENCIES
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum/' + curriculumId + '/competencies'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COMPETENCIES_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COMPETENCIES_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCurriculumModules = (curriculumId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_CURRICULUM_MODULES
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum/' + curriculumId + '/modules'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_MODULES_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_MODULES_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const getCurriculumCourses = (curriculumId) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.GET_CURRICULUM_COURSES
        });
        const promises = [];
        promises.push(new Promise((resolve, reject) => {
            axios.get(
                '/curriculum/' + curriculumId + '/courses'
            ).then(response => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COURSES_SUCCESS,
                    payload: response.data.data
                });
            }).catch(error => {
                dispatch({
                    type: ActionTypes.GET_CURRICULUM_COURSES_FAILED,
                    payload: error.userMessage
                });
            });
        }));
    };
};

export const changeField = (fieldName, fieldValue) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_CURRICULUM_FIELD,
            payload: {
                fieldName,
                fieldValue
            }
        });
    };
};

export const setModuleCourses = (index, courses) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SET_MODULE_COURSES,
            payload: {
                index,
                courses
            }
        });
    };
};

export const addModule = () => {
    return dispatch => {
        dispatch({
            type: ActionTypes.ADD_MODULE
        });
    };
};

export const changeModuleField = (moduleIndex, fieldName, fieldValue) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.CHANGE_MODULE_FIELD,
            payload: {
                moduleIndex,
                fieldName,
                fieldValue
            }
        });
    };
};

export const removeModule = (index) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.REMOVE_MODULE,
            payload: {
                index
            }
        });
    };
};

export const saveCurriculum = (curriculum) => {
    return dispatch => {
        dispatch({
            type: ActionTypes.SAVE_CURRICULUM
        });
        axios.post(
            '/curriculum/add', {curriculum}
        ).then(response => {
            dispatch({
                type: ActionTypes.SAVE_CURRICULUM_SUCCESS,
                payload: response.data.data
            });
            history.push('/dashboard');
        }).catch(error => {
            dispatch({
                type: ActionTypes.SAVE_CURRICULUM_FAILED,
                payload: error.userMessage
            });
        });
    };
};